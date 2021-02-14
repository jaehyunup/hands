package com.bangkoklab.service.impl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.bangkoklab.data.vo.JobKeywordsVO;
import com.bangkoklab.service.JobService;
import com.bangkoklab.service.UserService;

/**
 * @packageName com.bangkoklab.service.impl
 * @author shimjaehyuk
 * @description 거래 키워드 구현 서비스
 */
@Service
public class JobServiceImpl implements JobService {

	private static final String JOB_KEYWORDS = "JOB_KEYWORDS";

	@Autowired
	RedisTemplate<String, Object> redisTemplate;

	private HashOperations<String, String, Set<String>> opsHasKeyword;

	@PostConstruct
	private void init() {
		opsHasKeyword = redisTemplate.opsForHash();
	}

	/**
	 * @param JobKeywordsVO
	 * @return org.springFramework.http.ResponseEntity<?>
	 * @author shimjaehyuk
	 * @description job에 대한 keywords를 redis에 저장
	 */
	@Override
	public int insertKeywords(JobKeywordsVO jobKeywordsVO) {

		Set<String> originKeywords = opsHasKeyword.get(JOB_KEYWORDS, jobKeywordsVO.getJobId());

		if (originKeywords == null) {

			if (jobKeywordsVO.getKeywords() == null || jobKeywordsVO.getKeywords().size() == 0) {
				return 204;
			}

			Set<String> keywords = new HashSet<>();
			getSetFromList(keywords, jobKeywordsVO.getKeywords());

			opsHasKeyword.put(JOB_KEYWORDS, jobKeywordsVO.getJobId(), keywords);
			return 200;
		}

		getSetFromList(originKeywords, jobKeywordsVO.getKeywords());

		opsHasKeyword.put(JOB_KEYWORDS, jobKeywordsVO.getJobId(), originKeywords);
		return 200;
	}

	/**
	 * @param String jobId
	 * @return org.springFramework.http.ResponseEntity<?>
	 * @author shimjaehyuk
	 * @description 거래에 대한 keywords를 조회
	 */
	@Override
	public List<String> getKeywordsByJobId(String jobId) {

		Set<String> keywords = opsHasKeyword.get(JOB_KEYWORDS, jobId);
		System.out.println("keywords : " + keywords);
		if(keywords == null) return null;
		return new ArrayList<String>(keywords);
	}

	/**
	 * @param JobKeywordsVO jobKeywordsVO
	 * @return org.springFramework.http.ResponseEntity<?>
	 * @author shimjaehyuk
	 * @description keywords를 입력받아서 중복 안되는 것 수정
	 */
	@Override
	public int updateKeywords(JobKeywordsVO jobKeywordsVO) {

		Set<String> keywords = new HashSet<>();
		getSetFromList(keywords, jobKeywordsVO.getKeywords());

		opsHasKeyword.put(JOB_KEYWORDS, jobKeywordsVO.getJobId(), keywords);
		return 200;

	}

	/**
	 * @param List<String> keywords
	 * @return org.springFramework.http.ResponseEntity<?>
	 * @author shimjaehyuk
	 * @description 키워드에 해당하는 모든 거래 출력
	 */
	@Override
	public List<String> getJobIdByKeywords(List<String> keywords) {

		Set<String> ans = new HashSet<>();

		Set<String> innerKeys = opsHasKeyword.keys(JOB_KEYWORDS);

		List<String> keys = new ArrayList<String>(innerKeys);
		for (String key : keys) {
			for (String word : keywords) {
				if (opsHasKeyword.get(JOB_KEYWORDS, key).contains(word) == true) {
					ans.add(key);
					break;
				}
			}
		}
		return new ArrayList<>(ans);
	}

	/**
	 * @param String jobId, List<String> inputKeywords
	 * @return org.springFramework.http.ResponseEntity<?>
	 * @author shimjaehyuk
	 * @description keywords들을 삭제
	 */
	@Override
	public void deleteKeywords(String jobId, List<String> inputKeywords) {
		Set<String> keywords = opsHasKeyword.get(JOB_KEYWORDS, jobId);

		for(String keyword : inputKeywords) {
			if(keywords.contains(keyword)) {
				keywords.remove(keyword);
			}
		}
		opsHasKeyword.put(JOB_KEYWORDS, jobId, keywords);
	}

	/**
	 * @param String jobId
	 * @return org.springFramework.http.ResponseEntity<?>
	 * @author shimjaehyuk
	 * @description 특정 거래에 대한 모든 keywords 삭제
	 */
	@Override
	public void deleteKeywordsAll(String jobId) {
		opsHasKeyword.put(JOB_KEYWORDS, jobId, new HashSet<String>());
	}

	/**
	 * @param Set<String> set, List<String> list
	 * @return org.springFramework.http.ResponseEntity<?>
	 * @author shimjaehyuk
	 * @description List를 Set으로 바꾸는 로직
	 */
	private void getSetFromList(Set<String> set, List<String> list) {
		for (String value : list) {
			set.add(value);
		}
	}
}

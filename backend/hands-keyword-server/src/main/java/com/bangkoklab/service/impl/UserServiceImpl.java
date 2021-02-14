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

import com.bangkoklab.data.vo.UserKeywordsVO;
import com.bangkoklab.service.UserService;

/**
 * @packageName com.bangkoklab.service.impl
 * @author shimjaehyuk
 * @description 유저 키워드 구현 서비스
 */
@Service
public class UserServiceImpl implements UserService {

	private static final String USER_KEYWORDS = "USER_KEYWORDS";

	@Autowired
	RedisTemplate<String, Object> redisTemplate;

	private HashOperations<String, String, Set<String>> opsHasKeyword;

	@PostConstruct
	private void init() {
		opsHasKeyword = redisTemplate.opsForHash();
	}

	/**
	 * @param UserKeywordsVO
	 * @return org.springFramework.http.ResponseEntity<?>
	 * @author shimjaehyuk
	 * @description user에 대한 keywords를 redis에 저장
	 */
	@Override
	public int insertKeywords(UserKeywordsVO userKeywordsVO) {
		Set<String> originKeywords = null;
		try {
		originKeywords = opsHasKeyword.get(USER_KEYWORDS, userKeywordsVO.getUserUuid());
		} catch(Exception e) {
			e.printStackTrace();
			System.out.println("머지");
		}

		if (originKeywords == null) {

			if (userKeywordsVO.getKeywords() == null || userKeywordsVO.getKeywords().size() == 0) {
				return 204;
			}

			Set<String> keywords = new HashSet<>();
			getSetFromList(keywords, userKeywordsVO.getKeywords());

			opsHasKeyword.put(USER_KEYWORDS, userKeywordsVO.getUserUuid(), keywords);
			return 200;
		}

		getSetFromList(originKeywords, userKeywordsVO.getKeywords());

		opsHasKeyword.put(USER_KEYWORDS, userKeywordsVO.getUserUuid(), originKeywords);
		return 200;
	}
	
	/**
	 * @param String userUuid
	 * @return org.springFramework.http.ResponseEntity<?>
	 * @author shimjaehyuk
	 * @description user에 대한 keywords를 조회
	 */
	@Override
	public List<String> getKeywordsByUserUuid(String userUuid) {
		
		Set<String> keywords = opsHasKeyword.get(USER_KEYWORDS, userUuid);
		return new ArrayList<String>(keywords);
	}

	/**
	 * @param UserKeywordsVO userKeywordsVO
	 * @return org.springFramework.http.ResponseEntity<?>
	 * @author shimjaehyuk
	 * @description keywords를 입력받아서 중복 안되는 것 수정
	 */
	@Override
	public int updateKeywords(UserKeywordsVO userKeywordsVO) {


		Set<String> keywords = new HashSet<>();
		getSetFromList(keywords, userKeywordsVO.getKeywords());

		opsHasKeyword.put(USER_KEYWORDS, userKeywordsVO.getUserUuid(), keywords);
		return 200;

	}
	
	/**
	 * @param List<String> keywords
	 * @return org.springFramework.http.ResponseEntity<?>
	 * @author shimjaehyuk
	 * @description 키워드에 해당하는 모든 유저 출력
	 */
	@Override
	public List<String> getUserUuidByKeywords(List<String> keywords) {
		
		Set<String> ans = new HashSet<>();
		
		Set<String> innerKeys = opsHasKeyword.keys(USER_KEYWORDS);
		
		List<String> keys = new ArrayList<String>(innerKeys);
		for(String key : keys) {
			for(String word : keywords) {
				if(opsHasKeyword.get(USER_KEYWORDS, key).contains(word) == true) {
					ans.add(key);
					break;
				}
			}
		}
		return new ArrayList<>(ans);
	}
	
	/**
	 * @param String userUuid, List<String> inputKeywords
	 * @return org.springFramework.http.ResponseEntity<?>
	 * @author shimjaehyuk
	 * @description keywords들을 삭제
	 */
	@Override
	public void deleteKeywords(String userUuid, List<String> inputKeywords) {
		Set<String> keywords = opsHasKeyword.get(USER_KEYWORDS, userUuid);

		for(String keyword : inputKeywords) {
			if(keywords.contains(keyword)) {
				keywords.remove(keyword);
			}
		}
		opsHasKeyword.put(USER_KEYWORDS, userUuid, keywords);
	}
	
	/**
	 * @param String userUuid
	 * @return org.springFramework.http.ResponseEntity<?>
	 * @author shimjaehyuk
	 * @description 특정 유저에 대한 모든 keywords 삭제
	 */
	@Override
	public void deleteKeywordsAll(String userUuid) {
		try {
			opsHasKeyword.put(USER_KEYWORDS, userUuid, new HashSet<String>());
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
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

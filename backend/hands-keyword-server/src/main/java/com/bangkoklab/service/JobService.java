package com.bangkoklab.service;

import java.util.List;

import com.bangkoklab.data.vo.JobKeywordsVO;

/**
 * @packageName com.bangkoklab.service
 * @author shimjaehyuk
 * @description 거래 키워드 서비스
 */
public interface JobService {
	int insertKeywords(JobKeywordsVO jobKeywordsVO);
	List<String> getKeywordsByJobId(String jobUuid);
	int updateKeywords(JobKeywordsVO jobKeywordsVO);
	List<String> getJobIdByKeywords(List<String> keywords);
	void deleteKeywords(String jobId, List<String> inputKeywords);
	void deleteKeywordsAll(String jobId);
}

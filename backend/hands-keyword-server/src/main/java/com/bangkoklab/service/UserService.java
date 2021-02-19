package com.bangkoklab.service;

import java.util.List;

import com.bangkoklab.data.vo.UserKeywordsVO;

/**
 * @packageName com.bangkoklab.service
 * @author shimjaehyuk
 * @description 유저 키워드 서비스
 */
public interface UserService {
	int insertKeywords(UserKeywordsVO userKeywordsVO);
	List<String> getKeywordsByUserUuid(String userUuid);
	int updateKeywords(UserKeywordsVO userKeywordsVO);
	List<String> getUserUuidByKeywords(List<String> keywords);
	void deleteKeywords(String userUuid, List<String> inputKeywords);
	void deleteKeywordsAll(String userUuid);
}

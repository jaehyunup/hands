package com.bangkoklab.service;

import java.util.List;

import com.bangkoklab.data.vo.ReviewUrlVO;

/**
 * @packageName com.bangkoklab.service
 * @fileName UrlService
 * @author shimjaehyuk
 * @description url 서비스
 **/
public interface UrlService {
	List<ReviewUrlVO> getUrlsByReviewId(String reviewId);
	
	int insertUrl(String reviewId, String url);
	int inserUrls(String reviewId, List<String> urls);
	
	int deleteUrlByReviewId(String reviewId);
}

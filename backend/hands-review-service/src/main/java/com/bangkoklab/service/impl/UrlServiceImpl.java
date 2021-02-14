package com.bangkoklab.service.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bangkoklab.data.repository.mapper.ReviewUrlMapper;
import com.bangkoklab.data.vo.ReviewUrlVO;
import com.bangkoklab.service.UrlService;

/**
 * @packageName com.bangkoklab.service.impl
 * @fileName UrlServiceImpl
 * @author shimjaehyuk
 * @description 거래 서비스
 * @See UrlService
 **/
@Service
public class UrlServiceImpl implements UrlService{

	@Autowired
	ReviewUrlMapper reviewUrlMapper;

    /**
     * @methodName insertUrl
     * @author shimjaehyuk
     * @param	String reviewId, String url
     * @return int
     * @description url 저장
     **/
	public int insertUrl(String reviewId, String url) {
		
		ReviewUrlVO reviewUrlVO = new ReviewUrlVO();
		
		String urlId = UUID.randomUUID().toString();
		if(url == null) return 0;
		reviewUrlVO.setUrlId(urlId);
		reviewUrlVO.setReviewId(reviewId);
		reviewUrlVO.setUrl(url);
		reviewUrlMapper.insertReviewUrl(reviewUrlVO);
		return 1;
	}
	
    /**
     * @methodName getUrlsByReviewId
     * @author shimjaehyuk
     * @param	String reviewId, String url
     * @return List<ReviewUrlVO>
     * @description 리뷰에 달린 urls 가져오는 서비스
     **/
	public List<ReviewUrlVO> getUrlsByReviewId(String reviewId) {
		return reviewUrlMapper.getUrlsByReviewId(reviewId);
	}
	
    /**
     * @methodName inserUrls
     * @author shimjaehyuk
     * @param	String reviewId, List<String> urls
     * @return int
     * @description urls 저장 서비스
     **/
	public int inserUrls(String reviewId, List<String> urls) {
		if(urls == null || urls.size() == 0) return 0;
		for(String url : urls) {
			insertUrl(reviewId, url);
		}
		return 1;
	}
	
    /**
     * @methodName inserUrls
     * @author shimjaehyuk
     * @param	String reviewId, List<String> urls
     * @return int
     * @description 리뷰에 대한 urls 삭제 서비스
     **/
	public int deleteUrlByReviewId(String reviewId) {
		return reviewUrlMapper.deleteUrl(reviewId);
	}
}

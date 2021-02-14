package com.bangkoklab.service;

import java.util.List;

import com.bangkoklab.data.vo.Input;
import com.bangkoklab.data.vo.ReviewVO;

/**
 * @packageName com.bangkoklab.service
 * @fileName ReviewService
 * @author shimjaehyuk
 * @description 리뷰 서비스
 **/
public interface ReviewService {
	List<ReviewVO> getReview(String userUuid);
	List<ReviewVO> getReviewByTargetUuid(String targetUuid);
	List<ReviewVO> getAllReview();
	ReviewVO getReviewByReviewId(String reviewId);
	
	String getReviewIdByContractId(String contractId);
	
	int isReviewDuplicated(Input input);
	
	int insertReview(Input input, String targetUuid, String reviewId) throws Exception;
	
	int deleteReviewByContractId(String contractId);
	int deleteReviewAll();
	int deleteReviewByReviewId(String reviewId);
	int deleteReviewByUserUuid(String userUuid);
}
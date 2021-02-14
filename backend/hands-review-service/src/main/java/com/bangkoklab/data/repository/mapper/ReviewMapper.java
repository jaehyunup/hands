package com.bangkoklab.data.repository.mapper;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.bangkoklab.data.vo.ReviewVO;

@Mapper
public interface ReviewMapper {
	ArrayList<ReviewVO> getReviewByUserUuid(String userUuid);
	List<ReviewVO> getAllReview();
	List<ReviewVO> getReviewByTargetUuid(String targetUuid);
	ReviewVO getReviewByReviewId(String reviewId);
	
	String getReviewIdByContractId(String contractId);

	int isReviewDuplicated(ReviewVO reviewVO);
	
	int insertReview(ReviewVO reviewVO);
	
	int deleteReviewByContractId(String contractId);
	int deleteReviewAll();
	int deleteReviewByReviewId(String reviewId);
	int deleteReviewByUserUuid(String userUuid);
}
package com.bangkoklab.service.impl;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bangkoklab.data.repository.mapper.ReviewMapper;
import com.bangkoklab.data.vo.Input;
import com.bangkoklab.data.vo.ReviewVO;
import com.bangkoklab.service.ReviewService;

/**
 * @packageName com.bangkoklab.service.impl
 * @fileName ReviewServiceImpl
 * @author shimjaehyuk
 * @description 리뷰 서비스
 * @See ReviewService
 **/
@Service
public class ReviewServiceImpl implements ReviewService {
	@Autowired
	private ReviewMapper reviewMapper;
	
    /**
     * @methodName getReview
     * @author shimjaehyuk
     * @param	String userUuid
     * @return List<ReviewVO>
     * @description 리뷰 조회
     **/
	public List<ReviewVO> getReview(String userUuid) {
		
		return reviewMapper.getReviewByUserUuid(userUuid);
	}
	
    /**
     * @methodName getReviewByTargetUuid
     * @author shimjaehyuk
     * @param	String targetUuid
     * @return List<ReviewVO>
     * @description 리뷰 조회
     **/
	public List<ReviewVO> getReviewByTargetUuid(String targetUuid) {
		return reviewMapper.getReviewByTargetUuid(targetUuid);
	}
	
	public ReviewVO getReviewByReviewId(String reviewId) {
		return reviewMapper.getReviewByReviewId(reviewId);
	}
	
    /**
     * @methodName isReviewDuplicated
     * @author shimjaehyuk
     * @param	String userUuid, String contractId
     * @return List<ReviewVO>
     * @description 다른사람의 프로필 조회
     **/
	public int isReviewDuplicated(Input input) {
		ReviewVO reviewVO = new ReviewVO();
		reviewVO.setUserUuid(input.getUserUuid());
		reviewVO.setContractId(input.getContractId());
		return reviewMapper.isReviewDuplicated(reviewVO);
	}
	
    /**
     * @methodName getAllReview
     * @author shimjaehyuk
     * @return List<ReviewVO>
     * @description 모든 리뷰를 제공하는 서비스
     **/
	public List<ReviewVO> getAllReview() {
		return reviewMapper.getAllReview();
	}
	
    /**
     * @methodName insertReview
     * @author shimjaehyuk
     * @param	Input input, String targetUuid, String reviewId
     * @return int
     * @description 리뷰를 서버에 저장하는 서비스
     **/
	public int insertReview(Input input, String targetUuid, String reviewId) throws Exception{
		ReviewVO review = new ReviewVO();
		review.setReviewId(reviewId);
		review.setUserUuid(input.getUserUuid());
		review.setContractId(input.getContractId());
		review.setTargetUuid(targetUuid);
		review.setReviewRegdate(new Timestamp(System.currentTimeMillis()));
		review.setReviewContent(input.getReviewContent());
		review.setScore(input.getScore());
		
		return reviewMapper.insertReview(review);
	}
	
    /**
     * @methodName deleteReviewByContractId
     * @author shimjaehyuk
     * @param	String contractId
     * @return int
     * @description 리뷰 삭제 서비스
     **/
	public int deleteReviewByContractId(String contractId) {
		return reviewMapper.deleteReviewByContractId(contractId);
	}
	
    /**
     * @methodName deleteReviewAll
     * @author shimjaehyuk
     * @return int
     * @description 리뷰 삭제 서비스
     **/
	public int deleteReviewAll() {
		return reviewMapper.deleteReviewAll();
	}
	
    /**
     * @methodName deleteReviewByUserUuid
     * @author shimjaehyuk
     * @param	String userUuid
     * @return int
     * @description 리뷰 삭제 서비스
     **/
	public int deleteReviewByUserUuid(String userUuid) {
		return reviewMapper.deleteReviewByUserUuid(userUuid);
	}
	
    /**
     * @methodName deleteReviewByReviewId
     * @author shimjaehyuk
     * @param	String reviewId
     * @return int
     * @description 리뷰 삭제 서비스
     **/
	public int deleteReviewByReviewId(String reviewId) {
		return reviewMapper.deleteReviewByReviewId(reviewId);
	}
	
	/**
	 * @methodName getReviewIdByContractId
	 * @author shimjaehyuk
	 * @param String contractId
	 * @return String
	 * @description contract에서 review id를 가져온다
	 **/
	public String getReviewIdByContractId(String contractId) {
		return reviewMapper.getReviewIdByContractId(contractId);
	}
}

package com.bangkoklab.data.repository.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.bangkoklab.data.vo.ReviewUrlVO;

@Mapper
public interface ReviewUrlMapper {
	List<ReviewUrlVO> getUrlsByReviewId(String reviewId);
	
	int insertReviewUrl(ReviewUrlVO reviewUrlVO);
	
	int deleteUrl(String reviewId);
}

package com.bangkoklab.data.repository.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.bangkoklab.data.vo.ReviewImgVO;

@Mapper
public interface ReviewImgMapper {
	List<ReviewImgVO> getImgByReviewId(String reviewId);
	
	int insertReviewImg(ReviewImgVO reviewImgVO);
	
	int deleteImg(String reviewId) throws Exception;
	
	String getPathByFileUuid(String fileUuid) throws Exception;
}

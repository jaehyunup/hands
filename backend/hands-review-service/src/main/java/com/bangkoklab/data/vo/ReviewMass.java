package com.bangkoklab.data.vo;

import java.util.List;

public class ReviewMass {
	private ReviewVO reviewVO;
	private List<String> imgs;
	private List<ReviewUrlVO> urls;
	private List<String> thumbs;

	public ReviewVO getReviewVO() {
		return reviewVO;
	}

	public void setReviewVO(ReviewVO reviewVO) {
		this.reviewVO = reviewVO;
	}

	public List<String> getImgs() {
		return imgs;
	}

	public void setImgs(List<String> imgs) {
		this.imgs = imgs;
	}

	public List<ReviewUrlVO> getUrls() {
		return urls;
	}

	public void setUrls(List<ReviewUrlVO> urls) {
		this.urls = urls;
	}

	public List<String> getThumbs() {
		return thumbs;
	}

	public void setThumbs(List<String> thumbs) {
		this.thumbs = thumbs;
	}

	public ReviewMass() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ReviewMass(ReviewVO reviewVO, List<String> imgs, List<ReviewUrlVO> urls, List<String> thumbs) {
		super();
		this.reviewVO = reviewVO;
		this.imgs = imgs;
		this.urls = urls;
		this.thumbs = thumbs;
	}

	@Override
	public String toString() {
		return "ReviewMass [reviewVO=" + reviewVO + ", imgs=" + imgs + ", urls=" + urls + ", thumbs=" + thumbs + "]";
	}

}

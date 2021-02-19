package com.bangkoklab.data.vo;

public class ReviewUrlVO {
	private String urlId;
	private String reviewId;
	private String url;

	public String getUrlId() {
		return urlId;
	}

	public void setUrlId(String urlId) {
		this.urlId = urlId;
	}

	public String getReviewId() {
		return reviewId;
	}

	public void setReviewId(String reviewId) {
		this.reviewId = reviewId;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public ReviewUrlVO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ReviewUrlVO(String urlId, String reviewId, String url) {
		super();
		this.urlId = urlId;
		this.reviewId = reviewId;
		this.url = url;
	}

	@Override
	public String toString() {
		return "ReviewUrl [urlId=" + urlId + ", reviewId=" + reviewId + ", url=" + url + "]";
	}

}

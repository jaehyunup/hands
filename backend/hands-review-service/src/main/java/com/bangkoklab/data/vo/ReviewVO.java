package com.bangkoklab.data.vo;

import java.sql.Timestamp;

public class ReviewVO {
	private String reviewId;
	private String userUuid;
	private String contractId;
	private String targetUuid;
	private Timestamp reviewRegdate;
	private String reviewContent;
	private int score;

	public String getReviewId() {
		return reviewId;
	}

	public void setReviewId(String reviewId) {
		this.reviewId = reviewId;
	}

	public String getUserUuid() {
		return userUuid;
	}

	public void setUserUuid(String userUuid) {
		this.userUuid = userUuid;
	}

	public String getContractId() {
		return contractId;
	}

	public void setContractId(String contractId) {
		this.contractId = contractId;
	}

	public String getTargetUuid() {
		return targetUuid;
	}

	public void setTargetUuid(String targetUuid) {
		this.targetUuid = targetUuid;
	}

	public Timestamp getReviewRegdate() {
		return reviewRegdate;
	}

	public void setReviewRegdate(Timestamp reviewRegdate) {
		this.reviewRegdate = reviewRegdate;
	}

	public String getReviewContent() {
		return reviewContent;
	}

	public void setReviewContent(String reviewContent) {
		this.reviewContent = reviewContent;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	public ReviewVO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ReviewVO(String reviewId, String userUuid, String contractId, String targetUuid, Timestamp reviewRegdate,
			String reviewContent, int score) {
		super();
		this.reviewId = reviewId;
		this.userUuid = userUuid;
		this.contractId = contractId;
		this.targetUuid = targetUuid;
		this.reviewRegdate = reviewRegdate;
		this.reviewContent = reviewContent;
		this.score = score;
	}

	@Override
	public String toString() {
		return "ReviewVO [reviewId=" + reviewId + ", userUuid=" + userUuid + ", contractId=" + contractId
				+ ", targetUuid=" + targetUuid + ", reviewRegdate=" + reviewRegdate + ", reviewContent=" + reviewContent
				+ ", score=" + score + "]";
	}

}

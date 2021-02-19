package com.bangkoklab.data.vo;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public class Input {
	private String userUuid;
	private String reviewContent;
	private int score;
	private String contractId;
	private List<String> urls;
	private List<MultipartFile> imgs;

	public String getUserUuid() {
		return userUuid;
	}

	public void setUserUuid(String userUuid) {
		this.userUuid = userUuid;
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

	public String getContractId() {
		return contractId;
	}

	public void setContractId(String contractId) {
		this.contractId = contractId;
	}

	public List<String> getUrls() {
		return urls;
	}

	public void setUrls(List<String> urls) {
		this.urls = urls;
	}

	public List<MultipartFile> getImgs() {
		return imgs;
	}

	public void setImgs(List<MultipartFile> imgs) {
		this.imgs = imgs;
	}

	public Input() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Input(String userUuid, String reviewContent, int score, String contractId, List<String> urls,
			List<MultipartFile> imgs) {
		super();
		this.userUuid = userUuid;
		this.reviewContent = reviewContent;
		this.score = score;
		this.contractId = contractId;
		this.urls = urls;
		this.imgs = imgs;
	}

	@Override
	public String toString() {
		return "Input [userUuid=" + userUuid + ", reviewContent=" + reviewContent + ", score=" + score + ", contractId="
				+ contractId + ", urls=" + urls + ", imgs=" + imgs + "]";
	}

}

package com.bangkoklab.data.vo;

import java.io.File;

public class ImgOfOutput {
	private File img;
	private File thumbnail;
	private String name;
	private String reviewId;
	private long fileSize;
	private String fileType;

	public File getImg() {
		return img;
	}

	public void setImg(File img) {
		this.img = img;
	}

	public File getThumbnail() {
		return thumbnail;
	}

	public void setThumbnail(File thumbnail) {
		this.thumbnail = thumbnail;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getReviewId() {
		return reviewId;
	}

	public void setReviewId(String reviewId) {
		this.reviewId = reviewId;
	}

	public long getFileSize() {
		return fileSize;
	}

	public void setFileSize(long fileSize) {
		this.fileSize = fileSize;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public ImgOfOutput() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ImgOfOutput(File img, File thumbnail, String name, String reviewId, long fileSize, String fileType) {
		super();
		this.img = img;
		this.thumbnail = thumbnail;
		this.name = name;
		this.reviewId = reviewId;
		this.fileSize = fileSize;
		this.fileType = fileType;
	}

	@Override
	public String toString() {
		return "ImgOfOutput [img=" + img + ", thumbnail=" + thumbnail + ", name=" + name + ", reviewId=" + reviewId
				+ ", fileSize=" + fileSize + ", fileType=" + fileType + "]";
	}

}

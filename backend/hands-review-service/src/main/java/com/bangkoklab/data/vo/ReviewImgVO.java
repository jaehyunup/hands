package com.bangkoklab.data.vo;

import java.io.File;
import java.util.List;

public class ReviewImgVO {
	private String fileUuid;
	private String reviewId;
	private String path;
	private String fname;
	private long fsize;
	private String ftype;
	private List<File> imgs;

	public String getFileUuid() {
		return fileUuid;
	}

	public void setFileUuid(String fileUuid) {
		this.fileUuid = fileUuid;
	}

	public String getReviewId() {
		return reviewId;
	}

	public void setReviewId(String reviewId) {
		this.reviewId = reviewId;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getFname() {
		return fname;
	}

	public void setFname(String fname) {
		this.fname = fname;
	}

	public long getFsize() {
		return fsize;
	}

	public void setFsize(long fsize) {
		this.fsize = fsize;
	}

	public String getFtype() {
		return ftype;
	}

	public void setFtype(String ftype) {
		this.ftype = ftype;
	}

	public List<File> getImgs() {
		return imgs;
	}

	public void setImgs(List<File> imgs) {
		this.imgs = imgs;
	}

	public ReviewImgVO() {
		super();
	}

	public ReviewImgVO(String fileUuid, String reviewId, String path, String fname, long fsize, String ftype,
			List<File> imgs) {
		super();
		this.fileUuid = fileUuid;
		this.reviewId = reviewId;
		this.path = path;
		this.fname = fname;
		this.fsize = fsize;
		this.ftype = ftype;
		this.imgs = imgs;
	}

	@Override
	public String toString() {
		return "ReviewImgVO [fileUuid=" + fileUuid + ", reviewId=" + reviewId + ", path=" + path + ", fname=" + fname
				+ ", fsize=" + fsize + ", ftype=" + ftype + ", imgs=" + imgs + "]";
	}

}

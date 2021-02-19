package com.bangkoklab.findJobService.data.dto;

import java.util.Date;

public class Job {
	private String jobId;
	private String jobUserUUid;
	private String categoryId;
	private String content;
	private Date jobRegdate;
	private String workingHour;
	private String jobCredit;
	private String workingDate;
	private String workingAddress;
	private String status;
	private String jobName;
	private long dday;
	
	private String userAddress;
	private String userEmail;
	private String userGender;
	private String userName;
	private String userNickname;
	private String userPhone;
	

	public String getJobId() {
		return jobId;
	}
	public void setJobId(String jobId) {
		this.jobId = jobId;
	}
	public String getJobUserUUid() {
		return jobUserUUid;
	}
	public void setJobUserUUid(String jobUserUUid) {
		this.jobUserUUid = jobUserUUid;
	}
	public String getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(String categoryId) {
		this.categoryId = categoryId;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Date getJobRegdate() {
		return jobRegdate;
	}
	public void setJobRegdate(Date jobRegdate) {
		this.jobRegdate = jobRegdate;
	}
	public String getWorkingHour() {
		return workingHour;
	}
	public void setWorkingHour(String workingHour) {
		this.workingHour = workingHour;
	}
	public String getJobCredit() {
		return jobCredit;
	}
	public void setJobCredit(String jobCredit) {
		this.jobCredit = jobCredit;
	}
	public String getWorkingDate() {
		return workingDate;
	}
	public void setWorkingDate(String workingDate) {
		this.workingDate = workingDate;
	}
	public String getWorkingAddress() {
		return workingAddress;
	}
	public void setWorkingAddress(String workingAddress) {
		this.workingAddress = workingAddress;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getJobName() {
		return jobName;
	}
	public void setJobName(String jobName) {
		this.jobName = jobName;
	}
	public long getDday() {
		return dday;
	}
	public void setDday(long dday) {
		this.dday = dday;
	}
	public String getUserAddress() {
		return userAddress;
	}
	public void setUserAddress(String userAddress) {
		this.userAddress = userAddress;
	}
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	public String getUserGender() {
		return userGender;
	}
	public void setUserGender(String userGender) {
		this.userGender = userGender;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserNickname() {
		return userNickname;
	}
	public void setUserNickname(String userNickname) {
		this.userNickname = userNickname;
	}
	public String getUserPhone() {
		return userPhone;
	}
	public void setUserPhone(String userPhone) {
		this.userPhone = userPhone;
	}
	
	
	
}

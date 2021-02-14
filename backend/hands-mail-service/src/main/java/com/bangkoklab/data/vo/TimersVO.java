package com.bangkoklab.data.vo;

import java.sql.Timestamp;

/**
* @packageName com.bangkoklab.data.vo
* @fileName AuthTimersVO
* @author shimjaehyuk
* @description 인증 만료 시간 제공을 위한 엔티티 클래스
**/

public class TimersVO {
	private String encryptedEmail;
	private Timestamp startTime;

	public String getEncryptedEmail() {
		return encryptedEmail;
	}

	public void setEncryptedEmail(String encryptedEmail) {
		this.encryptedEmail = encryptedEmail;
	}

	public Timestamp getStartTime() {
		return startTime;
	}

	public void setStartTime(Timestamp startTime) {
		this.startTime = startTime;
	}

	public TimersVO() {
		super();
	}

	public TimersVO(String encryptedEmail, Timestamp startTime) {
		super();
		this.encryptedEmail = encryptedEmail;
		this.startTime = startTime;
	}

	@Override
	public String toString() {
		return "AuthTimersVO [encryptedEmail=" + encryptedEmail + ", startTime=" + startTime + "]";
	}

}

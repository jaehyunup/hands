package com.bangkoklab.data.vo;

/**
* @packageName com.bangkoklab.data.vo
* @fileName AuthUsersVO
* @author shimjaehyuk
* @description 유저의 인증 여부 체크를 위한 엔티티 클래스
**/
public class UsersVO {
	private String encryptedEmail;
	private String isAuthenticated;

	public String getEncryptedEmail() {
		return encryptedEmail;
	}

	public void setEncryptedEmail(String encryptedEmail) {
		this.encryptedEmail = encryptedEmail;
	}

	public String getIsAuthenticated() {
		return isAuthenticated;
	}

	public void setIsAuthenticated(String isAuthenticated) {
		this.isAuthenticated = isAuthenticated;
	}

	public UsersVO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public UsersVO(String encryptedEmail, String isAuthenticated) {
		super();
		this.encryptedEmail = encryptedEmail;
		this.isAuthenticated = isAuthenticated;
	}

	@Override
	public String toString() {
		return "AuthenticatedUsersVO [encryptedEmail=" + encryptedEmail + ", isAuthenticated=" + isAuthenticated + "]";
	}

}

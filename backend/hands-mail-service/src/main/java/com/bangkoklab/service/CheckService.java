package com.bangkoklab.service;

/**
 * @packageName com.bangkoklab.service
 * @fileName CheckService
 * @author shimjaehyuk
 * @description 인증 과정 서비스 인터페이스
 */
public interface CheckService {
	String getEncryptedEmail(String email);
	int isAuthenticated(String email) throws Exception;
	int insertAuthenticatedUsersByEncryptedEmail(String encryptedEmail) throws Exception;
	int isAuthenticatedByEncryptedEmail(String email);
	int updateNotCheckedByEncryptedEmail(String email);
	int updateCheckedByEncryptedEmail(String email);
	int deleteByEncryptedEmail(String email);
	int deleteAll();
	int insertByEncryptedEmail(String email);
}
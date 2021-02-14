package com.bangkoklab.service;

/**
 * @packageName com.bangkoklab.service
 * @fileName VerifyService
 * @author shimjaehyuk
 * @description 인증 요청 확인 서비스 인터페이스
 */
public interface VerifyService {
	int getAuthProgress(String encryptedEmail);
}

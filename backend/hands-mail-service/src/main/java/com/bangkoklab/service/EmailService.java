package com.bangkoklab.service;

/**
 * @packageName com.bangkoklab.service
 * @fileName EmailService
 * @author shimjaehyuk
 * @description 이메일 보내기 서비스 인터페이스
 */
public interface EmailService {
	void sendEmail(String email, String encrypedEmail, String content, String subject) throws Exception;
}

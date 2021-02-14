package com.bangkoklab.service;

import java.util.Map;

/**
 * @packageName com.bangkoklab.service
 * @fileName ConfirmationService
 * @author shimjaehyuk
 * @description 인증 요청 서비스 인터페이스
 */
public interface ConfirmationService {
	int getAuthProgress(String email);
	int sendPassword(Map<String, String> params);
}

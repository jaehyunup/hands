package com.bangkoklab.service;

/**
 * @packageName com.bangkoklab.service
 * @fileName TimerService
 * @author shimjaehyuk
 * @description 타이머 서비스 인터페이스
 */
public interface TimerService {
	void getTimerProgress(String email) throws Exception;
	int getDiffMinuteByEmail(String email) throws Exception;
	int isExistedTimerByEncryptedEmail(String encryptedEmail) throws Exception;
	int isExistedTimerByEmail(String email);
	String getStartTimeByEncryptedEmail(String email);
	int isExpiredByEncryptedEmail(String email);
	int updateTimerByEncryptedEmail(String email);
	int deleteTimerByEncryptedEmail(String email);
	int deleteAllByExpiredEmail();
	int deleteAll();
	int addTimerByEncryptedEmail(String email);
}
package com.bangkoklab.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bangkoklab.data.config.Configuration;
import com.bangkoklab.service.VerifyService;
import com.bangkoklab.service.CheckService;
import com.bangkoklab.service.TimerService;

/**
* @packageName com.bangkoklab.service.impl
* @fileName VerifyServiceImpl
* @author shimjaehyuk
* @description 이메일 인증 확인 처리 서비스
* @See VerifyService
**/
@Service
public class VerifyServiceImpl implements VerifyService {

	@Autowired
	private CheckService authenticationCheckService;
	@Autowired
	private TimerService authenticationTimerService;
	
	/**
	 * @methodName getAuthProgress
	 * @author shimjaehyuk
	 * @param String encryptedEmail
	 * @return int
	 * @description 메일 인증 확인 과정
	 **/
	public int getAuthProgress(String encryptedEmail) {

		try {
			if (authenticationCheckService.isAuthenticated(encryptedEmail) != 0) {
				return 409;
			}

			if(authenticationTimerService.isExistedTimerByEncryptedEmail(encryptedEmail) == 0) {
				return 4002;
			}
			int endTimer = authenticationTimerService.getDiffMinuteByEmail(encryptedEmail);
			if(Configuration.TIMER_MINUTE_LIMIT <= endTimer) {
				return 4001;
			}

			authenticationCheckService.insertAuthenticatedUsersByEncryptedEmail(encryptedEmail);

			return 200;
		} catch (Exception e) {
			e.printStackTrace();
			return 400;
		}
	}
}

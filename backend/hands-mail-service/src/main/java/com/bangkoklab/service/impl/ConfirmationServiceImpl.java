
package com.bangkoklab.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bangkoklab.service.ConfirmationService;
import com.bangkoklab.service.CheckService;
import com.bangkoklab.service.EmailService;
import com.bangkoklab.service.TimerService;
import com.bangkoklab.util.Key;
import com.bangkoklab.util.SHA256;

/**
 * @packageName com.bangkoklab.service.impl
 * @fileName ConfirmationServiceImpl
 * @author shimjaehyuk
 * @description 이메일 인증 요청 처리 서비스
 * @See ConfirmationService
 **/
@Service
public class ConfirmationServiceImpl implements ConfirmationService {

	@Autowired
	private CheckService authenticationCheckService;
	@Autowired
	private TimerService authenticationTimerService;
	@Autowired
	private EmailService authenticationEmailService;

	/**
     * @methodName getAuthProgress
     * @author shimjaehyuk
     * @param String email
     * @return int
     * @description 인증 과정 진행
     **/
	public int getAuthProgress(String email) {

		try {

			String encryptedEmail = SHA256.getSHA256(email, Key.key);

			if (authenticationCheckService.isAuthenticated(encryptedEmail) != 0) {
				return 409;
			}
			
			//로컬
//			String host = "http://localhost:8000";
//			String contextPath = "/mail-auth";
			
			//배포
			String host = "http://i4d101.p.ssafy.io:8080";
			String contextPath = "/mail";
			
			String url = "/verify";
			String param = "?encryptedEmail=" + encryptedEmail;

			String totalUrl = host + contextPath + url + param;
			String content = "안녕하세요 hands입니다. 인증을 진행하기 위해 <a href=" + totalUrl + ">여기</a>를 클릭하세요";
			String subject = "hands 인증 메일입니다.";
			authenticationEmailService.sendEmail(email, encryptedEmail, content, subject);

			authenticationTimerService.getTimerProgress(encryptedEmail);

			return 200;
		} catch (Exception e) {
			e.printStackTrace();
			return 400;
		}
	}

	/**
     * @methodName sendPassword
     * @author shimjaehyuk
     * @param email
     * @return int
     * @description 메일 메시지 전송
     **/
	public int sendPassword(Map<String, String> params) {
		String email = params.get("email");
		String password = params.get("password");
		try {

			String encryptedEmail = SHA256.getSHA256(email, Key.key);

			String content = "안녕하세요 hands입니다. 임시 비밀번호는 [<span style='color:red'>" + password + "</span> ] 입니다";
			String subject = "hands 임시 비밀번호입니다.";
			authenticationEmailService.sendEmail(email, encryptedEmail, content, subject);

			authenticationTimerService.getTimerProgress(encryptedEmail);

			return 200;
		} catch (Exception e) {
			e.printStackTrace();
			return 400;
		}
	}
}

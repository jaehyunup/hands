package com.bangkoklab.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bangkoklab.service.CheckService;
import com.bangkoklab.service.ConfirmationService;
import com.bangkoklab.service.TimerService;
import com.bangkoklab.service.VerifyService;

/**
 * @packageName com.bangkoklab.controller
 * @author shimjaehyuk
 * @description 메일 인증 컨트롤러
 */
@RestController
public class AuthenticationsController {

	@Autowired
	private ConfirmationService authRequestProgressService;
	@Autowired
	private VerifyService authResponseProgressService;
	@Autowired
	private CheckService checkService;
	@Autowired
	private TimerService timerService;

	/**
	 * 
	 * @param 필요한 email
	 * @return org.springFramework.http.ResponseEntity<?>
	 * @author shimjaehyuk
	 * @description 메일로 인증 요청
	 */
	@GetMapping("/confirmation")
	public ResponseEntity<?> getAuthRequestAPI(String email) {

		MultiValueMap<String, String> header = new LinkedMultiValueMap<>();
		MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
		
		header.add("Content-Type", "application/json; charset=utf-8");
		
		switch (authRequestProgressService.getAuthProgress(email)) {
		case 200:
			header.add("message", "auth confirmation successed");
			return new ResponseEntity<>(header, HttpStatus.OK);
		case 409:
			body.add("status", "conflict");
			String body2 = "conflict";
			header.add("message", "auth is already existed");
			return new ResponseEntity<>(body2, header, HttpStatus.OK);
		default:
			header.add("message", "auth confirmation failed");
			return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * @param 암호화된 이메일 encrypted email
	 * @return org.springFramework.http.ResponseEntity<?>
	 * @author shimjaehyuk
	 * @description 인증 요청 완료 후 유저 등록
	 */
	@GetMapping("/verify")
	public ResponseEntity<?> getAuthResponseAPI(String encryptedEmail) {

		MultiValueMap<String, String> header = new LinkedMultiValueMap<String, String>();
		MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
		header.add("Content-Type", "application/json; charset=utf-8");
		
		switch (authResponseProgressService.getAuthProgress(encryptedEmail)) {
		case 200:
			header.add("message", "verify OK");
			return new ResponseEntity<>(header, HttpStatus.OK);
		case 4002:
			header.add("message", "can not verify");
			body.add("status", "conflict");
			return new ResponseEntity<>(body, header, HttpStatus.OK);
		case 4001:
			header.add("message", "expired");
			body.add("status", "expired");
			return new ResponseEntity<>(body, header, HttpStatus.OK);
		default:
			header.add("message", "verify failed");
			return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
		}
	}
	
	/**
	 * @param 이메일 email
	 * @return org.springFramework.http.ResponseEntity<?>
	 * @author shimjaehyuk
	 * @description 이메일로 인증된 것 삭제
	 */
	@DeleteMapping("/email")
	public ResponseEntity<?> deleteEmail(String email) {
		MultiValueMap<String, String> header = new LinkedMultiValueMap<String, String>();
		header.add("Content-Type", "application/json; charset=utf-8");
		
		switch (checkService.deleteByEncryptedEmail(email)) {
		case 1:
			header.add("message", "delete OK");
			return new ResponseEntity<>(header, HttpStatus.OK);
		default:
			header.add("message", "delete failed");
			return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * @param 이메일 email
	 * @return org.springFramework.http.ResponseEntity<?>
	 * @author shimjaehyuk
	 * @description 이메일로 인증된 것 삭제
	 */
	@DeleteMapping("/timer")
	public ResponseEntity<?> deleteTimer(String email) {
		MultiValueMap<String, String> header = new LinkedMultiValueMap<String, String>();
		header.add("Content-Type", "application/json; charset=utf-8");
		
		String encryptedEmail = checkService.getEncryptedEmail(email);
		
		switch (timerService.deleteTimerByEncryptedEmail(encryptedEmail)) {
		case 1:
			header.add("message", "delete OK");
			return new ResponseEntity<>(header, HttpStatus.OK);
		default:
			header.add("message", "verify failed");
			return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
		}
	}
	
	/**
	 * @return org.springFramework.http.ResponseEntity<?>
	 * @author shimjaehyuk
	 * @description 이메일로 인증된 것 삭제
	 */
	@DeleteMapping("/timer/expired")
	public ResponseEntity<?> deleteExpired() {
		MultiValueMap<String, String> header = new LinkedMultiValueMap<String, String>();
		header.add("Content-Type", "application/json; charset=utf-8");
		
		switch (timerService.deleteAllByExpiredEmail()) {
		case 0:
			header.add("message", "verify failed");
			return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
		default:
			header.add("message", "delete OK");
			return new ResponseEntity<>(header, HttpStatus.OK);
		}
	}
}

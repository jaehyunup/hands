package com.bangkoklab.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bangkoklab.service.ConfirmationService;

/**
 * @packageName com.bangkoklab.controller
 * @author shimjaehyuk
 * @description 메일 전송 컨트롤러
 */
@RestController
public class MailController {

	@Autowired
	private ConfirmationService authRequestProgressService;

	/**
	 * @param 암호화된 이메일 encrypted email, 전송할 임시 password
	 * @return org.springFramework.http.ResponseEntity<?>
	 * @author shimjaehyuk
	 * @description email로 password 전송
	 */
	@GetMapping("/mail")
	public ResponseEntity<?> getPassword(String email, String password) {

		MultiValueMap<String, String> header = new LinkedMultiValueMap<String, String>();
		Map<String, String> params = new HashMap<>();
		params.put("email", email);
		params.put("password", password);

		switch (authRequestProgressService.sendPassword(params)) {
		case 200:
			header.add("message", "pw transfer successed");
			return new ResponseEntity<>(header, HttpStatus.OK);
		default:
			header.add("message", "pw transfer failed");
			return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
		}
	}
}

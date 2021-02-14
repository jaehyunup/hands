package com.bangkoklab.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bangkoklab.data.repository.mapper.AuthCheckMapper;
import com.bangkoklab.service.CheckService;
import com.bangkoklab.util.Key;
import com.bangkoklab.util.SHA256;

/**
* @packageName com.bangkoklab.service.impl
* @fileName CheckServiceImpl
* @author shimjaehyuk
* @description 이메일 인증 확인 서비스
* @See CheckService
**/

@Service
public class CheckServiceImpl implements CheckService {

	@Autowired
	private AuthCheckMapper authCheckMapper;

	/**
     * @methodName getEncryptedEmail
     * @author shimjaehyuk
     * @param email
     * @return String
     * @description 이메일 암호화
     **/
	public String getEncryptedEmail(String email) {
		return SHA256.getSHA256(email, Key.key);
	}

	/**
     * @methodName isAuthenticated
     * @author shimjaehyuk
     * @param encryptedEmail
     * @return int
     * @description 암호화된 이메일 인증 유효성 검사
     **/
	public int isAuthenticated(String encryptedEmail) throws Exception {
		String isAuthenticated = authCheckMapper.isCheckedByEncryptedEmail(encryptedEmail);
		if (isAuthenticated == null)
			return 0;
		else if (isAuthenticated == "false")
			return 0;
		return 1;
	}

	/**
     * @methodName insertAuthenticatedUsersByEncryptedEmail
     * @author shimjaehyuk
     * @param email
     * @return int
     * @description 인증 완료된 사용자 저장
     **/
	public int insertAuthenticatedUsersByEncryptedEmail(String email) throws Exception {
		return authCheckMapper.insertAuthenticatedUsersByEncryptedEmail(email);
	}

	/**
     * @methodName isAuthenticatedByEncryptedEmail
     * @author shimjaehyuk
     * @param email
     * @return int
     * @description 이메일 인증 유효성검사
     **/
	public int isAuthenticatedByEncryptedEmail(String email) {
		try {
			String encryptedEmail = getEncryptedEmail(email);

			String isAuthenticated = authCheckMapper.isCheckedByEncryptedEmail(encryptedEmail);
			if (isAuthenticated == null)
				return 0;
			else if ("false".equals(isAuthenticated))
				return 0;
			return 1;
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	/**
     * @methodName updateNotCheckedByEncryptedEmail
     * @author shimjaehyuk
     * @param email
     * @return int
     * @description 확인 안된 이메일 확인값 변경
     **/
	public int updateNotCheckedByEncryptedEmail(String email) {
		try {
			String encryptedEmail = getEncryptedEmail(email);
			return authCheckMapper.updateNotCheckedByEncryptedEmail(encryptedEmail);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	/**
     * @methodName updateCheckedByEncryptedEmail
     * @author shimjaehyuk
     * @param email
     * @return int
     * @description 확인된 이메일 확인값 변경
     **/
	public int updateCheckedByEncryptedEmail(String email) {
		try {
			String encryptedEmail = getEncryptedEmail(email);
			return authCheckMapper.updateCheckedByEncryptedEmail(encryptedEmail);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	/**
     * @methodName deleteByEncryptedEmail
     * @author shimjaehyuk
     * @param email
     * @return int
     * @description 암호화된 이메일 인증 정보 삭제
     **/
	public int deleteByEncryptedEmail(String email) {
		try {
			String encryptedEmail = getEncryptedEmail(email);
			return authCheckMapper.deleteByEncryptedEmail(encryptedEmail);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}
	
	/**
     * @methodName deleteAll
     * @author shimjaehyuk
     * @return int
     * @description 모든 인증 정보 삭제
     **/
	public int deleteAll() {
		try {
			return authCheckMapper.deleteAll();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}
	
	/**
     * @methodName insertByEncryptedEmail
     * @author shimjaehyuk
     * @param email
     * @return int
     * @description 암호화된 인증 정보 삽입
     **/
	public int insertByEncryptedEmail(String email) {
		try {
			String encryptedEmail = getEncryptedEmail(email);
			return authCheckMapper.insertAuthenticatedUsersByEncryptedEmail(encryptedEmail);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}
	
}

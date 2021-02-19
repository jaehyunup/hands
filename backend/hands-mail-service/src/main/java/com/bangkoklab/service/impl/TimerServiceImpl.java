/**
 * title : timer를 관리하는 클래스입니다
 * 
 * content : 1. 타이머가 이미 db에 존재하는지 확인
 * 			 2. 존재하면 갱신
 * 			 3. 존재하지 않으면 추가
 */

package com.bangkoklab.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bangkoklab.data.config.Configuration;
import com.bangkoklab.data.repository.mapper.AuthTimerMapper;
import com.bangkoklab.service.TimerService;
import com.bangkoklab.util.Key;
import com.bangkoklab.util.SHA256;

/**
 * @packageName com.bangkoklab.service.impl
 * @fileName TimerServiceImpl
 * @author shimjaehyuk
 * @description 만료 타이머 제공 서비스
 * @See TimerService
 **/
@Service
public class TimerServiceImpl implements TimerService {

	@Autowired
	AuthTimerMapper authTimerMapper;

	/**
	 * @methodName getTimerProgress
	 * @author shimjaehyuk
	 * @param String encryptedEmail
	 * @return void
	 * @description 타이머 동작 프로세스
	 **/
	public void getTimerProgress(String encryptedEmail) {
		try {
			if (isExistedTimerByEncryptedEmail(encryptedEmail) == 1) {
				authTimerMapper.updateTimerByEncryptedEmail(encryptedEmail);

			} else {
				authTimerMapper.addTimerByEncryptedEmail(encryptedEmail);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * @methodName getDiffMinuteByEmail
	 * @author shimjaehyuk
	 * @param String email
	 * @return int
	 * @description 타이머 동작 시간 제공
	 **/
	public int getDiffMinuteByEmail(String email) throws Exception {

		return authTimerMapper.getDiffTimeByEncryptedEmail(email);

	}

	/**
	 * @methodName isExistedTimerByEncryptedEmail
	 * @author shimjaehyuk
	 * @param String encryptedEmail
	 * @return int
	 * @description 타이머 존재 여부 확인
	 **/
	public int isExistedTimerByEncryptedEmail(String encryptedEmail) throws Exception {
		return authTimerMapper.isExistedTimerByEncryptedEmail(encryptedEmail);
	}

	/**
	 * @methodName sendEmail
	 * @author shimjaehyuk
	 * @param String email
	 * @return int
	 * @description 타이머 존재 여부 확인
	 **/
	public int isExistedTimerByEmail(String email) {
		try {
			String encryptedEmail = SHA256.getSHA256(email, Key.key);
			return authTimerMapper.isExistedTimerByEncryptedEmail(encryptedEmail);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	/**
	 * @methodName getStartTimeByEncryptedEmail
	 * @author shimjaehyuk
	 * @param String email
	 * @return String
	 * @description 타이머 동작 시간 조회
	 **/
	public String getStartTimeByEncryptedEmail(String email) {
		try {
			String encryptedEmail = SHA256.getSHA256(email, Key.key);
			return authTimerMapper.getStartTimeByEncryptedEmail(encryptedEmail);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * @methodName isExpiredByEncryptedEmail
	 * @author shimjaehyuk
	 * @param String email
	 * @return int
	 * @description 타이머 만료 여부 조회
	 **/
	public int isExpiredByEncryptedEmail(String email) {
		try {
			if (isExistedTimerByEmail(email) == 0)
				return 1;
			String encryptedEmail = SHA256.getSHA256(email, Key.key);
			int endTimer = getDiffMinuteByEmail(encryptedEmail);
			if (Configuration.TIMER_MINUTE_LIMIT <= endTimer) {
				return 1;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	/**
	 * @methodName updateTimerByEncryptedEmail
	 * @author shimjaehyuk
	 * @param String email
	 * @return int
	 * @description 타이머 초기화
	 **/
	public int updateTimerByEncryptedEmail(String email) {
		try {
			String encryptedEmail = SHA256.getSHA256(email, Key.key);
			return authTimerMapper.updateTimerByEncryptedEmail(encryptedEmail);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	/**
	 * @methodName deleteTimerByEncryptedEmail
	 * @author shimjaehyuk
	 * @param String email
	 * @return int
	 * @description 타이머 삭제
	 **/
	public int deleteTimerByEncryptedEmail(String email) {
		try {
			String encryptedEmail = SHA256.getSHA256(email, Key.key);
			return authTimerMapper.deleteTimerByEncryptedEmail(encryptedEmail);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	/**
	 * @methodName deleteAllByExpiredEmail
	 * @author shimjaehyuk
	 * @return int
	 * @description 만료된 타이머 삭제
	 **/
	public int deleteAllByExpiredEmail() {
		try {
			return authTimerMapper.deleteAllByExpiredEmail(Configuration.TIMER_MINUTE_LIMIT);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	/**
	 * @methodName deleteAll
	 * @author shimjaehyuk
	 * @return int
	 * @description 모든 타이머 삭제
	 **/
	public int deleteAll() {
		try {
			return authTimerMapper.deleteAll();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	/**
	 * @methodName addTimerByEncryptedEmail
	 * @author shimjaehyuk
	 * @param String email
	 * @return int
	 * @description 타이머 추가
	 **/
	public int addTimerByEncryptedEmail(String email) {
		try {
			String encryptedEmail = SHA256.getSHA256(email, Key.key);
			return authTimerMapper.addTimerByEncryptedEmail(encryptedEmail);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}
}

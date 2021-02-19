package com.bangkoklab.hands.authservice.service;

import com.bangkoklab.hands.authservice.data.entity.Authentication;
import com.bangkoklab.hands.authservice.data.entity.UserProfile;

/**
* @packageName com.bangkoklab.hands.authservice.service
* @fileName ValidateService
* @author parkjaehyun
* @description 중복체크 서비스
**/
public interface ValidateService {
    // 휴대폰 번호 중복확인용 조회
    UserProfile selectPhoneNumber(String phone);
    // 이메일 중복확인용 조회
    Authentication selectByUserId(String userId);
    // 닉네임 중복확인용 조회
    UserProfile selectNickName(String nickname);


}

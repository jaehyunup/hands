package com.bangkoklab.hands.authservice.service;

import com.bangkoklab.hands.authservice.data.entity.UserProfile;

import java.util.List;

/**
* @packageName com.bangkoklab.hands.authservice.service
* @fileName ProfileService
* @author parkjaehyun
* @description 프로필 관련 서비스
**/
public interface ProfileService {
    UserProfile selectProfileByUserNickname(String nickname);
    // 프로필 조회(
    UserProfile selectProfileByUserUuid(String userUuid);
    // 다른사람의 프로필 조회
    UserProfile selectAnotherProfile(String nickname);
    // 이름과 번호로 프로필 아이디 찾기
    UserProfile selectProfileIdByNameAndPhone(String name,String phone);
    // 프로필 변경
    UserProfile updateProfileByProfileId(Long profileId,UserProfile newProfile);
    // 모든 핸디의 프로필 조회
    List<UserProfile> selectHandyProfiles();
    // 모든 핸더의 프로필 조
    List<UserProfile> selectHanderProfiles();
    // 핸디로 타입 변경
    UserProfile updateType(Long profileId,String type);
}

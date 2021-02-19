package com.bangkoklab.hands.authservice.service;

import com.bangkoklab.hands.authservice.data.entity.Authentication;

import java.util.List;

/**
* @packageName com.bangkoklab.hands.authservice.service
* @fileName MemberService
* @author parkjaehyun
* @description 이용 유저 관련 서비스 인터페이스
**/
public interface MemberService {
    // 모든 멤버 조회
    List<Authentication> selectAllMembers();
    // 1명 상세조회
    Authentication selectMemberByUserUuid(String userUuid);
    // 비밀번호 변경
    Authentication updateMemberPasswordByUserUuid(String userUuid,String password);
    // 멤버 삭제
    void deleteMemberByUserUuid(String userUuid);
    Authentication selectUserUuidByUserId(String userId);
}

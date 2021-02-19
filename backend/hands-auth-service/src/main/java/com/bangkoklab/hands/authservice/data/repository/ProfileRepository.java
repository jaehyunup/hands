package com.bangkoklab.hands.authservice.data.repository;

import com.bangkoklab.hands.authservice.data.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
* @packageName com.bangkoklab.hands.authservice.data.repository
* @fileName ProfileRepository
* @author parkjaehyun
* @description 프로필 레포지토리 클래스
**/
public interface ProfileRepository extends JpaRepository<UserProfile,Long>, JpaSpecificationExecutor<UserProfile> {
    UserProfile findByProfileId(Long profileId);
    UserProfile findByEmail(String email);
    UserProfile findByPhone(String phone);
    UserProfile findByNickname(String nickname);
    UserProfile findByNameAndPhone(String name,String phone);
}

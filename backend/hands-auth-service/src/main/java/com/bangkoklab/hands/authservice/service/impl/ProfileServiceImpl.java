package com.bangkoklab.hands.authservice.service.impl;

import com.bangkoklab.hands.authservice.data.entity.UserProfile;
import com.bangkoklab.hands.authservice.data.repository.AuthenticationRepository;
import com.bangkoklab.hands.authservice.data.repository.ProfileRepository;
import com.bangkoklab.hands.authservice.data.spec.ProfileSpecs;
import com.bangkoklab.hands.authservice.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfileServiceImpl implements ProfileService {
    @Autowired
    private ProfileRepository profileRepository;
    @Autowired
    private AuthenticationRepository authenticationRepository;
    /**
    * @methodName selectProfile
    * @author parkjaehyun
    * @return com.bangkoklab.hands.authservice.data.entity.UserProfile
    * @description UUID 기반 프로필 조회
    **/
    @Override
    public UserProfile selectProfileByUserUuid(String userUuid) {
        return profileRepository.findByProfileId(authenticationRepository.findByUserUuid(userUuid).getUserProfile().getProfileId());
    }

    /**
    * @methodName selectAnotherProfile
    * @author parkjaehyun
    * @return com.bangkoklab.hands.authservice.data.entity.UserProfile
    * @description 누구에게나 공개되는 다른사람의 프로필 조회
    **/
    @Override
    public UserProfile selectAnotherProfile(String nickname) {
        return profileRepository.findByNickname(nickname);

    }

    /**
    * @methodName selectProfileIdByNameAndPhone
    * @author parkjaehyun
    * @return com.bangkoklab.hands.authservice.data.entity.UserProfile
    * @description 이름과 휴대폰 번호로 프로필 아이디 조회
    **/
    @Override
    public UserProfile selectProfileIdByNameAndPhone(String name, String phone) {
        return profileRepository.findByNameAndPhone(name,phone);
    }

    /**
    * @methodName updateProfileByProfileId
    * @author parkjaehyun
    * @return com.bangkoklab.hands.authservice.data.entity.Authentication
    * @description 프로필 수정
    **/
    @Override
    public UserProfile updateProfileByProfileId(Long profileId, UserProfile newProfile) {
        UserProfile currentProfile=profileRepository.findByProfileId(profileId);
        if(newProfile.getDescription()!=null){
            currentProfile.setDescription(newProfile.getDescription());
        }
        if(newProfile.getGender()!=null){
            currentProfile.setGender(newProfile.getGender());
        }
        if(newProfile.getNickname()!=null){
            currentProfile.setNickname(newProfile.getNickname());
        }
        if(newProfile.getPhone()!=null){
            currentProfile.setPhone(newProfile.getPhone());
        }
        if(newProfile.getName()!=null){
            currentProfile.setName(newProfile.getName());
        }
        if(newProfile.getAddress()!=null) {
            currentProfile.setAddress(newProfile.getAddress());
        }
        profileRepository.save(currentProfile);
        return profileRepository.findByProfileId(profileId);
    }


    /**
    * @methodName selectHandyProfiles
    * @author parkjaehyun
    * @return java.util.List<com.bangkoklab.hands.authservice.data.entity.UserProfile>
    * @description 모든 핸디 프로필 조회
    **/
    @Override
    public List<UserProfile> selectHandyProfiles() {
        return profileRepository.findAll(ProfileSpecs.withType(1));
    }
    /**
     * @methodName selectHanderProfiles
     * @author parkjaehyun
     * @return java.util.List<com.bangkoklab.hands.authservice.data.entity.UserProfile>
     * @description 모든 핸더 프로필 조회
     **/
    @Override
    public List<UserProfile> selectHanderProfiles() {
        return profileRepository.findAll(ProfileSpecs.withType(0));
    }


    @Override
    /**
    * @methodName updateType
    * @author parkjaehyun
    * @return com.bangkoklab.hands.authservice.data.entity.UserProfile
    * @description 타입 업데이트
    **/
    public UserProfile updateType(Long profileId, String type) {
        UserProfile p =profileRepository.findByProfileId(profileId);
        p.setType(Integer.parseInt(type));
        profileRepository.save(p);
        return  profileRepository.save(p);
    }
}

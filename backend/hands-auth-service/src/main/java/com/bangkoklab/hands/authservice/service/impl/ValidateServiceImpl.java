package com.bangkoklab.hands.authservice.service.impl;

import com.bangkoklab.hands.authservice.data.entity.Authentication;
import com.bangkoklab.hands.authservice.data.entity.UserProfile;
import com.bangkoklab.hands.authservice.data.repository.AuthenticationRepository;
import com.bangkoklab.hands.authservice.data.repository.ProfileRepository;
import com.bangkoklab.hands.authservice.service.ValidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ValidateServiceImpl implements ValidateService {
    @Autowired
    ProfileRepository profileRepository;
    @Autowired
    AuthenticationRepository authenticationRepository;
    @Override
    public UserProfile selectPhoneNumber(String phone) {
        return profileRepository.findByPhone(phone);
    }

    @Override
    public Authentication selectByUserId(String userId) {
        return authenticationRepository.findByUserId(userId);
    }


    @Override
    public UserProfile selectNickName(String nickname) {
        return profileRepository.findByNickname(nickname);
    }
}

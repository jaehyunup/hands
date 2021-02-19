package com.bangkoklab.hands.authservice.service.impl;
import com.bangkoklab.hands.authservice.data.entity.Authentication;
import com.bangkoklab.hands.authservice.data.repository.AuthenticationRepository;
import com.bangkoklab.hands.authservice.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author parkjaehyun
 * @packageName com.bangkoklab.hands.authservice.service.impl
 * @fileName MemberServiceImpl
 * @description 멤버 관련 서비스 비즈니스로직 정의 클래스
 **/
@Service
public class MemberServiceImpl implements MemberService {
    @Autowired
    private AuthenticationRepository authenticationRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    /**
    * @methodName selectAllMembers
    * @author parkjaehyun
    * @return java.util.List<com.bangkoklab.hands.authservice.data.entity.Authentication>
    * @description 모든 유저 검색
    **/
    public List<Authentication> selectAllMembers() {
        return authenticationRepository.findAll();
    }

    @Override
    /**
    * @methodName selectMemberByUserUuid
    * @author parkjaehyun
    * @return com.bangkoklab.hands.authservice.data.entity.Authentication
    * @description 한명의 유저 검색
    **/
    public Authentication selectMemberByUserUuid(String userUuid) {
        return authenticationRepository.findByUserUuid(userUuid);
    }

    /**
    * @methodName updateMemberPasswordByUserUuid
    * @author parkjaehyun
    * @return com.bangkoklab.hands.authservice.data.entity.Authentication
    * @description 유저 비밀번호 변경
    **/
    @Override
    public Authentication updateMemberPasswordByUserUuid(String userUuid, String password) {
        Authentication member = authenticationRepository.findByUserUuid(userUuid);
        member.setPassword(passwordEncoder.encode(password));
        return authenticationRepository.save(member);
    }

    /**
    * @methodName deleteMemberByUserUuid
    * @author parkjaehyun
    * @return void
    * @description 유저 삭제
    **/
    @Override
    public void deleteMemberByUserUuid(String userUuid) {
        authenticationRepository.delete(authenticationRepository.findByUserUuid(userUuid));
    }

    /**
    * @methodName selectUserUuidByUserId
    * @author parkjaehyun
    * @return com.bangkoklab.hands.authservice.data.entity.Authentication
    * @description
    **/
    @Override
    public Authentication selectUserUuidByUserId(String userId) {
        return authenticationRepository.findByUserId(userId);
    }
}

package com.bangkoklab.hands.authservice.controller;

import com.bangkoklab.hands.authservice.common.JwtTokenProvider;
import com.bangkoklab.hands.authservice.data.entity.Authentication;
import com.bangkoklab.hands.authservice.data.entity.UserProfile;
import com.bangkoklab.hands.authservice.service.ProfileService;
import com.bangkoklab.hands.authservice.service.impl.AuthServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
* @packageName com.bangkoklab.hands.authservice.controller
* @fileName ProfileController
* @author parkjaehyun
* @description 유저정보, 다른사람이 볼떄의 프로필 관련 컨트롤러
**/
@RestController
@RequestMapping("/profile")
public class ProfileController {
    @Autowired
    private ProfileService profileService;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private AuthServiceImpl authService;

    /**
     * @methodName getProfile
     * @author parkjaehyun
     * @param
     * @return org.springframework.http.ResponseEntity<?>
     * @description 자기 자신의 프로필 조회
     **/
    @GetMapping
    public ResponseEntity<?> getProfile(HttpServletRequest request) {
        Authentication auth=new Authentication();
        MultiValueMap<String, String> header = new LinkedMultiValueMap<>();
        String userUuid=jwtTokenProvider.getUserPk(jwtTokenProvider.resolveToken(request));
        UserProfile pr=null;
        try {
            UserProfile profile=profileService.selectProfileByUserUuid(userUuid);
            return new ResponseEntity<>(profile,header, HttpStatus.OK);
        }catch(Exception e){
            header.add("message","오류가 발생했습니다.");
            return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * @methodName getProfile
     * @author parkjaehyun
     * @param
     * @return org.springframework.http.ResponseEntity<?>
     * @description 다른사람의 프로필 조회
     **/
    @GetMapping("/{nickname}")
    public ResponseEntity<?> getAnotherProfile(@PathVariable("nickname") String nickname) {
        Authentication auth=new Authentication();
        MultiValueMap<String, String> header = new LinkedMultiValueMap<>();
        UserProfile pr=null;
        try {
            UserProfile profile=profileService.selectAnotherProfile(nickname);
            return new ResponseEntity<>(profile,header, HttpStatus.OK);
        }catch(Exception e){
            header.add("message","오류가 발생했습니다.");
            return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/uuid/{userUuid}")
    public ResponseEntity<?> getAnotherProfileByUuid(@PathVariable("userUuid") String userUuid) {
        Authentication auth=new Authentication();
        MultiValueMap<String, String> header = new LinkedMultiValueMap<>();
        UserProfile pr=null;
        try {
            return new ResponseEntity<>(authService.findUserByUserUuid(userUuid).getUserProfile(),header, HttpStatus.OK);
        }catch(Exception e){
            header.add("message","오류가 발생했습니다.");
            return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
        }
    }


    /**
    * @methodName updateProfile
    * @author parkjaehyun
    * @return org.springframework.http.ResponseEntity<?>
    * @description 프로필 수정(pk jwt 토큰 자동)
    **/
    @PutMapping
    public ResponseEntity<?> updateProfile(HttpServletRequest request, @RequestBody Map<String,String> params) {
        MultiValueMap<String, String> header = new LinkedMultiValueMap<>();
        String userUuid=jwtTokenProvider.getUserPk(jwtTokenProvider.resolveToken(request));
        UserProfile newProfile=new UserProfile();
        newProfile.setProfileByParams(params); // 새로운 프로필 엔티티 생성
        try {
            Long profileId=authService.findUserByUserUuid(userUuid).getUserProfile().getProfileId();
            return new ResponseEntity<>(profileService.updateProfileByProfileId(profileId,newProfile),header, HttpStatus.OK);
        }catch(Exception e){
            header.add("message","오류가 발생했습니다.");
            return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
        }
    }

    /**
    * @methodName roleHandy
    * @author parkjaehyun
    * @return org.springframework.http.ResponseEntity<?>
    * @description 유저 타입변경 핸디/핸더
    **/
    @PutMapping("/type")
    public ResponseEntity<?> roleHandy(HttpServletRequest request,@RequestBody Map<String,String> params) {
        MultiValueMap<String, String> header = new LinkedMultiValueMap<>();
        String userUuid=jwtTokenProvider.getUserPk(jwtTokenProvider.resolveToken(request));
        try {
            Long profileId=authService.findUserByUserUuid(userUuid).getUserProfile().getProfileId();
            return new ResponseEntity<>(profileService.updateType(profileId,params.get("type")==null?"0":params.get("type")),header, HttpStatus.OK);
        }catch(Exception e){
            header.add("message","error");
            return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
        }
    }


}

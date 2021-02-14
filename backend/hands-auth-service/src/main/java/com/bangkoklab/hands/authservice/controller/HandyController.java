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


@RestController
@RequestMapping("/handy")
public class HandyController {
    @Autowired
    private ProfileService profileService;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private AuthServiceImpl authService;

    /**
     * @methodName getAllHandys
     * @author parkjaehyun
     * @return org.springframework.http.ResponseEntity<?>
     * @description 모든 핸디를 조회
     **/
    @GetMapping
    public ResponseEntity<?> getAllHandys(HttpServletRequest request) {
        MultiValueMap<String, String> header = new LinkedMultiValueMap<>();
        try {
            List<UserProfile> handyProfiles=profileService.selectHandyProfiles();
            return new ResponseEntity<>(handyProfiles,header, HttpStatus.OK);
        }catch(Exception e){
            header.add("message","error");
            return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
        }
    }

}

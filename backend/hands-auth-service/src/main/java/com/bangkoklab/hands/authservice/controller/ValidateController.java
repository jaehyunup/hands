package com.bangkoklab.hands.authservice.controller;

import com.bangkoklab.hands.authservice.data.entity.Authentication;
import com.bangkoklab.hands.authservice.service.ValidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @packageName com.bangkoklab.hands.authservice.controller
 * @fileName ValidateController
 * @author parkjaehyun
 * @description 중복확인 등의 유효성 검사에 쓰이는 controller
 **/
@RestController
@RequestMapping("/validate")
public class ValidateController {
    @Autowired
    private ValidateService validateService;

    /**
     * @methodName validateId
     * @author parkjaehyun
     * @param
     * @return org.springframework.http.ResponseEntity<?>
     * @description 아이디 중복확인
     **/
    @GetMapping("/id/{userId}")
    public ResponseEntity<?> validateId(@PathVariable(name = "userId")String userId) {
        Authentication auth=new Authentication();
        MultiValueMap<String, String> header = new LinkedMultiValueMap<>();
        try {
            if(validateService.selectByUserId(userId)==null){ // 중복확인
                return new ResponseEntity<>(header, HttpStatus.OK);
            }else{
                header.add("message","존재하는 아이디입니다.");
                return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
            }
        }catch(Exception e){
            header.add("message","오류가 발생했습니다.");
            return new ResponseEntity<>(header, HttpStatus.NOT_FOUND);
        }
    }

    /**
     * @methodName validateNickname
     * @author parkjaehyun
     * @return org.springframework.http.ResponseEntity<?>
     * @description 닉네임 중복확인
     **/
    @GetMapping("/nickname/{nickname}")
    public ResponseEntity<?> validateNickname(@PathVariable(name = "nickname")String nickname) {
        Authentication auth=new Authentication();
        MultiValueMap<String, String> header = new LinkedMultiValueMap<>();
        try {
            if(validateService.selectNickName(nickname)==null){ // 중복확인
                return new ResponseEntity<>(header, HttpStatus.OK);
            }else{
                header.add("message","다존재하는 닉네임입니다.");
                return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
            }
        }catch(Exception e){
            header.add("message","오류가 발생했습니다.");
            return new ResponseEntity<>(header, HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/phone/{phone}")
    /**
    * @methodName validatePhone
    * @author parkjaehyun
    * @return org.springframework.http.ResponseEntity<?>
    * @description 휴대폰 번호 중복확인
    **/
    public ResponseEntity<?> validatePhone(@PathVariable(name = "phone")String phone) {
        Authentication auth=new Authentication();
        MultiValueMap<String, String> header = new LinkedMultiValueMap<>();
        try {
            if(validateService.selectPhoneNumber(phone)==null){ // 중복확인
                return new ResponseEntity<>(header, HttpStatus.OK);
            }else{
                header.add("message","존재하는 휴대폰번호입니.");
                return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
            }
        }catch(Exception e){
            header.add("message","오류가 발생했습니다.");
            return new ResponseEntity<>(header, HttpStatus.NOT_FOUND);
        }
    }

}

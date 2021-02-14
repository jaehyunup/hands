package com.bangkoklab.hands.authservice.controller;

import com.bangkoklab.hands.authservice.common.JwtTokenProvider;
import com.bangkoklab.hands.authservice.data.entity.Authentication;
import com.bangkoklab.hands.authservice.data.entity.UserProfile;
import com.bangkoklab.hands.authservice.service.MemberService;
import com.bangkoklab.hands.authservice.service.impl.AuthServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.UUID;

/**
* @packageName com.bangkoklab.hands.authservice.controller
* @fileName ProfileController
* @author parkjaehyun
* @description 멤버 컨트롤러
**/
@RestController
@RequestMapping("/user")
public class MemberController {
    @Autowired
    private MemberService memberService;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    /**
     * @methodName passwordChange
     * @author parkjaehyun
     * @param
     * @return org.springframework.http.ResponseEntity<?>
     * @description 비밀번호 변경 (jwt Pk 자동)
     **/
    @PutMapping("/password")
    public ResponseEntity<?> passwordChange(HttpServletRequest request, @RequestBody Map<String,String> params){
        MultiValueMap<String, String> header = new LinkedMultiValueMap<>();
        String userPk=jwtTokenProvider.resolveToken(request);
        if(userPk==null){
            header.add("message","no-content");
            return new ResponseEntity<>(header, HttpStatus.NO_CONTENT);
        }
        String userUuid=jwtTokenProvider.getUserPk(jwtTokenProvider.resolveToken(request));
        //String userId= (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Authentication authentication=null;
        authentication = memberService.selectMemberByUserUuid(userUuid);
        if(authentication==null) {
            header.add("message","no-content");
            return new ResponseEntity<>(header, HttpStatus.NO_CONTENT);
        }
        if(null==memberService.updateMemberPasswordByUserUuid(userUuid,params.get("newPassword"))){
            header.add("message","실패하였습니다.");
            return new ResponseEntity<>(header, HttpStatus.BAD_GATEWAY);
        }
        header.add("message", "good");
        return new ResponseEntity<>(header, HttpStatus.OK);
    }

    /**
    * @methodName deleteUser
    * @author parkjaehyun
    * @param
    * @return org.springframework.http.ResponseEntity<?>
    * @description 멤버 삭제
    **/
    @DeleteMapping()
    public ResponseEntity<?> deleteUser(HttpServletRequest request) {
        String userUuid=jwtTokenProvider.getUserPk(jwtTokenProvider.resolveToken(request));
        Authentication auth=new Authentication();
        MultiValueMap<String, String> header = new LinkedMultiValueMap<>();
        UserProfile pr=null;
        try {
            memberService.deleteMemberByUserUuid(userUuid);
        }catch(Exception e){
            header.add("message","오류가 발생했습니다.");
            return new ResponseEntity<>(header, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(header, HttpStatus.OK);
    }


}

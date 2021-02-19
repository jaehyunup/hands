package com.bangkoklab.hands.handscreditservice.controller;

import com.bangkoklab.hands.handscreditservice.exception.ParamsNotFoundException;
import com.bangkoklab.hands.handscreditservice.service.CreditService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.GET;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * @author parkjaehyun
 * @packageName com.bangkoklab.hands.handscreditservice.controller
 * @fileName CreditController
 * @description 크레딧 관련 인터페이스 컨트롤러
 **/
@RestController
public class CreditController {
    @Autowired
    private CreditService creditService;

    /**
     * @return org.springframework.http.ResponseEntity<?>
     * @methodName createCreditAccount
     * @author parkjaehyun
     * @description 유저 크레딧 계좌를 생성합니다.
     **/
    @PostMapping
    public ResponseEntity<?> createCreditAccount(@RequestBody Map<String, String> params) throws Exception {
        Map<String, String> body = new LinkedHashMap<>();
        String userUuid = params.get("userUuid");
        if (userUuid == null) {
            throw new ParamsNotFoundException("유저 아이디가 존재하지 않습니다");
        }
        creditService.createUserCredit(userUuid);
        return new ResponseEntity<>(body, HttpStatus.OK);
    }


    /**
     * @return org.springframework.http.ResponseEntity<?>
     * @methodName getCredit
     * @author parkjaehyun
     * @description 유저의 크레딧을 조회합니다
     **/
    @GetMapping("/{userUuid}")
    public ResponseEntity<?> getCredit(@PathVariable String userUuid) throws Exception {
        Map<String, String> body = new LinkedHashMap<>();
        if (userUuid == null) {
            throw new ParamsNotFoundException("유저 아이디가 존재하지 않습니다");
        }
        body.put("credit", String.valueOf(creditService.getUserCredit(userUuid)));
        return new ResponseEntity<>(body, HttpStatus.OK);
    }

    /**
     * @return org.springframework.http.ResponseEntity<?>
     * @methodName update
     * @author parkjaehyun
     * @description 유저의 크레딧 양을 변경합니다.
     **/
    @PutMapping
    public ResponseEntity<?> updateCredit(@RequestBody Map<String, String> params) throws Exception {
        Map<String, String> body = new LinkedHashMap<>();
        String userUuid = params.get("userUuid");
        String value = params.get("value");
        if (userUuid == null) throw new NullPointerException("userUuid가 없습니다");
        if (value == null) throw new NullPointerException("value가 없습니다");
        creditService.updateUserCredit(userUuid, value);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * @return org.springframework.http.ResponseEntity<?>
     * @methodName creditTransaction
     * @author parkjaehyun
     * @description 거래가 성사되었을때 두 유저의 크레딧을 변경합니다.
     **/
    @PutMapping("/transaction")
    public ResponseEntity<?> creditTransaction(@RequestBody Map<String, String> params) throws Exception {
        Map<String, String> body = new LinkedHashMap<>();
        String paymentUser = params.get("userUuid");
        String receiveUser = params.get("targetUuid");
        String value = params.get("value");
        if (paymentUser == null) throw new ParamsNotFoundException("paymentUser가 없습니다");
        if (receiveUser == null) throw new ParamsNotFoundException("receiveUser가 없습니다");
        if (value == null) throw new ParamsNotFoundException("value 없습니다");
        creditService.tradeTransaction(paymentUser, receiveUser, value);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * @return org.springframework.http.ResponseEntity<?>
     * @methodName getpayable
     * @author parkjaehyun
     * @description 유저 지불 가능성을 확인하는 메서드
     **/
    @GetMapping("/payable")
    public ResponseEntity<?> getpayable(@RequestBody Map<String, String> params) throws Exception {
        Map<String, String> body = new LinkedHashMap<>();
        String userUuid = params.get("userUuid");
        String value = params.get("value");
        if (userUuid == null) throw new ParamsNotFoundException("userUuid가 없습니다");
        if (value == null) throw new ParamsNotFoundException("value가 없습니다");
        creditService.getPayable(userUuid, value);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}

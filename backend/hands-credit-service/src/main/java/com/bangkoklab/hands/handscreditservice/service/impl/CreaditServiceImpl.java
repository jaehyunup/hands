package com.bangkoklab.hands.handscreditservice.service.impl;

import com.bangkoklab.hands.handscreditservice.data.entity.UserCredit;
import com.bangkoklab.hands.handscreditservice.data.repository.CreditRepository;
import com.bangkoklab.hands.handscreditservice.exception.NotPaybaleException;
import com.bangkoklab.hands.handscreditservice.service.CreditService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CreaditServiceImpl implements CreditService {
    @Autowired
    private CreditRepository creditRepository;

    /**
     * @methodName createUserCredit
     * @author parkjaehyun
     * @return void
     * @description 크레딧 계좌 생성
     * **/
    @Override
    public void createUserCredit(String userUuid) throws Exception {
        creditRepository.save(new UserCredit(userUuid,0));
    }

    /**
     * @return void
     * @methodName getUserCredit
     * @author parkjaehyun
     * @description 유저 크레딧 양을 반환합니다
     **/
    @Override
    public int getUserCredit(String userUuid) throws Exception {
        UserCredit userCredit = null;
        userCredit = creditRepository.findByUserUuid(userUuid).orElseThrow(
                () -> new NoSuchElementException("사용자를 찾을 수 없습니다"));
        return userCredit.getCredit();
    }


    /**
     * @return void
     * @methodName updateUserCredit
     * @author parkjaehyun
     * @description 유저 크레딧 양을 value 만큼 변경합니다.
     **/
    @Override
    public void updateUserCredit(String userUuid, String value) throws Exception {
        UserCredit userCredit = null;
        userCredit = creditRepository.findByUserUuid(userUuid).orElseThrow(
                () -> new NoSuchElementException("사용자를 찾을 수 없습니다"));
        userCredit.setCredit(userCredit.getCredit() + Integer.parseInt(value));
        creditRepository.save(userCredit);
    }

    /**
     * @return int
     * @methodName tradeTransaction
     * @author parkjaehyun
     * @description userUuid의 크레딧을 targetUuid에게 value 만큼 전달하는 거래 트렌젝션을 수행합니다.
     * @See Transaction 어노테이션을 선언하지않은 이유는, saveAll 메서드가 내부적으로 트랜젝셔널 하기 떄문입니다
     **/
    @Override
    public void tradeTransaction(String userUuid, String targetUuid, String value) throws Exception {
        UserCredit paymentUserCredit = null;
        UserCredit targetUserCredit = null;
        paymentUserCredit = creditRepository.findByUserUuid(userUuid).orElseThrow(
                () -> new NoSuchElementException("지불을 사용자를 찾을 수 없습니다"));
        targetUserCredit = creditRepository.findByUserUuid(targetUuid).orElseThrow(
                () -> new NoSuchElementException("지불받을 사용자를 찾을 수 없습니다"));
        if (paymentUserCredit.getCredit() < Integer.parseInt(value))
            throw new NotPaybaleException("잔여 크레딧이 부족합니다");
        int intValue = Integer.parseInt(value);
        paymentUserCredit.setCredit(paymentUserCredit.getCredit() - intValue);
        targetUserCredit.setCredit(targetUserCredit.getCredit() + intValue);
        List<UserCredit> updatedCreditList = Arrays.asList(paymentUserCredit, targetUserCredit);
        creditRepository.saveAll(updatedCreditList);
    }

    /**
     * @return void
     * @methodName getPayable
     * @author parkjaehyun
     * @description value 만큼의 크레딧 지불 가능성 확인
     **/
    @Override
    public void getPayable(String userUuid, String value) throws Exception {
        if (creditRepository.findByUserUuid(userUuid)
                .orElseThrow(() -> new NoSuchElementException("유저를 찾을 수 없습니다"))
                .getCredit() < Integer.parseInt(value)) {
            throw new NotPaybaleException("잔여 크레딧이 부족합니다");
        }
    }
}

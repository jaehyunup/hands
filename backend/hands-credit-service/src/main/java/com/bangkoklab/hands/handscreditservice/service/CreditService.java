package com.bangkoklab.hands.handscreditservice.service;

/**
 * @author parkjaehyun
 * @packageName com.bangkoklab.hands.handscreditservice.service
 * @fileName CreditService
 * @description 크레딧 비즈니스 로직 정의 계층
 **/
public interface CreditService {
    void createUserCredit(String userUuid) throws Exception;

    int getUserCredit(String userUuid) throws Exception;

    void updateUserCredit(String userUuid, String value) throws Exception;

    void tradeTransaction(String userUuid, String targetUuid, String value) throws Exception;

    void getPayable(String userUuid, String value) throws Exception;
}

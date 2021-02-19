package com.bangkoklab.hands.handscreditservice.data.repository;

import com.bangkoklab.hands.handscreditservice.data.entity.UserCredit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


/**
 * @author parkjaehyun
 * @packageName com.bangkoklab.hands.handscreditservice.data.repository
 * @fileName CreditRepository
 * @description 크레딧 레포지토리 클래스
 **/
public interface CreditRepository extends JpaRepository<UserCredit, Long> {
    Optional<UserCredit> findByUserUuid(String userUuid);
}

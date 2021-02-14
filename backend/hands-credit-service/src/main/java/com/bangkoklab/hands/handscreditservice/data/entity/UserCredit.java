package com.bangkoklab.hands.handscreditservice.data.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * @author parkjaehyun
 * @packageName com.bangkoklab.hands.handscreditservice.data.entity
 * @fileName UserCredit
 * @description 크레딧 엔티티 클래스
 **/
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserCredit {
    @Id
    private String userUuid;
    private int credit;
}

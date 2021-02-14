package com.bangkoklab.hands.authservice.data.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Map;

/**
* @packageName com.bangkoklab.hands.authservice.data.entity
* @fileName UserProfile
* @author parkjaehyun
* @description 유저 프로필 엔티티 클래스
**/
@Entity
@Getter
@Setter
public class UserProfile {
    @Id
    @GeneratedValue
    @Column(name = "profile_id")
    private Long profileId;
    private String userUuid;
    private String email;
    private String name;
    private String phone;
    private String address;
    private String gender;
    private String description;
    private String nickname;
    private int type;

    public void setProfileByParams(Map<String, String> params){
        if(params.get("email")!=null){
            this.setEmail(params.get("email"));
        }
        if(params.get("name")!=null){
            this.setName(params.get("name"));
        }
        if(params.get("phone")!=null){
            this.setPhone(params.get("phone"));
        }
        if(params.get("address")!=null){
            this.setAddress(params.get("address"));
        }
        if(params.get("gender")!=null){
            this.setGender(params.get("gender"));
        }
        if(params.get("description")!=null){
            this.setDescription(params.get("description"));
        }
        if(params.get("nickname")!=null){
            this.setNickname(params.get("nickname"));
        }
    }
}

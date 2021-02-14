package com.bangkoklab.hands.authservice.data.entity;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
* @packageName com.bangkoklab.hands.authservice.data.vo
* @fileName User
* @author parkjaehyun
* @description 인증 유저를 식별하기위한 엔티티 클래스
* @See org.springframework.security.core.userdetails.UserDetails
**/
@Entity
@Getter @Setter
@Table
public class Authentication implements UserDetails {
    @Id
    private String userUuid;
    @Column(unique = true)
    private String userId;
    @Column
    private String password;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "authority",
            joinColumns = @JoinColumn(name = "user_uuid"))
    private List<String> authorities;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "profile_id")
    private UserProfile userProfile;

    public Authentication() {
        this.userUuid=null;
        this.userId=null;
        this.password=null;
        this.authorities=new ArrayList<>();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }
    public void addAuthorities(String authority){
     this.authorities.add(authority);
    }
    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.userId;
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String toString() {
        return "Authentication{" +
                "userUuid='" + userUuid + '\'' +
                ", userId='" + userId + '\'' +
                ", password='" + password + '\'' +
                ", authorities=" + authorities.toString() +
                '}';
    }

}

package com.bangkoklab.hands.authservice.common;

import com.bangkoklab.hands.authservice.service.impl.AuthServiceImpl;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**
* @packageName com.bangkoklab.hands.authservice.common
* @fileName JwtTokenProvider
* @author parkjaehyun
* @description jwt 관련 작업들을 수행합니다 (발급,인가,데이터조회,만료일자확인..)
**/
@RequiredArgsConstructor
@Component
public class JwtTokenProvider {
    private String secretKey = "realrealsecretkey";
    private long tokenValidTime = 30 * 60 * 1000L;
    @Autowired
    private AuthServiceImpl authService;

    // secret key base64 encode
    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    // JWT 토큰 생성
    public String createToken(String userUuid, Collection<? extends GrantedAuthority> authorities) {
        Claims claims = Jwts.claims().setSubject(userUuid); // userPk = userUuid
        List<String> authoritiesSirializer=new ArrayList<String>();
        for (GrantedAuthority s : authorities) { // 직렬화
            authoritiesSirializer.add(s.getAuthority());
        }
        claims.put("authorities", authoritiesSirializer); // 정보는 key / value 쌍으로 저장된다.
        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims) // 정보 저장
                .setIssuedAt(now) // 토큰 발행 시간 정보
                .setExpiration(new Date(now.getTime() + tokenValidTime)) // set Expire Time
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    // JWT 토큰에서 인증 정보 조회
    public Authentication getAuthentication(String token) {
        com.bangkoklab.hands.authservice.data.entity.Authentication authentication = authService.findUserByUserUuid(this.getUserPk(token));
        return new UsernamePasswordAuthenticationToken(authentication, "", authentication.getAuthorities());
    }

    // 토큰에서 회원 이름 추출
    public String getUserPk(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    // Request의 Header에서 token 값을 가져옵니다.'
    public String resolveToken(HttpServletRequest request) {
        return request.getHeader("X-AUTH-TOKEN");
    }

    // 토큰의 유효성 + 만료일자 확인
    public boolean validateToken(String jwtToken) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }
}
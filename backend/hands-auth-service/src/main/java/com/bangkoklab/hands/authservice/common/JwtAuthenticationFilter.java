package com.bangkoklab.hands.authservice.common;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
* @packageName com.bangkoklab.hands.authservice.common
* @fileName JwtAuthenticationFilter
* @author parkjaehyun
* @description Jwt 인증 필터
**/
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilterBean {
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        // 헤더에서 JWT 를 받아옵니다.
        String token = jwtTokenProvider.resolveToken((HttpServletRequest) request);
        /*
        if (token == null) { // 헤더가 없다면 bad request로 처리합니다.
            HttpServletResponse rep=(HttpServletResponse) response;
            rep.sendError(HttpServletResponse.SC_BAD_REQUEST, "Authorization header needed");
            return;
        }*/
        if(jwtTokenProvider.validateToken(token)){ // 토큰이 유효한지 검사합니다
            // 토큰이 유효하면 토큰으로부터 유저 정보를 받아옵니다.
            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            // SecurityContext 에 Authentication 객체를 저장합니다.
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }/*else{ // 만료된 토큰이라면
            HttpServletResponse rep=(HttpServletResponse) response;
            rep.sendError(HttpStatus.SC_UNAUTHORIZED, "expiration Token ");
            return;
        }*/
        chain.doFilter(request, response);
    }
}
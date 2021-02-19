package com.bangkoklab.hands.apigateway.utils.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

/**
* @packageName com.bangkoklab.hands.apigateway.utils.jwt
* @fileName JwtTokenAuthenticationFilter
* @author parkjaehyun
* @description
 * route 전, request header 토큰 여부를 분석하고 유효성 여부를 검증함
 * 유효한 토큰이라면, jwt 파싱하여 Authorities 를 확인 하고 SecurityContext 에 Authorization 부여
**/
public class JwtTokenAuthenticationFilter extends OncePerRequestFilter {
    private String secret="realrealsecretkey";
    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse rsp, FilterChain filterChain)
            throws ServletException, IOException {
        String token = req.getHeader("X-AUTH-TOKEN");

        if (token != null) {
            try {
                Claims claims = Jwts.parser()
                        .setSigningKey(secret.getBytes(StandardCharsets.UTF_8))
                        .parseClaimsJws(token)
                        .getBody();
                String userUuid = claims.getSubject();
                List<String> authorities=claims.get("authorities", List.class);
                List<SimpleGrantedAuthority> userRole=new ArrayList<>();
                for (String authority : authorities) {
                    userRole.add(new SimpleGrantedAuthority(authority));
                }
                if (userUuid != null) {
                    UsernamePasswordAuthenticationToken auth
                            = new UsernamePasswordAuthenticationToken(userUuid, null, userRole);
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            } catch ( Exception e) {
                e.printStackTrace();
                SecurityContextHolder.clearContext();
            }
        }
        filterChain.doFilter(req, rsp);
    }
}

package com.bangkoklab.hands.handscreditservice.controller;

import com.bangkoklab.hands.handscreditservice.exception.NotPaybaleException;
import com.bangkoklab.hands.handscreditservice.exception.ParamsNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.nio.file.AccessDeniedException;
import java.util.NoSuchElementException;


/**
 * @author parkjaehyun
 * @packageName com.bangkoklab.hands.handscreditservice.controller
 * @fileName ExceptionController
 * @description MVC 단에서 예외를 핸들링하는 예외 컨트롤러
 **/
@ControllerAdvice
@Slf4j
public class ExceptionController {
    /**
     * @return org.springframework.http.ResponseEntity<?>
     * @methodName BadRequestException
     * @author parkjaehyun
     * @description 잘못된 요청에 대한 핸들링 메서드
     **/
    @ExceptionHandler({
            RuntimeException.class
            , NotPaybaleException.class
            , NoSuchElementException.class
            , NullPointerException.class
            , ParamsNotFoundException.class
    })
    public ResponseEntity<?> BadRequestException(final RuntimeException ex) {
        log.warn("error", ex);
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    /**
     * @return org.springframework.http.ResponseEntity<?>
     * @methodName handleAccessDeniedException
     * @author parkjaehyun
     * @description 인증을 받지않거나 인가되지않은 사용자에 대한 예외 핸들링메서드
     **/
    @ExceptionHandler({AccessDeniedException.class})
    public ResponseEntity<?> handleAccessDeniedException(final AccessDeniedException ex) {
        log.warn("error", ex);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
    }

    /**
     * @return org.springframework.http.ResponseEntity<?>
     * @methodName handleAll
     * @author parkjaehyun
     * @description 일반적으로 발생하지 않는 서버측 예외에 대한 예외처리 메서드
     **/
    @ExceptionHandler({Exception.class})
    public ResponseEntity<?> handleAll(final Exception ex) {
        log.info(ex.getClass().getName());
        log.error("error", ex);
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
package com.bangkoklab.hands.handscreditservice.exception;

/**
 * @author parkjaehyun
 * @packageName com.bangkoklab.hands.handscreditservice.exception
 * @fileName NotPaybaleException
 * @description 유저가 지불할 크레딧이 충분히 없을때 발생하는 RuntimeException
 **/
public class NotPaybaleException extends Exception {
    private final int ERR_CODE;

    public NotPaybaleException(String msg) {
        super(msg);
        ERR_CODE = 100;
    }

    public NotPaybaleException(String msg, int errCode) {
        super(msg);
        ERR_CODE = errCode;
    }

    public int getErrCode() {
        return ERR_CODE;
    }
}

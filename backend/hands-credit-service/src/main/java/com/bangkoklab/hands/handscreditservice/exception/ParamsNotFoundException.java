package com.bangkoklab.hands.handscreditservice.exception;

/**
 * @author parkjaehyun
 * @packageName com.bangkoklab.hands.handscreditservice.exception
 * @fileName ParamsNotFoundException
 * @description 파라미터가 제대로 입력되지 않았을때의 예외
 **/
public class ParamsNotFoundException extends Exception {
    private final int ERR_CODE;

    public ParamsNotFoundException(String msg) {
        super(msg);
        ERR_CODE = 100;
    }

    public ParamsNotFoundException(String msg, int errCode) {
        super(msg);
        ERR_CODE = errCode;
    }

    public int getErrCode() {
        return ERR_CODE;
    }
}

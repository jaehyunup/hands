package com.bangkoklab.controller.test;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import com.bangkoklab.controller.AuthenticationsController;

/**
 * @packageName com.bangkoklab.controller.test
 * @author shimjaehyuk
 * @description 인증 컨트롤러 테스트
 */
public class AuthenticationsControllerTest extends AbstractControllerTest {

	@Autowired
	private AuthenticationsController authenticationsController;
	
	@Override
	protected Object controller() {
		return authenticationsController;
	}
	
	/**
     * @methodName getAuthRequestAPI
     * @author shimjaehyuk
     * @param email
     * @return void
     * @description 인증 요청 confirmation 이메일 전송 테스트
     **/
	@Test
	@DisplayName("인증 요청 confirmation 이메일로 보내기")
	public void getAuthRequestAPI() throws Exception {
		
		MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
		params.add("email","tlnzldr@naver.com");
		
		mockMvc.perform(
						get("http://localhost:8000/mail-auth/confirmation")
						.params(params)
						);
	}
	
	/**
     * @methodName getAuthResponseAPI
     * @author shimjaehyuk
     * @param email
     * @return void
     * @description 인증 요청 verify db 저장 테스트
     **/
	@Test
	@DisplayName("인증 요청 verify db에 저장하기")
	public void getAuthResponseAPI() throws Exception {
		
		MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
		params.add("encryptedEmail", "abee42ed68e687340c76dc3b9802056a8d466d26f3a35c9ef31e5b02741c14ef");
		
		mockMvc.perform(
						get("http://localhost:8000/mail-auth/verify")
						.params(params)
				);
		
	}
}

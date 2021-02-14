package com.bangkoklab.controller.test;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;


import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import com.bangkoklab.controller.MailController;

/**
 * @packageName com.bangkoklab.controller.test
 * @author shimjaehyuk
 * @description 인증 컨트롤러 테스트
 */
public class MailControllerTest extends AbstractControllerTest {
	@Autowired
	private MailController mailController;

	@Override
	protected Object controller() {
		return mailController;
	}

	/**
	 * @methodName getPassword
	 * @author shimjaehyuk
	 * @param void
	 * @return void
	 * @description 임시 password 전송 테스트
	 **/
	@Test
	@DisplayName("임시 password 전송 테스트")
	public void getPassword() throws Exception {
		
		MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
		params.add("email","tlnzldr@naver.com");
		params.add("password", "1234");
		
		mockMvc.perform(
						get("http://localhost:8000/mail-auth/mail")
						.params(params)
						);
	}
	
}

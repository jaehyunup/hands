package com.bangkoklab.FollowHandy;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import com.bangkoklab.FollowHandy.controller.FollowController;
import com.bangkoklab.FollowHandy.dto.Handy;
import com.fasterxml.jackson.databind.ObjectMapper;

public class FindFollowHandyTest extends ControllerTest {

	
	@Autowired
	private FollowController followController;
	@Autowired
	private ObjectMapper objectMapper;
	
	@Test
	@DisplayName("팔로우 하는 사람 모두 찾기")
	public void FindFollowHandy() throws Exception{
		Handy handy = new Handy();
		handy.setMyId("run@naver.com");
		String content = objectMapper.writeValueAsString(handy);
		
		mockMvc.perform(
				post("/findFollow")
				.content(content)
				.contentType(MediaType.APPLICATION_JSON)
				).andDo(print())
				.andExpect(status().isOk());
	}
	
	@Override
	protected Object controller() {
		return followController;
	}

}

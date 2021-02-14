package com.bangkoklab.findJobService;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import com.bangkoklab.findJobService.controller.JobController;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 *  모든 일거리 게시글 가져오기
 * */

public class findJobsByCategoryTest extends ControllerTest{

	@Autowired
	private JobController handController;
	@Autowired
	private ObjectMapper objectMapper;

	@Test
	@DisplayName("카테고리 별 일거리 게시글 가져옿기")
	public void simple() throws Exception {
		
		mockMvc.perform(
				get("/Jobs/findJobsByCategory")
				.param("category","맡기기")
				).andDo(print())
				.andExpect(status().isOk());
		// assertTrue("H".equals(handController.HandDeals()));
	}
	
	@Override
	protected Object controller() {
		return handController;
	}
}

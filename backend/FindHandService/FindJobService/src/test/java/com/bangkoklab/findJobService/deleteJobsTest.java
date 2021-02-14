package com.bangkoklab.findJobService;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import com.bangkoklab.findJobService.controller.JobController;
import com.bangkoklab.findJobService.data.dto.Job;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 *  모든 일거리 게시글 가져오기
 * */

public class deleteJobsTest extends ControllerTest{

	@Autowired
	private JobController handController;
	@Autowired
	private ObjectMapper objectMapper;
	
	@Test
	@DisplayName("일거리 게시글 삭제")
	public void deleteHandDealTest() throws Exception {
		System.out.println("첫번째 테스트");
		
		Job hand = new Job();
		hand.setJobId("777");
		String content = objectMapper.writeValueAsString(hand);
		
		mockMvc.perform(
				delete("/Jobs/deleteJob")
				.content(content)
				.contentType(MediaType.APPLICATION_JSON)
				).andDo(print())
				.andExpect(status().isOk());
		// assertTrue("H".equals(handController.HandDeals()));
	}
	
	@Override
	protected Object controller() {
		return handController;
	}
}

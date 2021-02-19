package com.bangkoklab.findJobService;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.bangkoklab.findJobService.controller.JobController;

/**
 *  모든 일거리 게시글 가져오기
 * */

public class deleteOverDayJobsTest extends ControllerTest{

	@Autowired
	private JobController handController;
	
	@Test
	@DisplayName("날짜 지난 일거리 게시글 삭제")
	public void deleteHandDealTest() throws Exception {

		
		mockMvc.perform(
				delete("/Jobs/deletOverDayJob")
				).andDo(print())
				.andExpect(status().isOk());
		// assertTrue("H".equals(handController.HandDeals()));
	}
	
	@Override
	protected Object controller() {
		return handController;
	}
}

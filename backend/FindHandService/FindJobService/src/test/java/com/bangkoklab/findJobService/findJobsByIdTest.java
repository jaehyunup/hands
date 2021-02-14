package com.bangkoklab.findJobService;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import com.bangkoklab.findJobService.controller.JobController;

/**
 *  모든 일거리 게시글 가져오기
 * */

public class findJobsByIdTest extends ControllerTest{

	@Autowired
	private JobController handController;

	@Test
	@DisplayName("상세정보")
	public void simple() throws Exception {

		mockMvc.perform(
				get("/Jobs/jobInfo")
				.param("jobId","f007a349-909a-4884-9eb1-992835998fe5")
				).andDo(print())
				.andExpect(status().isOk());
		// assertTrue("H".equals(handController.HandDeals()));
	}
	
	@Override
	protected Object controller() {
		return handController;
	}
}

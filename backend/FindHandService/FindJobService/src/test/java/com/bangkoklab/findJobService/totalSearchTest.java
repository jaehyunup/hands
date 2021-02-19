package com.bangkoklab.findJobService;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import com.bangkoklab.findJobService.controller.JobController;
import com.bangkoklab.findJobService.data.dto.Job;
import com.bangkoklab.findJobService.data.dto.TotalSearch;
import com.fasterxml.jackson.databind.ObjectMapper;

public class totalSearchTest extends ControllerTest {
	@Autowired
	private JobController handController;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	@Test
	@DisplayName("일거리 게시글 넣기")
	public void insertHandDealTest() throws Exception {
		TotalSearch ts = new TotalSearch();
		ts.setDong("경상북도 구미 진평동");
		ts.setCategory("펫");
		ts.setMinCredit("3000");
		ts.setMaxCredit("9000");
		ts.setDday(7);
		String content = objectMapper.writeValueAsString(ts);
		
		mockMvc.perform(
				post("/Jobs/totalSearch")
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

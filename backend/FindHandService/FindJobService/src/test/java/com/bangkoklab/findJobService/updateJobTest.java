package com.bangkoklab.findJobService;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
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
import com.fasterxml.jackson.databind.ObjectMapper;

public class updateJobTest extends ControllerTest {
	@Autowired
	private JobController handController;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	@Test
	@DisplayName("일거리 게시글 수정")
	public void insertHandDealTest() throws Exception {
		Job hand = new Job();
		hand.setJobId("1d24a0da-a8ba-43b4-bf06-a2c9959cfb29");
		hand.setJobUserUUid("542ef396c97b49299fed7719db2bcb48");
		hand.setCategoryId("배달");
		hand.setContent("택배 수령해서 내장고에 보관해주세요");
		SimpleDateFormat format1 = new SimpleDateFormat ( "yyyy-MM-dd HH:mm:ss");
		Date time = new Date();
		String time1 = format1.format(time);
		
		hand.setJobRegdate(time);
		hand.setWorkingHour("15");
		hand.setJobCredit("3000");
		hand.setWorkingDate("2021-01-25");
		hand.setWorkingAddress("언양 진장길");
		hand.setStatus("거래 끝!!!!!!");
		hand.setJobName("택배 보관");
		String content = objectMapper.writeValueAsString(hand);
		
		mockMvc.perform(
				put("/Jobs/updateJobStatus")
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

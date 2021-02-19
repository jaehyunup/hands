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
import com.fasterxml.jackson.databind.ObjectMapper;

public class InsertJobTest extends ControllerTest {
	@Autowired
	private JobController handController;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	@Test
	@DisplayName("일거리 게시글 넣기")
	public void insertHandDealTest() throws Exception {
		Job hand = new Job();
		hand.setJobId("123123");
		hand.setJobUserUUid("af0ba8e1ed614e809d967c718f11913f");
		hand.setCategoryId("전체");
		hand.setContent("강아지 산책시켜주세요1");
		SimpleDateFormat format1 = new SimpleDateFormat ( "yyyy-MM-dd");
		Date time = new Date();
		String time1 = format1.format(time);
		
		hand.setJobRegdate(time);
		hand.setWorkingHour("15");
		hand.setJobCredit("3000");
		hand.setWorkingDate("2021-02-28");
		hand.setWorkingAddress("경산북도 구미 진평동 ");
		hand.setStatus("거래전");
		hand.setJobName("total search test2 - 날짜");
		String content = objectMapper.writeValueAsString(hand);
		
		mockMvc.perform(
				post("/Jobs/insertJob")
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

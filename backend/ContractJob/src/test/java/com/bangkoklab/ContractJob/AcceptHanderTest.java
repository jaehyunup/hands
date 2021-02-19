package com.bangkoklab.ContractJob;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import com.bangkoklab.ContractJob.controller.ContractHanderController;
import com.bangkoklab.ContractJob.controller.ContractHandyController;
import com.bangkoklab.ContractJob.dto.Contract;
import com.fasterxml.jackson.databind.ObjectMapper;

public class AcceptHanderTest extends ControllerTest {

	@Autowired
	private ContractHanderController controller;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	@Test
	@DisplayName("핸디에게 요청하기")
	public void requestToHandy() throws Exception {
		Contract contract = new Contract();
		contract.setContractJobId("777");
		contract.setHandy("run6722");
		contract.setHander("MOUSE1");
		String content = objectMapper.writeValueAsString(contract);
		mockMvc.perform(
				post("/acceptedByHander")
				.content(content)
				.contentType(MediaType.APPLICATION_JSON)
				).andDo(print())
				.andExpect(status().isOk());
		
	}
	@Override
	protected Object controller() {
		// TODO Auto-generated method stub
		return controller;
	}

}

package com.bangkoklab.ContractJob.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bangkoklab.ContractJob.dto.Contract;
import com.bangkoklab.ContractJob.service.ContractHandyService;


@RestController
public class ContractHandyController {

	@Autowired
	ContractHandyService Handyservice;

	// hander에게 거래 요청
	@PostMapping("/requestByHandy")
	public ResponseEntity<Map<String,Object>> RequestToHandy(@RequestBody Contract contract){
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = null;

		// 중복 방지를 위하여
		try {
			if(Handyservice.isHandy(contract)) {
				resultMap.put("message", "Exist");  //해당 핸디에게 이미 요청을 보냈다
				status = HttpStatus.OK;
				return new ResponseEntity<Map<String, Object>>(resultMap, status);
			}
			contract.setContractId(UUID.randomUUID().toString());
			contract.setHandyStatus("YES");
			contract.setHanderStatus("NO");
			contract.setContractStatus("BEFORE");
			Handyservice.RequestToHandy(contract);
			resultMap.put("message", "success");
			status = HttpStatus.OK;
		} catch (Exception e) {
			e.printStackTrace();
			resultMap.put("message", "fail");
			status = HttpStatus.ACCEPTED;
		}
		
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
			
	// handy 자신이 요청한 모든 거래 조회
	@PostMapping("/findHandyReq")
	public ResponseEntity<List<Contract>> getHandy(@RequestBody Contract contract) throws Exception{
		System.out.println(contract.getHandy());
		return new ResponseEntity<List<Contract>>(Handyservice.findHandyReq(contract),HttpStatus.OK);
	}
	
	// 특정 게시글에서 요청한 모든 거래 조회
	@PostMapping("/findHandyReqByCon")
	public ResponseEntity<List<Contract>> FindHandyContract(@RequestBody Contract contract) throws Exception{
		return new ResponseEntity<List<Contract>>(Handyservice.FindHandyContract(contract),HttpStatus.OK);
	}
	
	// 특정 게시글에서 요청한 모든 거래 조회
		@PostMapping("/findHandyGetReqByCon")
		public ResponseEntity<List<Contract>> FindHandyGetContract(@RequestBody Contract contract) throws Exception{
			return new ResponseEntity<List<Contract>>(Handyservice.FindHandyGetContract(contract),HttpStatus.OK);
		}
	
	// 거래 요청 삭제
	@DeleteMapping("/delContractHandy")
	public ResponseEntity<Map<String,Object>> delContractHandy(@RequestBody Contract contract){
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = null;

		try {
			Handyservice.delContractHandy(contract);
			resultMap.put("message", "success");
			status = HttpStatus.OK;
		} catch (Exception e) {
			e.printStackTrace();
			resultMap.put("message", "fail");
			status = HttpStatus.ACCEPTED;
		}
		
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	
	
	//요청 받은 거래 
	@PostMapping("/findHandyGet")
	public ResponseEntity<List<Contract>> findHandyGet(@RequestBody Contract contract) throws Exception{
		return new ResponseEntity<List<Contract>>(Handyservice.findHandyGet(contract),HttpStatus.OK);
	}
	
	@DeleteMapping("/delHandyGet")
	public ResponseEntity<Map<String,Object>> delHandyGet(@RequestBody Contract contract){
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = null;

		try {
			Handyservice.delHandyGet(contract);
			resultMap.put("message", "success");
			status = HttpStatus.OK;
		} catch (Exception e) {
			e.printStackTrace();
			resultMap.put("message", "fail");
			status = HttpStatus.ACCEPTED;
		}
		
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	
	// 승인
	@PostMapping("/acceptedByHandy")
	public ResponseEntity<Map<String,Object>> AcceptedByHandy(@RequestBody Contract contract){
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = null;
		// 중복 방지를 위하여
		try {
			contract.setHandyStatus("YES");
			contract.setHanderStatus("YES");
			contract.setContractStatus("TRADING");
			Handyservice.AcceptedByHandy(contract);
			resultMap.put("message", "success");
			status = HttpStatus.OK;
		} catch (Exception e) {
			e.printStackTrace();
			resultMap.put("message", "fail");
			status = HttpStatus.ACCEPTED;
		}
		
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	
}
   
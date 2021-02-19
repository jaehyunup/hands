package com.bangkoklab.ContractJob.service;

import java.util.List;

import com.bangkoklab.ContractJob.dto.Contract;

public interface ContractHandyService {

	public void RequestToHandy(Contract contract) throws Exception;
	// 거래 요청 승인
	public void AcceptedByHandy(Contract contract) throws Exception;
	
	// 핸디 자신의 모든 거래 요청 조회
	public List<Contract> findHandyReq(Contract contract) throws Exception;
	
	// 특정 일거리에 대한 핸디 자신의 모든 거래 요청 조회 (자신이 요청한거)
	public List<Contract> FindHandyContract(Contract contract) throws Exception;
	
	//특정 일거리에 대해 요청 받은 일거리 조회
	public List<Contract> FindHandyGetContract(Contract contract) throws Exception;
	
	// 이미 핸디에게 요청을 보냈는지 판단 => 이미 요청을 보냈으면 true, 아니면 false;
	public boolean isHandy(Contract contract) throws Exception;
	
	
	// 거래 요청 삭제
	public void delContractHandy(Contract contract) throws Exception;
	
	// 거래 요청 받음
	public List<Contract> findHandyGet(Contract contract) throws Exception;
	
	
	//받은 거래 요청 취소
	public void delHandyGet(Contract contract) throws Exception;
}

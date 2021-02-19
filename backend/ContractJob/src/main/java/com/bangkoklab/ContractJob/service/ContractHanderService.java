package com.bangkoklab.ContractJob.service;

import java.util.List;

import com.bangkoklab.ContractJob.dto.Contract;

public interface ContractHanderService {

	public void RequestToHander(Contract contract) throws Exception;

	// 이미 핸더에게 요청을 보냈는지 판단 => 이미 요청을 보냈으면 true, 아니면 false;
	public boolean isHander(Contract contract) throws Exception;

	// 핸더가 핸디에게 요청한 거래들 조회
	public List<Contract> FindHanderContract(Contract contract) throws Exception;

	// 거래 요청 삭제
	public void delContractHander(Contract contract) throws Exception;

	// 거래 요청 받음
	public List<Contract> findHanderGet(Contract contract) throws Exception;

	// 받은 거래 요청 취소
	public void delHanderGet(Contract contract) throws Exception;
	
	public void AcceptedByHander(Contract contract) throws Exception;
}

package com.bangkoklab.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bangkoklab.data.repository.mapper.ContractMapper;
import com.bangkoklab.service.ContractService;

/**
 * @packageName com.bangkoklab.service.impl
 * @fileName ContractServiceImpl
 * @author shimjaehyuk
 * @description 거래 서비스
 * @See ContractService
 **/
@Service
public class ContractServiceImpl implements ContractService{

	@Autowired
	ContractMapper contractMapper;

	/**
	 * @methodName getTargetUuid
	 * @author shimjaehyuk
	 * @param String contractId
	 * @return String
	 * @description contract에서 target uuid를 가져온다
	 **/
	public String getTargetUuid(String contractId) {
		return contractMapper.getHandyByContractId(contractId);
	}
}

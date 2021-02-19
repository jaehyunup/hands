package com.bangkoklab.data.repository.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ContractMapper {
	String getHandyByContractId(String contractId);
}

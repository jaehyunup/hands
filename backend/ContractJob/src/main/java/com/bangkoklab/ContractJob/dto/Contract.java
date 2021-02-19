package com.bangkoklab.ContractJob.dto;

import java.io.Serializable;

public class Contract implements Serializable {

	private static final long serialVersionUID = 1L;
	private String contractId;           // 계약 아이디
	private String contractJobId;        // 일거리 아이디
	private String handy;				 // 거래 제공자, 일손 제공자 
	private String hander;				 // 돈 받고 일하는 사람
	private String handyStatus;          // handy 거래 요청 상태 default : NO
	private String handerStatus;		 // hander 거래 요청 상태 default : NO
	private String contractStatus;       // handy, hander 둘 다 거래 승인을 하면 : -> Trading으로 변경  default -> before
	
	public String getContractId() {
		return contractId;
	}
	public void setContractId(String contractId) {
		this.contractId = contractId;
	}
	public String getContractJobId() {
		return contractJobId;
	}
	public void setContractJobId(String contractJobId) {
		this.contractJobId = contractJobId;
	}
	public String getHandy() {
		return handy;
	}
	public void setHandy(String handy) {
		this.handy = handy;
	}
	public String getHander() {
		return hander;
	}
	public void setHander(String hander) {
		this.hander = hander;
	}
	public String getHandyStatus() {
		return handyStatus;
	}
	public void setHandyStatus(String handyStatus) {
		this.handyStatus = handyStatus;
	}
	public String getHanderStatus() {
		return handerStatus;
	}
	public void setHanderStatus(String handerStatus) {
		this.handerStatus = handerStatus;
	}
	public String getContractStatus() {
		return contractStatus;
	}
	public void setContractStatus(String contractStatus) {
		this.contractStatus = contractStatus;
	}
	
	
}

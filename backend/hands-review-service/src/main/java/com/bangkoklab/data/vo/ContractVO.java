package com.bangkoklab.data.vo;

public class ContractVO {
	private String contractId;
	private String contractJobId;
	private String handy;
	private String hander;

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

	public ContractVO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ContractVO(String contractId, String contractJobId, String handy, String hander) {
		super();
		this.contractId = contractId;
		this.contractJobId = contractJobId;
		this.handy = handy;
		this.hander = hander;
	}

	@Override
	public String toString() {
		return "ContractVO [contractId=" + contractId + ", contractJobId=" + contractJobId + ", handy=" + handy
				+ ", hander=" + hander + "]";
	}

}

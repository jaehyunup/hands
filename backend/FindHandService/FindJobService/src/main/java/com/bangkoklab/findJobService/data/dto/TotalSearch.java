package com.bangkoklab.findJobService.data.dto;

public class TotalSearch {
	private String dong;
	private String category;
	private String minCredit;
	private String maxCredit;
	private long dday;
	
	public String getDong() {
		return dong;
	}
	public void setDong(String dong) {
		this.dong = dong;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getMinCredit() {
		return minCredit;
	}
	public void setMinCredit(String minCredit) {
		this.minCredit = minCredit;
	}
	public String getMaxCredit() {
		return maxCredit;
	}
	public void setMaxCredit(String maxCredit) {
		this.maxCredit = maxCredit;
	}
	public long getDday() {
		return dday;
	}
	public void setDday(long dday) {
		this.dday = dday;
	}
	
	
}

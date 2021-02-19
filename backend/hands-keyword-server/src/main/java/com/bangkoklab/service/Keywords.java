package com.bangkoklab.service;

import java.util.List;

public class Keywords {
	private List<String> keywords;

	public List<String> getKeywords() {
		return keywords;
	}

	public void setKeywords(List<String> keywords) {
		this.keywords = keywords;
	}

	public Keywords() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Keywords(List<String> keywords) {
		super();
		this.keywords = keywords;
	}

	@Override
	public String toString() {
		return "Keywords [keywords=" + keywords + "]";
	}

}

package com.genuitec.qfconf.backend.model;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "datatable")
public class DataTableResult {
	private List<String[]> aaData;

	@XmlElement(name = "aaData")
	public List<String[]> getRowData() {
		return aaData;
	}

	public void setRowData(List<String[]> data) {
		this.aaData = data;
	}

	public void addRowData(String... data) {
		if (aaData == null)
			aaData = new ArrayList<String[]>();
		aaData.add(data);
	}

	public void addRowData(List<String> data) {
		if (aaData == null)
			aaData = new ArrayList<String[]>();
		aaData.add(data.toArray(new String[data.size()]));
	}
}

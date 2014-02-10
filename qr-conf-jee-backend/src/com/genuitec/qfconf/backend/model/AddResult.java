package com.genuitec.qfconf.backend.model;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "result")
public class AddResult {

	public AddResult() {
		// default constructor
	}

	public AddResult(boolean success, int addedID) {
		this.success = success;
		this.addedID = addedID;
	}

	private boolean success;
	private int addedID;

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public int getAddedID() {
		return addedID;
	}

	public void setAddedID(int addedID) {
		this.addedID = addedID;
	}

}

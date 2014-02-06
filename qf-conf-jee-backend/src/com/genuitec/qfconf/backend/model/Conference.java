package com.genuitec.qfconf.backend.model;

import java.util.Date;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Conference implements Comparable<Conference> {

	private int id;
	private String name;
	private Date startsOn;
	private Date endsOn;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getStartsOn() {
		return startsOn;
	}

	public void setStartsOn(Date startsOn) {
		this.startsOn = startsOn;
	}

	public Date getEndsOn() {
		return endsOn;
	}

	public void setEndsOn(Date endsOn) {
		this.endsOn = endsOn;
	}

	@Override
	public int compareTo(Conference arg0) {
		return arg0.startsOn.compareTo(this.startsOn);
	}
}
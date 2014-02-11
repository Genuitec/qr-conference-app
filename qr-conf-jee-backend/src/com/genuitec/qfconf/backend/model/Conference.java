/*******************************************************************************
 *  Copyright (c) 2014 Genuitec, LLC.
 *  All rights reserved. This program and the accompanying materials
 *  are made available under the terms of the Eclipse Public License v1.0
 *  which accompanies this distribution, and is available at
 *  http://www.eclipse.org/legal/epl-v10.html
 * 
 *  Contributors:
 *     Genuitec, LLC - initial API and implementation using MyEclipse
 *******************************************************************************/
package com.genuitec.qfconf.backend.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.genuitec.qfconf.backend.serialize.YYYYMMDDDateDeserializer;
import com.genuitec.qfconf.backend.serialize.YYYYMMDDDateSerializer;

@Entity
@XmlRootElement
public class Conference implements Comparable<Conference> {

	@Id
	@GeneratedValue
	private int id;
	private String name;
	@Temporal(TemporalType.DATE)
	private Date startsOn;
	@Temporal(TemporalType.DATE)
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

	@JsonDeserialize(using = YYYYMMDDDateDeserializer.class)
	@JsonSerialize(using = YYYYMMDDDateSerializer.class)
	public void setStartsOn(Date startsOn) {
		this.startsOn = startsOn;
	}

	public Date getEndsOn() {
		return endsOn;
	}

	@JsonDeserialize(using = YYYYMMDDDateDeserializer.class)
	@JsonSerialize(using = YYYYMMDDDateSerializer.class)
	public void setEndsOn(Date endsOn) {
		this.endsOn = endsOn;
	}

	@Override
	public int compareTo(Conference arg0) {
		return arg0.startsOn.compareTo(this.startsOn);
	}
}
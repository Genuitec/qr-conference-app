package com.genuitec.qfconf.backend.ws;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.SortedSet;
import java.util.TreeMap;
import java.util.TreeSet;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import com.genuitec.qfconf.backend.model.Conference;
import com.sun.jersey.spi.resource.Singleton;

@Produces("application/xml")
@Path("conferences")
@Singleton
public class ConferencesResource {

	// mock implementation of storage
	private TreeMap<Integer, Conference> conferenceMap = new TreeMap<Integer, Conference>();

	public ConferencesResource() {
		Conference conf = new Conference();
		conf.setId(1);
		DateFormat format = new SimpleDateFormat("yyyy/MM/dd");
		try {
			conf.setStartsOn(format.parse("2014/3/17"));
			conf.setEndsOn(format.parse("2014/3/20"));
		} catch (ParseException e) {
			throw new IllegalStateException(
					"Unable to perform basic calendar functions", e);
		}
		conf.setName("EclipseCon North America 2014");
		conferenceMap.put(1, conf);
	}

	@GET
	public List<Conference> getConferences() {
		SortedSet<Conference> conferences = new TreeSet<Conference>();
		conferences.addAll(conferenceMap.values());
		return new ArrayList<Conference>(conferences);
	}

	@GET
	@Path("{id}")
	public Conference getConference(@PathParam("id") int conferenceID) {
		return conferenceMap.get(conferenceID);
	}

	@POST
	@Path("add")
	@Consumes("application/xml")
	@Produces("text/html")
	public String addConference(Conference conference) {
		conferenceMap.put(conference.getId(), conference);
		return "Conference " + conference.getName() + " added with ID "
				+ conference.getId();
	}
}
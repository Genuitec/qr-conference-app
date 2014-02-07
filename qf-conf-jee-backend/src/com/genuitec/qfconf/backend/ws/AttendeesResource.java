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

import com.genuitec.qfconf.backend.model.Attendee;
import com.genuitec.qfconf.backend.model.Rating;
import com.sun.jersey.spi.resource.Singleton;

@Produces("application/xml")
@Path("attendees")
@Singleton
public class AttendeesResource {

	// mock implementation of storage
	private TreeMap<Integer, Attendee> attendeeMap = new TreeMap<Integer, Attendee>();

	public AttendeesResource() {
		Attendee attendee = new Attendee();
		attendee.setId(1);
		DateFormat format = new SimpleDateFormat("yyyy/MM/dd HH:mm");
		try {
			attendee.setScannedAt(format.parse("2014/3/18 13:40"));
			attendee.setModifiedAt(format.parse("2014/3/18 17:12"));
		} catch (ParseException e) {
			throw new IllegalStateException(
					"Unable to perform basic calendar functions", e);
		}

		attendee.setConferenceID(1);

		attendee.setFirst("John");
		attendee.setLast("Appleseed");
		attendee.setCell("555-555-1212");
		attendee.setEmail("john@seed.com");
		attendee.setEmployee("Jed");
		attendee.setRating(Rating.warm);

		attendeeMap.put(1, attendee);
	}

	@GET
	@Path("{conference}")
	public List<Attendee> getAttendees(@PathParam("conference") int conferenceID) {
		SortedSet<Attendee> Attendees = new TreeSet<Attendee>();
		Attendees.addAll(attendeeMap.values());
		return new ArrayList<Attendee>(Attendees);
	}

	@GET
	@Path("{conference}/{attendee}")
	public Attendee getAttendee(@PathParam("conference") int conferenceID,
			@PathParam("attendee") int attendeeID) {
		return attendeeMap.get(attendeeID);
	}

	@POST
	@Path("{conference}/add")
	@Consumes("application/xml")
	@Produces("text/html")
	public String addAttendee(@PathParam("conference") int conferenceID,
			Attendee attendee) {
		attendeeMap.put(attendee.getId(), attendee);
		return "Attendee " + attendee.getFirst() + " " + attendee.getLast()
				+ " added with ID " + attendee.getId();
	}
}
package com.genuitec.qfconf.backend.ws;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.annotation.security.RolesAllowed;
import javax.persistence.EntityManager;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import com.genuitec.qfconf.backend.model.Attendee;
import com.genuitec.qfconf.backend.model.ConferenceModel;

@Produces("application/xml")
@Path("attendees")
@RolesAllowed({ "myeclipseWeb" })
@SuppressWarnings("unchecked")
public class AttendeesResource {

	private Logger log = Logger.getLogger(AttendeesResource.class.getName());

	@GET
	@Path("{conference}/xml")
	public List<Attendee> getAttendeesXML(
			@PathParam("conference") int conferenceID) {
		EntityManager em = ConferenceModel.newEntityManager();
		try {
			List<Attendee> confs = em
					.createQuery(
							"SELECT a FROM Attendee a WHERE a.conferenceID="
									+ conferenceID
									+ " ORDER BY a.organization, a.lastName, a.firstName",
							Attendee.class).getResultList();
			log.log(Level.INFO,
					"Responding with {0} attendees for conference ID {1}",
					new Object[] { confs.size(), conferenceID });
			return confs;
		} finally {
			em.close();
		}
	}

	@GET
	@Path("{conference}/json")
	@Produces("application/json")
	public String getAttendeesJson(@PathParam("conference") int conferenceID) {
		JSONArray rows = new JSONArray();
		JSONObject model = new JSONObject();
		model.put("aaData", rows);
		for (Attendee next : getAttendeesXML(conferenceID)) {
			JSONArray data = toJsonArray(next);
			rows.add(data);
		}
		return model.toString();
	}

	@GET
	@Path("{conference}/{attendee}/xml")
	public Attendee getAttendeeXML(@PathParam("conference") int conferenceID,
			@PathParam("attendee") int attendeeID) {
		EntityManager em = ConferenceModel.newEntityManager();
		try {
			Attendee attendee = em.find(Attendee.class, attendeeID);
			if (attendee == null)
				log.log(Level.INFO, "Unable to find attendee with ID {0}",
						new Object[] { attendeeID });
			else if (attendee.getConferenceID() != conferenceID)
				log.log(Level.INFO,
						"Mismatch for conference ID for attendee with ID {0}",
						new Object[] { attendeeID });
			else
				log.log(Level.INFO, "Found attendee with ID {0}: {1} {2}",
						new Object[] { attendeeID, attendee.getFirstName(),
								attendee.getLastName() });
			return attendee;
		} finally {
			em.close();
		}
	}

	@POST
	@Path("add/xml")
	@Consumes("application/xml")
	@Produces("text/html")
	public String addAttendeeXML(Attendee attendee) {
		EntityManager em = ConferenceModel.newEntityManager();
		try {
			em.getTransaction().begin();
			em.persist(attendee);
			em.getTransaction().commit();
			log.log(Level.INFO, "Added attendee with ID {0}: {1} {2}",
					new Object[] { attendee.getId(), attendee.getFirstName(),
							attendee.getLastName() });
			return "added-attendee: " + attendee.getId();
		} finally {
			em.close();
		}
	}

	public long getAttendeeCount(int conferenceID) {
		EntityManager em = ConferenceModel.newEntityManager();
		try {
			Object result = em.createQuery(
					"SELECT count(a) FROM Attendee a WHERE a.conferenceID="
							+ conferenceID).getSingleResult();
			return (Long) result;
		} finally {
			em.close();
		}
	}

	private JSONArray toJsonArray(Attendee attendee) {
		DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
		JSONArray data = new JSONArray();
		data.add(attendee.getId());
		data.add(attendee.getOrganization());
		data.add(attendee.getFirstName());
		data.add(attendee.getLastName());
		data.add(attendee.getTitle());
		data.add(attendee.isFollowup() ? "Follow-up" : "");
		String rating = attendee.getRating().toString();
		if (rating == null)
			rating = "cold";
		rating = Character.toUpperCase(rating.charAt(0)) + rating.substring(1);
		data.add(rating);
		String tags = "";
		for (String next : attendee.getTags()) {
			if (tags.length() > 0)
				tags += ", ";
			tags += next;
		}
		data.add(tags);
		data.add(dateFormat.format(attendee.getScannedat()));
		data.add(attendee.getEmployee());
		String notes = attendee.getNotes();
		data.add(notes != null && notes.length() > 0 ? "Has Notes" : "");
		return data;
	}
}
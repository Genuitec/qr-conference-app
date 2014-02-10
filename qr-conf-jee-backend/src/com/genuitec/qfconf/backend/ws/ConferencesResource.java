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

import com.genuitec.qfconf.backend.model.Conference;
import com.genuitec.qfconf.backend.model.ConferenceModel;

@Produces("application/xml")
@Path("conferences")
@RolesAllowed({ "myeclipseWeb" })
@SuppressWarnings("unchecked")
public class ConferencesResource {

	private Logger log = Logger.getLogger(ConferencesResource.class.getName());

	@GET
	@Path("xml")
	public List<Conference> getConferencesXML() {
		EntityManager em = ConferenceModel.newEntityManager();
		try {
			List<Conference> confs = em.createQuery(
					"SELECT c FROM Conference c ORDER BY c.startsOn",
					Conference.class).getResultList();
			log.log(Level.INFO,
					"Responding with {0} conferences received from the database",
					new Object[] { confs.size() });
			return confs;
		} finally {
			em.close();
		}
	}

	@GET
	@Path("json")
	@Produces("application/json")
	public String getConferencesJson() {
		JSONArray rows = new JSONArray();
		JSONObject model = new JSONObject();
		model.put("aaData", rows);
		for (Conference next : getConferencesXML()) {
			JSONArray data = toJsonArray(next);
			rows.add(data);
		}
		return model.toString();
	}

	@GET
	@Path("{id}/xml")
	public Conference getConferenceXML(@PathParam("id") int conferenceID) {
		EntityManager em = ConferenceModel.newEntityManager();
		try {
			Conference conf = em.find(Conference.class, conferenceID);
			if (conf == null)
				log.log(Level.INFO, "Unable to find conference with ID {0}",
						new Object[] { conferenceID });
			else
				log.log(Level.INFO, "Found conference with ID {0}: {1}",
						new Object[] { conferenceID, conf.getName() });
			return conf;
		} finally {
			em.close();
		}
	}

	@GET
	@Path("{id}/json")
	@Produces("application/json")
	public String getConferenceJson(@PathParam("id") int conferenceID) {
		JSONObject model = new JSONObject();
		Conference conf = getConferenceXML(conferenceID);
		if (conf != null)
			model.put("aaData", conf);
		return model.toString();
	}

	@POST
	@Path("add/xml")
	@Consumes("application/xml")
	@Produces("text/html")
	public String addConferenceXML(Conference conference) {
		EntityManager em = ConferenceModel.newEntityManager();
		try {
			em.getTransaction().begin();
			em.persist(conference);
			em.getTransaction().commit();
			log.log(Level.INFO, "Added conference with ID {0}: {1}",
					new Object[] { conference.getId(), conference.getName() });
			return "added-conference: " + conference.getId();
		} finally {
			em.close();
		}
	}

	private JSONArray toJsonArray(Conference conference) {
		DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
		JSONArray data = new JSONArray();
		data.add(conference.getId());
		data.add(conference.getName());
		data.add(dateFormat.format(conference.getStartsOn()));
		data.add(dateFormat.format(conference.getEndsOn()));
		data.add(new AttendeesResource().getAttendeeCount(conference.getId()));
		return data;
	}
}
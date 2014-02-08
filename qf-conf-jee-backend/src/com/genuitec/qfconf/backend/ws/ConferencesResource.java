package com.genuitec.qfconf.backend.ws;

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

import com.genuitec.qfconf.backend.model.Conference;
import com.genuitec.qfconf.backend.model.ConferenceModel;

@Produces("application/xml")
@Path("conferences")
@RolesAllowed({ "myeclipseWeb" })
public class ConferencesResource {

	private Logger log = Logger.getLogger(ConferencesResource.class.getName());

	@GET
	public List<Conference> getConferences() {
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
	@Path("{id}")
	public Conference getConference(@PathParam("id") int conferenceID) {
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

	@POST
	@Path("add")
	@Consumes("application/xml")
	@Produces("text/html")
	public String addConference(Conference conference) {
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
}
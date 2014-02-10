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

import com.genuitec.qfconf.backend.model.AddResult;
import com.genuitec.qfconf.backend.model.Conference;
import com.genuitec.qfconf.backend.model.ConferenceModel;
import com.genuitec.qfconf.backend.model.DataTableResult;

@Produces({ "application/xml", "application/json" })
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
	@Path("datatable")
	@Produces("application/json")
	public DataTableResult getConferencesDatatable() {
		DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
		DataTableResult result = new DataTableResult();
		for (Conference conference : getConferences()) {
			result.addRowData(String.valueOf(conference.getId()), conference
					.getName(), dateFormat.format(conference.getStartsOn()),
					dateFormat.format(conference.getEndsOn()), String
							.valueOf(new AttendeesResource()
									.getAttendeeCount(conference.getId())));
		}
		return result;
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
	@Consumes({ "application/xml", "application/json" })
	@Produces({ "application/xml", "application/json" })
	public AddResult addConference(Conference conference) {
		EntityManager em = ConferenceModel.newEntityManager();
		try {
			em.getTransaction().begin();
			em.persist(conference);
			em.getTransaction().commit();
			log.log(Level.INFO, "Added conference with ID {0}: {1}",
					new Object[] { conference.getId(), conference.getName() });
			return new AddResult(true, conference.getId());
		} finally {
			em.close();
		}
	}
}
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

import com.genuitec.qfconf.backend.model.Attendee;
import com.genuitec.qfconf.backend.model.ConferenceModel;

@Produces("application/xml")
@Path("sync")
@RolesAllowed({ "myeclipseWeb" })
public class SyncService {

	private Logger log = Logger.getLogger(SyncService.class.getName());

	@GET
	@Path("{conference}")
	public List<Attendee> getAttendees(@PathParam("conference") int conferenceID) {
		EntityManager em = ConferenceModel.newEntityManager();
		try {
			List<Attendee> confs = em.createQuery(
					"SELECT a FROM Attendee a WHERE a.conferenceID="
							+ conferenceID
							+ " ORDER BY a.lastName, a.firstName",
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
	@Path("{conference}/{attendee}")
	public Attendee getAttendee(@PathParam("conference") int conferenceID,
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
	@Path("add")
	@Consumes("application/xml")
	@Produces("text/html")
	public String addAttendee(Attendee attendee) {
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
}
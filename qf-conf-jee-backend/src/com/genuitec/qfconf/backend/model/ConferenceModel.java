package com.genuitec.qfconf.backend.model;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class ConferenceModel {

	private static EntityManagerFactory factory = Persistence
			.createEntityManagerFactory("qf-conf-jee-backend");

	public static EntityManager newEntityManager() {
		return factory.createEntityManager();
	}
}

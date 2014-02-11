<%
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
%>
<%@ page language="java" pageEncoding="ISO-8859-1"
	import="java.util.*,com.genuitec.qfconf.backend.model.*,com.genuitec.qfconf.backend.ws.*"%>
<%
	String conf = request.getParameter("conf");
	if (!Validate.isInt(conf)) {
		response.sendRedirect("../");
		return;
	}
	String id = request.getParameter("id");
	if (!Validate.isInt(id)) {
		response.sendRedirect("../");
		return;
	}
	Attendee attendee = new AttendeesResource().getAttendee(Validate.getInt(conf), Validate.getInt(id));
	if (attendee == null) {
		response.sendRedirect("../");
		return;
	}
%>
	<h1>Attendee <strong><%= attendee.getFirstName() + " " + attendee.getLastName() %></strong></h1>
	<style>
	label.details {
		float: left;
		margin-right: 10px;
		color: #999999;
		width: 70px;
	}
	#left, #right {
		float: left; 
		width: 50%;
		margin-top: -12px;
 	}
 	</style>
    <div id="left"> 
    	<h6>Contact Details</h6>
        <%
        	out.println("<label class='details'>Who</label><b>"+attendee.getFirstName()+" "+attendee.getLastName()+"</b><br/>");
	    	if (Validate.isNonEmpty(attendee.getOrganization()))
	        	out.println("<label class='details'>Company</label>"+attendee.getOrganization()+"<br/>");
	    	if (Validate.isNonEmpty(attendee.getTitle()))
	        	out.println("<label class='details'>Title</label>"+attendee.getTitle()+"<br/>");
	    	out.print("<label class='details'>Email</label>");
	    	if (Validate.isNonEmpty(attendee.getEmail()))
	        	out.println(attendee.getEmail()+"<br/>");
	    	else
	        	out.println("<i style='color: #9999aa'>Not Available</i><br/>");
        %>
        <h6>Contact Numbers</h6>
        <%
        	boolean number = false;
	    	if (Validate.isNonEmpty(attendee.getTelephone())) {
	        	out.println("<label class='details'>Telephone</label>"+attendee.getTelephone()+"<br/>");
	        	number = true;
	    	}
	    	if (Validate.isNonEmpty(attendee.getCell())) {
	        	out.println("<label class='details'>Cellphone</label>"+attendee.getCell()+"<br/>");
	        	number = true;
	    	}
	    	if (Validate.isNonEmpty(attendee.getFax())) {
	        	out.println("<label class='details'>Fax Line</label>"+attendee.getFax()+"<br/>");
	        	number = true;
	    	}
	    	if (!number) {
	    		out.println("<label class='details'>Phones</label><i style='color: #9999aa'>Not Available</i><br/>");
	    	}
        %>
    </div>

    <div id="right">
		<h6>Contact Rating</h6>
		<%
			out.print("<label class='details'>Rating</label>");
			switch (attendee.getRating()) {
				case cold:
					out.println("<b>Cold Rating</b><br/>");
					break;
				case warm:
					out.println("<b>Warm Rating</b><br/>");
					break;
				case hot:
					out.println("<b>Hot! Rating</b><br/>");
					break;
			}
			if (attendee.getTags() != null && !attendee.getTags().isEmpty())  {
				String tagsStr = attendee.getTags().toString();
				out.println("<label class='details'>Tags</label>"+tagsStr.substring(1, tagsStr.length()-1));
			}
			if (Validate.isNonEmpty(attendee.getNotes()))
				out.println("<label class='details'>Notes</label>"+attendee.getNotes());
		%>
		<h6>Street Address</h6>
		<%
	    	boolean address = false;
	    	if (Validate.isNonEmpty(attendee.getStreet())) {
	        	out.println("<label class='details'>Street</label>"+attendee.getStreet()+"<br/>");
	        	address = true;
	    	}
	    	if (Validate.isNonEmpty(attendee.getCity())) {
	        	out.println("<label class='details'>City</label>"+attendee.getCity()+"<br/>");
	        	address = true;
	    	}
	    	if (Validate.isNonEmpty(attendee.getState())) {
	        	out.println("<label class='details'>State</label>"+attendee.getState()+"<br/>");
	        	address = true;
	    	}
	    	if (Validate.isNonEmpty(attendee.getCountry())) {
	        	out.println("<label class='details'>Country</label>"+attendee.getCountry()+"<br/>");
	        	address = true;
	    	}
	    	if (Validate.isNonEmpty(attendee.getPostcode())) {
	        	out.println("<label class='details'>Post Code</label>"+attendee.getPostcode()+"<br/>");
	        	address = true;
	    	}
	    	if (!address) {
	    		out.println("<label class='details'>Address</label><i style='color: #9999aa'>Not Available</i><br/>");
	    	}
		%>
    </div>
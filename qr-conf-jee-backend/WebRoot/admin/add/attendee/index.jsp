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
<%@ page 
	language="java" pageEncoding="ISO-8859-1"
	import="java.util.*,com.genuitec.qfconf.backend.model.*,com.genuitec.qfconf.backend.ws.*"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";

	String id = request.getParameter("id");
	if (!Validate.isInt(id)) {
		response.sendRedirect("../");
		return;
	}
	Conference conf = new ConferencesResource().getConference(Validate.getInt(id));
	if (conf == null) {
		response.sendRedirect("../");
		return;
	}
	
	String first = request.getParameter("first");
	String last = request.getParameter("last");
	String org = request.getParameter("org");
	String action = request.getParameter("action");
	String error = null;
	if ("add".equals(action)) {
		if (!Validate.isNonEmpty(first))
			error = "First Name is required.";
		else if (!Validate.isNonEmpty(last))
			error = "Last Name is required.";
		else if (!Validate.isNonEmpty(org))
			error = "Organization is required.";
		else {
			Attendee attendee = new Attendee();
			attendee.setConferenceID(conf.getId());
			attendee.setEmployee(request.getRemoteUser());

			// details about the person
			attendee.setFirstName(first);
			attendee.setLastName(last);
			attendee.setOrganization(org);
			attendee.setTitle(request.getParameter("title"));
			attendee.setEmail(request.getParameter("email"));

			// ratings from the conference
			attendee.setFollowup("yes".equals(request.getParameter("followup")));
			try {
				attendee.setRating(Rating.valueOf(request.getParameter("rating")));
			} catch (Exception e){
				attendee.setRating(Rating.cold);
			}
			String tags = request.getParameter("tags");
			if (tags != null && tags.length() > 0) {
				SortedSet<String> tagsSet = new TreeSet<String>();
				for (String next : tags.split(","))
					tagsSet.add(next.trim());
				attendee.setTags(tagsSet);
			}
			attendee.setNotes(request.getParameter("notes"));

			// contact phone numbers
			attendee.setTelephone(request.getParameter("telephone"));
			attendee.setCell(request.getParameter("cell"));
			attendee.setFax(request.getParameter("fax"));

			// contact address
			attendee.setStreet(request.getParameter("street"));
			attendee.setCity(request.getParameter("city"));
			attendee.setState(request.getParameter("state"));
			attendee.setCountry(request.getParameter("country"));
			attendee.setPostcode(request.getParameter("postcode"));

			attendee.setModifiedAt(new Date());
			attendee.setScannedAt(new Date());
			new AttendeesResource().addAttendee(attendee);
			response.sendRedirect("../../view/?id="+conf.getId());
			return;
		}
	}
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>

<head>
<base href="<%=basePath%>">
<title>QR Conference Management</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<link href="css/jquery-ui-1.10.4.custom.css" rel="stylesheet">
<link href="css/genuitec-styles.css" rel="stylesheet">
<link href="css/genuitec-forms.css" rel="stylesheet">
<script src="js/jquery-1.10.2.js"></script>
<script src="js/jquery-ui-1.10.4.custom.js"></script>
<style>
	div.left {
		display: block;
		float: left; 
		width: 360px;
 	}
	div.right {
		display: block;
		float: left; 
		width: 420px;
 	}
 	div.buttons {
 		overflow: auto;
 		width: 100%;
 	}
</style>
</head>

<body>
	<script>
		$(function() {
			$("#add-attendee").button().click(function() {
				$( "#addForm" ).submit();
			});
			$("#cancel-form").button().click(function() {
				window.location.href = "admin/view/?id=<%= conf.getId() %>";
			});
		});
	</script>
	<h1>Manage the QR Conference Center</h1>
	<h2>Manually add attendee for <strong><%= conf.getName() %></strong></h2>
	<div class="form">
	<form name="addForm" method="POST">
		<input type="hidden" name="action" value="add">
		<div class="left">
			<h6>Contact Details</h6>
			<p class="first">
				<input type="text" name="first" id="first" size="25" value="<%= Validate.nonNull(request, "first") %>"><label class="right"
					for="first">First Name</label>
			</p>
			<p class="last">
				<input type="text" name="last" id="last" size="25" value="<%= Validate.nonNull(request, "last") %>"><label class="right"
					for="last">Last Name</label>
			</p>
			<p class="org">
				<input type="text" name="org" id="org" size="25" value="<%= Validate.nonNull(request, "org") %>"><label class="right"
					for="org">Organization</label>
			</p>
			<p class="title">
				<input type="text" name="title" id="title" size="25" value="<%= Validate.nonNull(request, "title") %>"><label class="right"
					for="title">Title</label>
			</p>
			<p class="email">
				<input type="text" name="email" id="email" size="25" value="<%= Validate.nonNull(request, "email") %>"><label class="right"
					for="email">Email</label>
			</p>
			<h6>Phone Numbers</h6>
			<p class="telephone">
				<input type="text" name="telephone" id="telephone" size="25" value="<%= Validate.nonNull(request, "telephone") %>"><label class="right"
					for="telephone">Telephone</label>
			</p>
			<p class="cell">
				<input type="text" name="cell" id="cell" size="25" value="<%= Validate.nonNull(request, "cell") %>"><label class="right"
					for="cell">Cell Phone</label>
			</p>
			<p class="fax">
				<input type="text" name="fax" id="fax" size="25" value="<%= Validate.nonNull(request, "fax") %>"><label class="right"
					for="fax">Fax Number</label>
			</p>
		</div>
		<div class="right">
			<h6>Contact Rating</h6>
			<p class="followup">
				<input type="text" name="followup" id="followup" value="<%= Validate.nonNull(request, "followup") %>"><label class="right"
					for="followup">Follow-up (yes or no)</label>
			</p>
			<p class="rating">
				<input type="text" name="rating" id="rating" size="25" value="<%= Validate.nonNull(request, "rating") %>"><label class="right"
					for="rating">Rating (cold, warm, or hot)</label>
			</p>
			<p class="tags">
				<input type="text" name="tags" id="tags" size="25" value="<%= Validate.nonNull(request, "tags") %>"><label class="right"
					for="tags">Tags (comma-separated)</label>
			</p>
			<p class="notes">
				<input type="text" name="notes" id="notes" size="25" value="<%= Validate.nonNull(request, "notes") %>"><label class="right"
					for="notes">Notes</label>
			</p>
			<h6>Street Address</h6>
			<p class="street">
				<input type="text" name="street" id="street" size="25" value="<%= Validate.nonNull(request, "street") %>"><label class="right"
					for="street">Street</label>
			</p>
			<p class="city">
				<input type="text" name="city" id="city" size="25" value="<%= Validate.nonNull(request, "city") %>"><label class="right"
					for="city">City</label>
			</p>
			<p class="state">
				<input type="text" name="state" id="state" size="25" value="<%= Validate.nonNull(request, "state") %>"><label class="right"
					for="state">State</label>
			</p>
			<p class="country">
				<input type="text" name="country" id="country" size="25" value="<%= Validate.nonNull(request, "country") %>"><label class="right"
					for="country">Country</label>
			</p>
			<p class="postcode">
				<input type="text" name="postcode" id="postcode" size="25" value="<%= Validate.nonNull(request, "postcode") %>"><label class="right"
					for="postcode">Post Code</label>
			</p>
		</div>
		<div class="clear"></div>
		<div class="buttons">
			<% if (error != null) { %>
			<h4><font color='red'><%= error %></font></h4>
			<% } %>
			<p>
				<button id="add-attendee">Add Attendee</button>
				<button type="button" id="cancel-form">Cancel</button>
			</p>
		</div>
	</form>
	</div>
</body>
</html>
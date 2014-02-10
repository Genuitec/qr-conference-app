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
			response.sendRedirect("../../");
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
</head>

<body>
	<h1>Manage the QR Conference Center</h1>
	<h2>Manually add attendee for <strong><%= conf.getName() %></strong></h2>
	<form name="addForm" method="POST">
		<input type="hidden" name="action" value="add">
		<h6>Contact Details</h6>
		<p class="first">
			<input type="text" name="first" id="first" size="25" value="<%= Validate.nonNull(request, "first") %>"><label
				for="first">First Name</label>
		</p>
		<p class="last">
			<input type="text" name="last" id="last" size="25" value="<%= Validate.nonNull(request, "last") %>"><label
				for="last">Last Name</label>
		</p>
		<p class="org">
			<input type="text" name="org" id="org" size="25" value="<%= Validate.nonNull(request, "org") %>"><label
				for="org">Organization</label>
		</p>
		<p class="title">
			<input type="text" name="title" id="title" size="25" value="<%= Validate.nonNull(request, "title") %>"><label
				for="title">Title</label>
		</p>
		<p class="email">
			<input type="text" name="email" id="email" size="25" value="<%= Validate.nonNull(request, "email") %>"><label
				for="email">Email</label>
		</p>
		<h6>Contact Rating</h6>
		<p class="followup">
			<input type="text" name="followup" id="followup" value="<%= Validate.nonNull(request, "followup") %>"><label
				for="followup">Follow-up (yes or no)</label>
		</p>
		<p class="rating">
			<input type="text" name="rating" id="rating" size="25" value="<%= Validate.nonNull(request, "rating") %>"><label
				for="rating">Rating (cold, warm, or hot)</label>
		</p>
		<p class="tags">
			<input type="text" name="tags" id="tags" size="25" value="<%= Validate.nonNull(request, "tags") %>"><label
				for="tags">Tags (comma-separated)</label>
		</p>
		<p class="notes">
			<input type="text" name="notes" id="notes" size="25" value="<%= Validate.nonNull(request, "notes") %>"><label
				for="notes">Notes</label>
		</p>
		<h6>Phone Numbers</h6>
		<p class="telephone">
			<input type="text" name="telephone" id="telephone" size="25" value="<%= Validate.nonNull(request, "telephone") %>"><label
				for="telephone">Telephone</label>
		</p>
		<p class="cell">
			<input type="text" name="cell" id="cell" size="25" value="<%= Validate.nonNull(request, "cell") %>"><label
				for="cell">Cell Phone</label>
		</p>
		<p class="fax">
			<input type="text" name="fax" id="fax" size="25" value="<%= Validate.nonNull(request, "fax") %>"><label
				for="fax">Fax Number</label>
		</p>
		<h6>Street Address</h6>
		<p class="street">
			<input type="text" name="street" id="street" size="25" value="<%= Validate.nonNull(request, "street") %>"><label
				for="street">Street</label>
		</p>
		<p class="city">
			<input type="text" name="city" id="city" size="25" value="<%= Validate.nonNull(request, "city") %>"><label
				for="city">City</label>
		</p>
		<p class="state">
			<input type="text" name="state" id="state" size="25" value="<%= Validate.nonNull(request, "state") %>"><label
				for="state">State</label>
		</p>
		<p class="country">
			<input type="text" name="country" id="country" size="25" value="<%= Validate.nonNull(request, "country") %>"><label
				for="country">Country</label>
		</p>
		<p class="postcode">
			<input type="text" name="postcode" id="postcode" size="25" value="<%= Validate.nonNull(request, "postcode") %>"><label
				for="postcode">Post Code</label>
		</p>
		<% if (error != null) { %>
		<h4><%= error %></h4>
		<% } %>
		<p class="submit">
			<input type="submit" value="Add Attendee" />
			<a class="buttonred" href="admin/">Cancel</a>
		</p>
	</form>
</body>
</html>
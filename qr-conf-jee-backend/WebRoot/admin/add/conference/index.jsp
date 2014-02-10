<%@ page 
	language="java" pageEncoding="ISO-8859-1"
	import="java.util.*,com.genuitec.qfconf.backend.model.*,com.genuitec.qfconf.backend.ws.*"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";

	String name = request.getParameter("name");
	String startsOn = request.getParameter("startsOn");
	String stopsOn = request.getParameter("stopsOn");
	String action = request.getParameter("action");
	String error = null;
	if ("add".equals(action)) {
		if (!Validate.isNonEmpty(name))
			error = "Name is required.";
		else if (!Validate.isDate(startsOn))
			error = "Starts On is required.";
		else if (!Validate.isDate(stopsOn))
			error = "Stops On is required."; 
		else {
			Conference conf = new Conference();
			conf.setName(name);
			conf.setStartsOn(Validate.getDate(startsOn));
			conf.setEndsOn(Validate.getDate(stopsOn));
			new ConferencesResource().addConferenceXML(conf);
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
	<h2>Set up a new conference for management:</h2>
	<form name="addForm" method="POST">
		<input type="hidden" name="action" value="add">
		<p class="name">
			<input type="text" name="name" id="name" size="25" value="<%= Validate.nonNull(name) %>"><label
				for="name">Conference Name</label>
		</p>
		<p class="startsOn">
			<input type="text"name="startsOn" id="startsOn" size="10" value="<%= Validate.nonNull(startsOn) %>"><label
				for="startsOn">Starts On (yyyy/mm/dd)</label>
		</p>
		<p class="stopsOn">
			<input type="text" name="stopsOn" id="stopsOn" size="10" value="<%= Validate.nonNull(stopsOn) %>"><label
				for="stopsOn">Ends On (yyyy/mm/dd)</label>
		</p>
		<% if (error != null) { %>
		<h4><%= error %></h4>
		<% } %>
		<p class="submit">
			<input type="submit" value="Add Conference" />
			<a class="buttonred" href="admin/">Cancel</a>
		</p>
	</form>
</body>
</html>
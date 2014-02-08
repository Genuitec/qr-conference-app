<%@ page 
	language="java" pageEncoding="ISO-8859-1"
	import="java.util.*,com.genuitec.qfconf.backend.model.*,com.genuitec.qfconf.backend.ws.*"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>

<head>
<base href="<%=basePath%>">
<title>QR Conference Management</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<link rel="stylesheet" type="text/css" href="css/styles.css">
</head>

<body>
	<h1>Manage the QR Conference Center</h1>
	<h2>What do you want to get started with?</h2>
	<p>Manage your conferences, explore attendees, export contacts, all for <br/>
	your conference attendees captured using the QR Conference Buddy <br/>
	mobile application.</p>
	<h3>Conferences</h3>
	<%
		List<Conference> conferences = new ConferencesResource().getConferences();
		if (conferences.isEmpty()) {
			out.println("<h4>No conferences found.</h4>");
		}
		for (Conference next : conferences) {
	%>
		<p><a class="buttongreen" href="admin/view/?id=<%= next.getId() %>"><%= next.getName() %></a></p>
	<%
		}
	%>
	<h3>Other Actions</h3>
	<p><a class="button" href="admin/add/">Add Conference</a></p>
</body>
</html>
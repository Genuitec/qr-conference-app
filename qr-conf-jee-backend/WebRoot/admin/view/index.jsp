<%@ page language="java" pageEncoding="ISO-8859-1"
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
<link rel="stylesheet" type="text/css" href="css/tables.css">
</head>

<body>
	<h1>Manage the QR Conference Center</h1>
	<h2>Conference: <%= conf.getName() %></h2>

	<%
		List<Attendee> attendees = new AttendeesResource().getAttendees(conf.getId());
		if (attendees.isEmpty()) {
			out.println("<h4>No attendees found.</h4>");
		} else {
	%>
	<table id="hor-minimalist-a" summary="Conference Attendees">
		<thead>
			<tr>
				<th scope="col">First Name</th>
				<th scope="col">Last Name</th>
				<th scope="col">Rating</th>
				<th scope="col">Tags</th>
				<th scope="col">Scanned By</th>
			</tr>
		</thead>
		<tbody>
	<%
			for (Attendee next : attendees) {
	%>
			<tr>
				<td><%= next.getFirstName() %></td>
				<td><%= next.getLastName() %></td>
				<td><%= next.getRating() %></td>
				<td><%= next.getTags() %></td>
				<td><%= next.getEmployee() %></td>
			</tr>
	<%
			}
	%>
		</tbody>
	</table>
	<%
		}
	%>
	<br/><a class="button" href="admin">Back to Conference List</a>
</body>
</html>
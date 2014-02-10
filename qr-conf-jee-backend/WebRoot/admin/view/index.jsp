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
<link href="css/jquery-ui-1.10.4.custom.css" rel="stylesheet">
<link href="css/jquery-datatables-themeroller-1.9.4.css" rel="stylesheet">
<link href="css/genuitec-styles.css" rel="stylesheet">
<script src="js/jquery-1.10.2.js"></script>
<script src="js/jquery-ui-1.10.4.custom.js"></script>
<script src="js/jquery-datatables-1.9.4.js"></script>
</head>

<body>
	<h1>Manage the QR Conference Center</h1>
	<h2>Attendees for <strong><%= conf.getName() %></strong></h2>
	<table id="attendees" width="100%">
	    <thead>
	        <tr>
	            <th width="50%" scope="col" align="left"><font color="#eeeeee">Loading...</font></th>
	            <th width="8%" scope="col">&nbsp;</th>
	            <th width="8%" scope="col">&nbsp;</th>
	            <th width="8%" scope="col">&nbsp;</th>
	            <th width="8%" scope="col">&nbsp;</th>
	            <th width="8%" nowrap scope="col">&nbsp;</th>
	            <th width="8%" scope="col">&nbsp;</th>
	            <th width="18%" scope="col">&nbsp;</th>
	            <th width="8%" scope="col">&nbsp;</th>
	            <th width="8%" scope="col">&nbsp;</th>
	            <th width="8%" scope="col">&nbsp;</th>
	        </tr>
	    </thead>
	    <tbody>
	        <tr>
	            <td>&nbsp;</td>
	            <td>&nbsp;</td>
	            <td>&nbsp;</td>
	            <td>&nbsp;</td>
	            <td>&nbsp;</td>
	            <td>&nbsp;</td>
	            <td>&nbsp;</td>
	            <td>&nbsp;</td>
	            <td>&nbsp;</td>
	            <td>&nbsp;</td>
	            <td>&nbsp;</td>
	        </tr>
	    </tbody>
	</table>
	<script>
	$(document).ready(function() {
	    oTable = $('#attendees').dataTable( {
	        "bProcessing": true,
	        "bJQueryUI": true,
	        "bLengthChange": false,
	        "sAjaxSource": 'ws/attendees/<%= conf.getId() %>/datatable',
	        "iDisplayLength": 20,
	        "bAutoWidth": false,
	        "oLanguage": {
		        "sEmptyTable": "<br/>No attendees have been tracked for <strong><%= conf.getName() %></strong> yet.<br/>&nbsp;",
	        	},
	        "aoColumns": [
	        	{ "bVisible": false },
	        	{ "sTitle": "Organization" },
	        	{ "sTitle": "First" },
	        	{ "sTitle": "Last" },
	        	{ "sTitle": "Title" },
	        	{ "sTitle": "Follow-Up" },
	        	{ "sTitle": "Rating" },
	        	{ "sTitle": "Tags" },
	        	{ "sTitle": "When", "sType": "date" },
	        	{ "sTitle": "Who" },
	        	{ "sTitle": "Notes" }
	        ]
	    } );
		$('#attendees').on('click', 'tr', function(event) {
			var row = oTable.fnGetData(this);
			if (null != row) {
				var id = row[0];
				// do something with attendee ID (pop-up dialog?)
			}
		});
	} );
	</script><br/>
	<h3>Other Actions</h3>
	<a class="buttongreen" href="admin/add/attendee/?id=<%= conf.getId() %>">Manually Add Attendee</a>&nbsp;&nbsp;<a class="button" href="admin">Back to Conference List</a>
</body>
</html>
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
<link href="css/jquery-ui-1.10.4.custom.css" rel="stylesheet">
<link href="css/jquery-datatables-themeroller-1.9.4.css" rel="stylesheet">
<link href="css/genuitec-styles.css" rel="stylesheet">
<script src="js/jquery-1.10.2.js"></script>
<script src="js/jquery-ui-1.10.4.custom.js"></script>
<script src="js/jquery-datatables-1.9.4.js"></script>
</head>

<body>
	<h1>Manage the QR Conference Center</h1>
	<h2>Which conference do you want to manage?</h2>
	<table id="conferences" width="100%">
	    <thead>
	        <tr>
	            <th width="50%" scope="col" align="left"><font color="#eeeeee">Loading...</font></th>
	            <th width="35%" scope="col">&nbsp;</th>
	            <th width="20%" scope="col">&nbsp;</th>
	            <th width="20%" scope="col">&nbsp;</th>
	            <th width="25%" scope="col">&nbsp;</th>
	        </tr>
	    </thead>
	    <tbody>
	        <tr>
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
	    oTable = $('#conferences').dataTable( {
	        "bProcessing": true,
	        "bJQueryUI": true,
	        "bLengthChange": false,
	        "sAjaxSource": 'ws/conferences/datatable',
	        "iDisplayLength": 20,
	        "bAutoWidth": false,
	        "oLanguage": {
		        "sEmptyTable": "<br/>No conferences have been added for tracked yet.<br/>&nbsp;",
	        	},
	        "aoColumns": [
	        	{ "bVisible": false },
	        	{ "sTitle": "Conference Name" },
	        	{ "sTitle": "Starts On", "sType": "date" },
	        	{ "sTitle": "Ends On", "sType": "date" },
	        	{ "sTitle": "Scanned Attendees", "sType": "numberic" }
	        ]
	    } );
		$('#conferences').on('click', 'tr', function(event) {
			var row = oTable.fnGetData(this);
			if (null != row) {
				var id = row[0];
				window.location.href = "admin/view/?id=" + id;
			}
		});
	} );
	</script><br/>
	<h3>Other Actions</h3>
	<p><a class="buttongreen" href="admin/add/conference/">Add Conference</a></p>
</body>
</html>
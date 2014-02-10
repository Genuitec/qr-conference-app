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
<%@ page language="java" import="java.util.*" pageEncoding="ISO-8859-1"%>
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
<title>QR Conference Login</title>
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
	<h1>Welcome to the QR Conference Center</h1>
	<h2>Provide your login credentials to proceed</h2>
	<form name="loginForm" method="POST" action="j_security_check">
		<input type="hidden" value="Login" />
		<p class="j_username">
			<input type="text" name="j_username" id="j_username" size="25"><label class="right"
				for="j_username">User Name</label>
		</p>
		<p class="j_password">
			<input type="password" size="15" name="j_password" id="j_password"><label class="right"
				for="j_password">Password</label>
		</p>
		<p class="submit">
			<input type="submit" value="Login" />
		</p>
	</form>
</body>
</html>
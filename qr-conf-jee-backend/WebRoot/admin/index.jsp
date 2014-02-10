
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
	import="java.util.*,java.text.*,com.genuitec.qfconf.backend.model.*,com.genuitec.qfconf.backend.ws.*"%>
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
<link href="css/jquery-datatables-themeroller-1.9.4.css"
	rel="stylesheet">
<link href="css/genuitec-styles.css" rel="stylesheet">
<link href="css/genuitec-forms.css" rel="stylesheet">
<script src="js/jquery-1.10.2.js"></script>
<script src="js/jquery-ui-1.10.4.custom.js"></script>
<script src="js/jquery-datatables-1.9.4.js"></script>
<script>
$.fn.dataTableExt.oApi.fnReloadAjax = function ( oSettings, sNewSource, fnCallback, bStandingRedraw )
{
    // DataTables 1.10 compatibility - if 1.10 then versionCheck exists.
    // 1.10s API has ajax reloading built in, so we use those abilities
    // directly.
    if ( $.fn.dataTable.versionCheck ) {
        var api = new $.fn.dataTable.Api( oSettings );
 
        if ( sNewSource ) {
            api.ajax.url( sNewSource ).load( fnCallback, !bStandingRedraw );
        }
        else {
            api.ajax.reload( fnCallback, !bStandingRedraw );
        }
        return;
    }
 
    if ( sNewSource !== undefined && sNewSource !== null ) {
        oSettings.sAjaxSource = sNewSource;
    }
 
    // Server-side processing should just call fnDraw
    if ( oSettings.oFeatures.bServerSide ) {
        this.fnDraw();
        return;
    }
 
    this.oApi._fnProcessingDisplay( oSettings, true );
    var that = this;
    var iStart = oSettings._iDisplayStart;
    var aData = [];
 
    this.oApi._fnServerParams( oSettings, aData );
 
    oSettings.fnServerData.call( oSettings.oInstance, oSettings.sAjaxSource, aData, function(json) {
        /* Clear the old information from the table */
        that.oApi._fnClearTable( oSettings );
 
        /* Got the data - add it to the table */
        var aData =  (oSettings.sAjaxDataProp !== "") ?
            that.oApi._fnGetObjectDataFn( oSettings.sAjaxDataProp )( json ) : json;
 
        for ( var i=0 ; i<aData.length ; i++ )
        {
            that.oApi._fnAddData( oSettings, aData[i] );
        }
         
        oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
 
        that.fnDraw();
 
        if ( bStandingRedraw === true )
        {
            oSettings._iDisplayStart = iStart;
            that.oApi._fnCalculateEnd( oSettings );
            that.fnDraw( false );
        }
 
        that.oApi._fnProcessingDisplay( oSettings, false );
 
        /* Callback user function - for event handlers etc */
        if ( typeof fnCallback == 'function' && fnCallback !== null )
        {
            fnCallback( oSettings );
        }
    }, oSettings );
};
</script>
</head>

<body>

	<div id="dialog" title="Add a Conference">
		<p class="validateTips">All fields are required.</p>
		<form id="conferenceForm">
			<fieldset>
				<p class="name">
					<input type="text" name="name" id="name" size="25"><label class="right" for="name">Conference Name</label>
				</p>
				<p class="startsOn">
					<input type="text"name="startsOn" id="startsOn" size="10"><label class="right" for="startsOn">Starts On (yyyy/mm/dd)</label>
				</p>
				<p class="endsOn">
					<input type="text" name="endsOn" id="endsOn" size="10"><label class="right" for="endsOn">Ends On (mm/dd/yyyy)</label>
				</p>
			</fieldset>
		</form>
	</div>
	
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
		
		var oTable;
		
		$(function() {
			var name = $("#name");
			var startsOn = $("#startsOn");
			var endsOn = $("#endsOn");
			var allFields = $([]).add(name).add(startsOn).add(startsOn);
			var tips = $(".validateTips");
	
			function updateTips(t) {
				tips.text(t).addClass("ui-state-highlight");
				setTimeout(function() {
					tips.removeClass("ui-state-highlight", 1500);
				}, 500);
			}
	
			function checkLength(o, n, min, max) {
				if (o.val().length > max || o.val().length < min) {
					o.addClass("ui-state-error");
					updateTips("Length of " + n + " must be between " + min
							+ " and " + max + ".");
					return false;
				} else {
					return true;
				}
			}
	
			function checkRegexp(o, regexp, n) {
				if (!(regexp.test(o.val()))) {
					o.addClass("ui-state-error");
					updateTips(n);
					return false;
				} else {
					return true;
				}
			}
	
			$("#dialog").dialog({
				autoOpen : false,
				height : 325,
				width : 425,
				modal : true,
				buttons : {
					"Add Conference" : function() {
						var bValid = true;
						allFields.removeClass("ui-state-error");
	
						bValid = bValid && checkLength(name, "name", 3, 40);
						bValid = bValid && checkRegexp(startsOn, /^(19|20)\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])$/i, "Starts On must be in YYYY/MM/DD format.");
						bValid = bValid && checkRegexp(endsOn, /^(19|20)\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])$/i, "Stops On must be in YYYY/MM/DD format.");
	
						if (bValid) {
							
							var serialized = $("#conferenceForm").serializeArray();
					        var s = '';
					        var data = {};
					        for(s in serialized){
					            data[serialized[s]['name']] = serialized[s]['value'];
					        }
					        var jsonData = JSON.stringify(data);
					        
					        var dialogScope = $(this);
							$.ajax({
								type : "POST",
								url : "ws/conferences/add",
								data : jsonData,
								contentType : "application/json",
								success : function(json) {
									oTable.fnReloadAjax();
									$(dialogScope).dialog("close");
								},
								error : function(json) {
									updateTips("Unable to create conference.");
								},
								dataType : "json"
							});
						}
					},
					Cancel : function() {
						$(this).dialog("close");
					}
				},
				close : function() {
					allFields.val("").removeClass("ui-state-error");
				}
			});
	
			$("#add-conference").button().click(function() {
				$("#dialog").dialog("open");
			});
		});
		
		$(document).ready(
			function() {
				oTable = $('#conferences')
						.dataTable(
								{
									"bProcessing" : true,
									"bJQueryUI" : true,
									"bLengthChange" : false,
									"sAjaxSource" : 'ws/conferences/datatable',
									"iDisplayLength" : 20,
									"bAutoWidth" : false,
									"oLanguage" : {
										"sEmptyTable" : "<br/>No conferences have been added for tracked yet.<br/>&nbsp;",
									},
									"aoColumns" : [
											{
												"bVisible" : false
											},
											{
												"sTitle" : "Conference Name"
											},
											{
												"sTitle" : "Starts On",
												"sType" : "date"
											},
											{
												"sTitle" : "Ends On",
												"sType" : "date"
											},
											{
												"sTitle" : "Scanned Attendees",
												"sType" : "numberic"
											} ]
								});
				$('#conferences')
						.on(
								'click',
								'tr',
								function(event) {
									var row = oTable
											.fnGetData(this);
									if (null != row) {
										var id = row[0];
										window.location.href = "admin/view/?id="
												+ id;
									}
								});
			});
	</script>

	<br />
	<h3>Other Actions</h3>
	<p>
		<button id="add-conference">Add Conference</button>
	</p>
</body>
</html>
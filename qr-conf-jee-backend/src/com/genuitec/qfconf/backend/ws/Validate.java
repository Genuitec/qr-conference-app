package com.genuitec.qfconf.backend.ws;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Validate {

	public static boolean isNonEmpty(String text) {
		if (text == null || text.trim().length() == 0)
			return false;
		return true;
	}

	public static boolean isDate(String date) {
		if (date == null)
			return false;
		try {
			DateFormat format = new SimpleDateFormat("yyyy/MM/dd");
			format.parse(date);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	public static Date getDate(String date) {
		if (date == null)
			return null;
		try {
			DateFormat format = new SimpleDateFormat("yyyy/MM/dd");
			return format.parse(date);
		} catch (Exception e) {
			return null;
		}
	}

	public static boolean isInt(String value) {
		if (value == null)
			return false;
		try {
			Integer.parseInt(value);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	public static int getInt(String value) {
		if (value == null)
			return -1;
		try {
			return Integer.parseInt(value);
		} catch (Exception e) {
			return -1;
		}
	}
	
	public static String nonNull(String value) {
		if (value == null)
			return "";
		return value;
	}
}

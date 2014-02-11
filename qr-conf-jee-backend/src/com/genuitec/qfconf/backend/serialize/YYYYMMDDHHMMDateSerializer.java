package com.genuitec.qfconf.backend.serialize;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

public class YYYYMMDDHHMMDateSerializer extends JsonSerializer<Date> {

	@Override
	public void serialize(Date date, JsonGenerator generator,
			SerializerProvider serializer) throws IOException,
			JsonProcessingException {
		SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd HH:mm");
		String formattedDate = format.format(date);
		generator.writeString(formattedDate);
	}
}
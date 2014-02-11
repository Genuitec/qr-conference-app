
    create table "CONFERENCE"(
       "ID" INTEGER not null,
       "ENDSON" DATE,
       "NAME" VARCHAR(255),
       "STARTSON" DATE,
       constraint "CONFPRIM" primary key ("ID")
    );

    create unique index "CONFIDX" on "CONFERENCE"("ID");
    
    create table "ATTENDEE"(
       "ID" INTEGER not null,
       "CELL" VARCHAR(255),
       "CITY" VARCHAR(255),
       "CONFERENCEID" INTEGER not null,
       "COUNTRY" VARCHAR(255),
       "EMAIL" VARCHAR(255),
       "EMPLOYEE" VARCHAR(255),
       "FAX" VARCHAR(255),
       "FIRSTNAME" VARCHAR(255),
       "FOLLOWUP" SMALLINT default '0',
       "LASTNAME" VARCHAR(255),
       "MODIFIEDAT" DATE,
       "NOTES" VARCHAR(255),
       "ORGANIZATION" VARCHAR(255),
       "POSTCODE" VARCHAR(255),
       "QRCODESIGNATURE" VARCHAR(255),
       "RATING" INTEGER,
       "SCANNEDAT" DATE,
       "STATE" VARCHAR(255),
       "STREET" VARCHAR(255),
       "SYNCID" BIGINT,
       "TAGS" BLOB,
       "TELEPHONE" VARCHAR(255),
       "TITLE" VARCHAR(255),
       "WEBSITE" VARCHAR(255),
       constraint "ATTNDPRIM" primary key ("ID")
    );

    create unique index "ATTNDIDX" on "ATTENDEE"("ID");
    
    
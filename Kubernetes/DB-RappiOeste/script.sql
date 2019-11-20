create table airport
(
    id           int auto_increment
        primary key,
    code         varchar(10)  null,
    description  varchar(50)  null,
    state        varchar(50)  null,
    state_code   varchar(400) null,
    address      varchar(50)  null,
    show_airport tinyint(1)   null,
    constraint airport_code_uindex
        unique (code)
);

create table flight
(
    id                         char(36)    not null
        primary key,
    airport_code_from          varchar(10) null,
    airport_code_to            varchar(10) null,
    available_economy          int         null,
    available_economy_premium  int         null,
    available_business         int         null,
    available_business_premium int         null,
    flight_date                datetime    null,
    time                       float       null,
    price                      float       null,
    constraint flight_airport_from_code_fk
        foreign key (airport_code_from) references airport (code),
    constraint flight_airport_to_code_fk
        foreign key (airport_code_to) references airport (code)
);

create table miles_relationship
(
    id           char(36)    not null
        primary key,
    miles_price  float       null,
    miles_ticket float       null,
    version      int         null,
    season       varchar(50) null
);

create table payment
(
    id          int auto_increment
        primary key,
    description varchar(50) null
);

create table user
(
    id           char(36)     not null,
    dni_passport varchar(50)  null,
    user_name    varchar(50)  null,
    password     text         null,
    name         varchar(50)  null,
    surname      varchar(50)  null,
    email        varchar(50)  null,
    phone        varchar(50)  null,
    address      varchar(50)  null,
    city         varchar(50)  null,
    country      varchar(50)  null,
    nationality  varchar(50)  null,
    about        varchar(300) null,
    registered   tinyint(1)   null,
    constraint user_id_uindex
        unique (id)
);

create table role
(
    id               int         not null
        primary key,
    user_id          char(36)    null,
    permission       tinyint(1)  null,
    role_description varchar(50) null,
    constraint role_user_id_fk
        foreign key (user_id) references user (id)
);

create table ticket
(
    id                  int auto_increment,
    flight_id           char(36)    not null,
    user_id             char(36)    not null,
    code                char(36)    null,
    cancellation_date   datetime    null,
    status              varchar(50) null,
    creation_date       datetime    null,
    payment_way         int         null,
    payment_way_company varchar(50) null,
    refund              float       null,
    correlation_id      char(36)    null,
    constraint passage_passage_code_uindex
        unique (code),
    constraint ticket_id_uindex
        unique (id),
    constraint payment___fk
        foreign key (payment_way) references payment (id),
    constraint ticket_flight_id_fk
        foreign key (flight_id) references flight (id),
    constraint ticket_user_id_fk
        foreign key (user_id) references user (id)
);

create table miles
(
    id              int auto_increment
        primary key,
    user_id         char(36)    null,
    ticket_id       int         not null,
    relationship_id char(36)    null,
    status          varchar(50) null,
    constraint miles_miles_relationship_id_fk
        foreign key (relationship_id) references miles_relationship (id),
    constraint miles_ticket_id_fk
        foreign key (ticket_id) references ticket (id),
    constraint miles_user_id_fk
        foreign key (user_id) references user (id)
);

create
    definer = rapiuser@`%` procedure altaCiudad(IN xcode varchar(10), IN xdescription varchar(50),
                                                IN xstate varchar(50), IN xstate_code varchar(100),
                                                IN xaddress varchar(50))
BEGIN
    DECLARE xcount int default 0;

    select count(*) into xcount from airport where airport.code = xcode;

    IF (xcount > 0) THEN
        UPDATE airport SET show_airport = 1 WHERE airport.code = xcode;
    ELSE
        insert into airport(airport.code, description, state, state_code, address, show_airport)
        values (xcode, xdescription, xstate, xstate_code, xaddress, 1);
    END IF;
END;

create
    definer = rapiuser@`%` procedure bajaCiudad(IN xcode varchar(10))
BEGIN
    UPDATE airport SET show_airport = 0 WHERE airport.code = xcode;
END;

create
    definer = rapiuser@`%` procedure cancel_ticket(IN p_code varchar(36), IN p_both tinyint(1),
                                                   IN p_registered tinyint(1))
BEGIN
    DECLARE _updateTicketStmt VARCHAR(3000);
    DECLARE _refund_code VARCHAR(36);
    DECLARE _flight_id VARCHAR(36);
    DECLARE _refund INT(11);
    DECLARE _dateDiff INT(11);
    DECLARE _flight_date datetime;

    IF (p_registered IS TRUE) THEN
        SET _updateTicketStmt = CONCAT('UPDATE ticket t, miles m SET t.cancellation_date = now(), t.status = "CANCELLED", m.status = "CANCELLED"
                                         WHERE t.id = m.ticket_id AND t.user_id = m.user_id ');
    ELSE
        SET _updateTicketStmt =
                CONCAT('UPDATE ticket t SET t.cancellation_date = now(), t.status = "CANCELLED" WHERE 1 = 1 ');
    END IF;

    IF (p_both IS TRUE) THEN
        SET _refund_code = (SELECT code FROM ticket WHERE correlation_id = p_code ORDER BY creation_date ASC LIMIT 1);
        SET _updateTicketStmt = CONCAT(_updateTicketStmt, ' AND correlation_id =  "', p_code, '" ;');
    ELSE
        SET _refund_code = p_code;
        SET _updateTicketStmt = CONCAT(_updateTicketStmt, ' AND code = "', p_code, '" ;');
    END IF;

    SET _flight_id = (SELECT flight_id FROM ticket WHERE code = _refund_code);
    SET _flight_date = (SELECT flight_date FROM flight WHERE id = _flight_id);
    SET _dateDiff = (SELECT DATEDIFF(`flight_date`, now()) FROM flight WHERE id = _flight_id);

    SET _refund = 0;
    IF (_dateDiff > 60) THEN
        SET _refund = 90;
    ELSEIF ((60 > _dateDiff) AND (_dateDiff > 30)) THEN
        SET _refund = 70;
    ELSEIF ((30 > _dateDiff) AND (_dateDiff > 15)) THEN
        SET _refund = 50;
    ELSEIF ((15 > _dateDiff) AND (_dateDiff > 1)) THEN
        SET _refund = _dateDiff * 3;
    END IF;

    IF (p_both IS TRUE) THEN
        UPDATE ticket t SET t.refund = _refund WHERE correlation_id = p_code;
    ELSE
        UPDATE ticket t SET t.refund = _refund WHERE code = p_code;
    END IF;

    SET @statement = _updateTicketStmt;
    PREPARE dynQuery FROM @statement;
    EXECUTE dynQuery;
    DEALLOCATE PREPARE dynQuery;
END;

create
    definer = rapiuser@`%` procedure create_ticket(IN p_flight_id varchar(36), IN p_user_id varchar(36),
                                                   IN p_code varchar(36), IN p_payment_way int,
                                                   IN p_payment_way_company varchar(50), IN p_version int,
                                                   IN p_correlation_id varchar(36), IN p_registered tinyint(1))
BEGIN

    ## Ticket -> INSERT
    INSERT INTO ticket (flight_id, user_id, code, status, creation_date, payment_way, payment_way_company,
                        correlation_id)
    VALUES (p_flight_id, p_user_id, p_code, 'REGISTERED', now(), p_payment_way, p_payment_way_company,
            p_correlation_id);

    ## Miles Amount -> INSERT
    IF (p_registered IS TRUE AND p_payment_way != 4) THEN
        INSERT INTO miles (user_id, ticket_id, relationship_id, status)
        VALUES (p_user_id, (SELECT LAST_INSERT_ID()), (SELECT id FROM miles_relationship WHERE version = p_version),
                'REGISTERED');
    END IF;

    ## Miles Amount Buying by Miles -> INSERT
    IF (p_payment_way = 4) THEN
        INSERT INTO miles (user_id, ticket_id, relationship_id, status)
        VALUES (p_user_id, (SELECT LAST_INSERT_ID()), (SELECT id FROM miles_relationship WHERE version = p_version),
                'CONSUMED');
    END IF;

END;

create
    definer = rapiuser@`%` procedure create_user(IN p_id char(36), IN p_dni_passport varchar(50),
                                                 IN p_user_name varchar(50), IN p_password text, IN p_name varchar(50),
                                                 IN p_surname varchar(50), IN p_email varchar(50),
                                                 IN p_phone varchar(50), IN p_address varchar(50),
                                                 IN p_city varchar(50), IN p_country varchar(50),
                                                 IN p_nationality varchar(50), IN p_about varchar(300),
                                                 IN p_registered tinyint(1))
BEGIN

    ## User -> INSERT
    INSERT INTO user (id, dni_passport, user_name, password, name, surname, email, phone, address, city, country,
                      nationality, about, registered)
    VALUES (p_id, p_dni_passport, p_user_name, p_password, p_name, p_surname, p_email, p_phone, p_address, p_city,
            p_country, p_nationality, p_about, p_registered);

END;

create
    definer = rapiuser@`%` procedure emitirReporte(IN xinicio date, IN xfin date, IN xorigen varchar(50),
                                                   IN xdestino varchar(50))
BEGIN
    DECLARE _selectStmt VARCHAR(5000);

    SET _selectStmt = CONCAT(
            'SELECT f.airport_code_from AS "airport_from", f.airport_code_to AS "airport_to", count(*) AS "flyQuantity",
                    sum((t.refund/100)*f.price) AS "refund"
               FROM ticket AS t, flight AS f
              WHERE t.flight_id = f.id
                AND DATE(t.cancellation_date)
                AND f.flight_date > "', xinicio, '" AND f.flight_date < "', xfin, '" ');

    IF (xorigen IS NOT NULL) THEN
        SET _selectStmt = CONCAT(_selectStmt, ' AND f.airport_code_from = "', xorigen, '" ');
    END IF;

    IF (xdestino IS NOT NULL) THEN
        SET _selectStmt = CONCAT(_selectStmt, ' AND f.airport_code_to = "', xdestino, '" ');
    END IF;

    SET _selectStmt = CONCAT(_selectStmt, ' GROUP BY f.airport_code_from, f.airport_code_to ; ');

    SET @statement = _selectStmt;
    PREPARE dynQuery FROM @statement;
    EXECUTE dynQuery;
    DEALLOCATE PREPARE dynQuery;

END;

create
    definer = rapiuser@`%` procedure get_airports()
BEGIN

    SELECT *
    FROM airport
    WHERE show_airport = 1
    ORDER BY state ASC;

END;

create
    definer = rapiuser@`%` procedure get_all_airports()
BEGIN

    SELECT * FROM airport ORDER BY state ASC;

END;

create
    definer = rapiuser@`%` procedure get_flight_by_filters(IN p_codeFrom varchar(50), IN p_codeTo varchar(50),
                                                           IN p_dateStart varchar(100), IN p_dateEnd varchar(100))
BEGIN

    SELECT *
    FROM flight
    WHERE airport_code_from = p_codeFrom
      AND airport_code_to = p_codeTo
      AND flight_date > p_dateStart
      AND flight_date < p_dateEnd;

END;

create
    definer = rapiuser@`%` procedure get_miles_by_id(IN p_user_id char(36))
BEGIN
    DECLARE totalMiles INT(30);
    DECLARE totalRegistered INT(30);
    DECLARE totalConsumed INT(30);

    SELECT SUM(f.price * mr.miles_price)
    INTO totalRegistered
    FROM miles AS mi,
         miles_relationship AS mr,
         user AS u,
         ticket AS t,
         flight AS f
    WHERE u.id = p_user_id
      AND mi.user_id = u.id
      AND mi.ticket_id = t.id
      AND mi.relationship_id = mr.id
      AND t.flight_id = f.id
      AND mi.status = 'REGISTERED';

    SELECT SUM(f.price * mr.miles_price)
    INTO totalConsumed
    FROM miles AS mi,
         miles_relationship AS mr,
         user AS u,
         ticket AS t,
         flight AS f
    WHERE u.id = p_user_id
      AND mi.user_id = u.id
      AND mi.ticket_id = t.id
      AND mi.relationship_id = mr.id
      AND t.flight_id = f.id
      AND mi.status = 'CONSUMED';

    SET totalMiles = IFNULL(totalRegistered, 0) - IFNULL(totalConsumed, 0);

    SELECT totalMiles;

END;

create
    definer = rapiuser@`%` procedure get_needed_miles(IN p_flight_id varchar(36), IN p_version int)
BEGIN

    -- AmountNeeds
    SELECT SUM(f.price * mr.miles_price) AS neededMiles
    FROM flight AS f,
         miles_relationship AS mr
    WHERE f.id = p_flight_id
      AND mr.version = p_version
    GROUP BY f.price, mr.miles_price;

END;

create
    definer = rapiuser@`%` procedure get_ticket_by_code(IN p_correlation_id varchar(36))
BEGIN

    SELECT t.flight_id,
           f.airport_code_from,
           f.airport_code_to,
           f.flight_date,
           f.time,
           f.price,
           t.code,
           t.correlation_id,
           t.payment_way_company
    FROM flight f,
         ticket t
    WHERE f.id = t.flight_id
      AND t.correlation_id = p_correlation_id
      AND t.status = 'REGISTERED'
    ORDER BY f.flight_date;

END;

create
    definer = rapiuser@`%` procedure get_ticket_flight_by_id(IN p_user_id varchar(36), IN p_from varchar(50),
                                                             IN p_to varchar(50), IN p_from_date varchar(100),
                                                             IN p_to_date varchar(100))
BEGIN
    DECLARE _selectStmt VARCHAR(3000);
    DECLARE _status VARCHAR(50);
    SET _status = 'REGISTERED';

    SET _selectStmt = CONCAT('SELECT t.flight_id, f.airport_code_from, f.airport_code_to, f.flight_date, f.time, f.price, t.code, t.correlation_id, t.payment_way_company
                               FROM flight f, ticket t
                              WHERE f.id = t.flight_id AND t.user_id = ', p_user_id);

    IF (p_from IS NOT NULL AND p_to IS NOT NULL) THEN
        SET _selectStmt =
                CONCAT(_selectStmt, ' AND f.airport_code_from = "', p_from, '" AND f.airport_code_to = "', p_to, '" ');
    END IF;

    IF (p_from_date IS NOT NULL AND p_to_date IS NOT NULL) THEN
        SET _selectStmt =
                CONCAT(_selectStmt, ' AND f.flight_date > "', p_from_date, '" AND f.flight_date < "', p_to_date, '" ');
    END IF;

    SET _selectStmt = CONCAT(_selectStmt, ' AND t.status = "', _status, '" ORDER BY f.flight_date ;');

    SET @statement = _selectStmt;
    PREPARE dynQuery FROM @statement;
    EXECUTE dynQuery;
    DEALLOCATE PREPARE dynQuery;

END;

create
    definer = rapiuser@`%` procedure login(IN p_userName varchar(50))
BEGIN

    SELECT u.id AS "id",
           u.dni_passport,
           u.user_name,
           u.password,
           u.name,
           u.surname,
           u.email,
           u.phone,
           u.address,
           u.city,
           u.about,
           u.registered,
           r.permission,
           r.role_description
    FROM user u,
         role r
    WHERE u.id = r.user_id
      AND user_name = p_userName;

END;

create
    definer = rapiuser@`%` procedure modificarMillas(IN xmiles float, IN xprice float, IN xmes varchar(50),
                                                     IN xanio varchar(50))
BEGIN
    DECLARE xversion INT DEFAULT 0;
    DECLARE xseason varchar(50);

    SELECT CONCAT(xmes, "/", xanio) into xseason;

    select max(miles_relationship.version) into xversion from miles_relationship;


    insert into miles_relationship (id, miles_price, miles_ticket, version, season)
    values (UUID(), xprice, xmiles, xversion + 1, xseason);

END;

create
    definer = rapiuser@`%` procedure traerEntidad1(IN xcode varchar(50))
BEGIN

    select * from airport WHERE airport.code = xcode;

END;

create
    definer = rapiuser@`%` procedure update_user(IN p_dni_passport varchar(50), IN p_user_name varchar(50),
                                                 IN p_password text, IN p_name varchar(50), IN p_surname varchar(50),
                                                 IN p_email varchar(50), IN p_phone varchar(50),
                                                 IN p_address varchar(50), IN p_city varchar(50),
                                                 IN p_country varchar(50), IN p_nationality varchar(50),
                                                 IN p_about varchar(300), IN p_registered tinyint(1),
                                                 IN p_user_id char(36))
BEGIN

    UPDATE user
    SET dni_passport = p_dni_passport,
        user_name    = p_user_name,
        password     = p_password,
        name         = p_name,
        surname      = p_surname,
        email        = p_email,
        phone        = p_phone,
        address      = p_address,
        city         = p_city,
        country      = p_country,
        nationality  = p_nationality,
        about        = p_about,
        registered   = p_registered
    WHERE id = p_user_id;

END;

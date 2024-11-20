CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL
);


CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    birthDate VARCHAR(255) NOT NULL,
    birthPlace VARCHAR(255) NOT NULL,
    province VARCHAR(255) NOT NULL,
    regency VARCHAR(255) NOT NULL,
    district VARCHAR(255) NOT NULL,
    village VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    citizen_id VARCHAR(255) NOT NULL,
    passport_id VARCHAR(255) NOT NULL,
    passport_exp VARCHAR(255) NOT NULL,
    citizen_card VARCHAR(255) NOT NULL,
    passport VARCHAR(255) NOT NULL,
    family_card VARCHAR(255) NOT NULL,
    photo VARCHAR(255) NOT NULL,
    room_type VARCHAR(255) NOT NULL,
    travel_pkg VARCHAR(255) NOT NULL
);

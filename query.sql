-- name: GetUser :one
SELECT * FROM users 
WHERE email = $1;

-- name: AddCustomer :one
INSERT INTO customers (
    name, gender, birthDate, birthPlace, province, regency, district, village, address, citizen_id, passport_id, passport_exp, citizen_card, passport, family_card, photo, room_type, travel_pkg
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18
)
RETURNING *;

-- name: GetCustomer :one
SELECT * FROM customers
WHERE id = $1;

-- name: ListCustomers :many
SELECT id, name, province, travel_pkg, room_type 
FROM customers;

-- name: UpdateCustomer :exec
UPDATE customers 
SET 
    name = $2,
    gender = $3,
    birthDate = $4,
    birthPlace = $5,
    province = $6,
    regency = $7,
    district = $8,
    village = $9,
    address = $10,
    citizen_id = $11,
    passport_id = $12,
    passport_exp = $13,
    citizen_card = $14,
    passport = $15,
    family_card = $16,
    photo = $17,
    room_type = $18,
    travel_pkg = $19
WHERE id = $1;

-- name: DeleteCustomer :exec
DELETE FROM customers
WHERE id = $1;



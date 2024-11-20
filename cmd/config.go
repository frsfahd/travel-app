package main

import (
	"context"
	"log"
	"os"

	"github.com/dotenv-org/godotenvvault"
	"github.com/frsfahd/travel-app/models"
	"github.com/jackc/pgx/v5"
)

var (
	ENV    string
	HOST   string
	PORT   string
	DB_URI string

	SECRET string

	ctx     context.Context
	conn    *pgx.Conn
	queries *models.Queries
	DB_NAME string
)

func configEnv() {
	// load .env file for dev
	if err := godotenvvault.Load(); err != nil {
		log.Printf("error loading .env file: %s", err)
	}

	// setup server
	PORT = os.Getenv("PORT")
	HOST = os.Getenv("HOST")
	ENV = os.Getenv("ENV")
	DB_URI = os.Getenv("DB_CONN_STRING")

	SECRET = os.Getenv("SECRET")

	log.Printf("%s:%s", HOST, PORT)
	log.Printf("environment: %s", ENV)
}

func configDB(ctx context.Context) (*pgx.Conn, error) {

	conn, err := pgx.Connect(ctx, DB_URI)
	if err != nil {
		return nil, err
	}

	return conn, nil
}

// func configDB() {
// 	// setup database

// 	DB_URL := os.Getenv("DB_URL")
// 	connectionOpts := options.Client().ApplyURI(DB_URL)

// 	mongoClient, err := mongo.Connect(ctx, connectionOpts)
// 	if err != nil {
// 		log.Fatalf("an error ocurred when connect to mongoDB : %v", err)
// 	}

// 	// test database connection
// 	if err = mongoClient.Ping(ctx, readpref.Primary()); err != nil {
// 		log.Fatalf("an error ocurred when connect to mongoDB : %v", err)
// 	}

// 	log.Println("database connected")

// 	// get collection
// 	DB_NAME = os.Getenv("DB_NAME")
// 	DB_COLLECTION = os.Getenv("DB_COLLECTION")
// 	linkCollection = mongoClient.Database(DB_NAME).Collection(DB_COLLECTION)
// }

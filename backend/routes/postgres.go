package routes

import (
	"database/sql"
	"fmt"
	"github.com/labstack/echo/v4"
	"log"
)

func StartDbProcess(envFile map[string]string, e *echo.Echo) *sql.DB {
	// Connection string
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s ",
		envFile["HOST"], 5432, envFile["USER"], envFile["PASSWORD"], envFile["DBNAME"])

	// Open a connection
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		log.Fatal(err)
	}
	// Verify connection
	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Successfully connected to the database!")

	// SQL script to create the table and index
	createTableSQL := `
	CREATE TABLE IF NOT EXISTS youtube_responses (
	    id SERIAL PRIMARY KEY,
	    keyword TEXT NOT NULL,
	    video_id TEXT NOT NULL,
	    title TEXT NOT NULL,
	    description TEXT NOT NULL,
	    thumbnail_url TEXT,
	    video_url TEXT,
	    published_at TIMESTAMP,
	    UNIQUE (keyword, video_id)
	);
	CREATE INDEX IF NOT EXISTS idx_keyword ON youtube_responses(keyword);
	`

	// Execute the SQL script
	_, err = db.Exec(createTableSQL)
	if err != nil {
		log.Fatalf("Failed to create table or index: %v", err)
	}

	return db

}
func UniqueKeywords(db *sql.DB) map[string]int {
	// Query to get all unique keywords
	query := `SELECT DISTINCT keyword FROM youtube_responses`

	// Execute the query
	rows, err := db.Query(query)
	if err != nil {
		log.Fatal("Error executing query:", err)
	}
	defer func(rows *sql.Rows) {
		err := rows.Close()
		if err != nil {
			fmt.Println("unable to close rows:", err)
		}
	}(rows)

	// Slice to hold the keywords
	keywords := make(map[string]int)

	// Iterate through the rows
	for rows.Next() {
		var keyword string
		err := rows.Scan(&keyword)
		if err != nil {
			log.Fatal("Error scanning row:", err)
		}
		keywords[keyword] = 1
	}

	// Check for errors from iterating over rows
	if err = rows.Err(); err != nil {
		log.Fatal("Row iteration error:", err)
	}

	// Print the unique keywords
	fmt.Println("Unique Keywords:")
	for k, _ := range keywords {
		fmt.Println(k)
	}
	return keywords

}

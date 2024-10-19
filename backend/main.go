package main

import (
	"database/sql"
	"fmt"
	"github.com/IamMahfhooz/fampay-assignment/handlers"
	"github.com/IamMahfhooz/fampay-assignment/routes"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	_ "github.com/lib/pq"
	"os"
)

func main() {
	envFile, _ := godotenv.Read("../.env")
	fmt.Println("loaded env variables")

	e := echo.New()
	e.Use(middleware.CORS())

	db := routes.StartDbProcess(envFile, e)
	defer func(db *sql.DB) {
		err := db.Close()
		if err != nil {
			fmt.Println("error while closing db")
		}
	}(db)

	h := &handlers.DbHandler{
		Keywords: routes.UniqueKeywords(db),
		DB:       db,
		Env:      envFile,
	}

	routes.AssignHandlers(e, h)
	go func() {
		handlers.Cronjob(h)
	}()

	port := os.Getenv("PORT")
	if port == "" {
		port = ":5004"
	} else {
		port = ":" + port
	}

	err := e.Start(port)
	if err != nil {
		fmt.Println("error while starting server : ", err.Error())
		return
	}
}

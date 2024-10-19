package main

import (
	"database/sql"
	"fmt"
	"github.com/IamMahfhooz/fampay-assignment/handlers"
	"github.com/IamMahfhooz/fampay-assignment/routes"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	_ "github.com/lib/pq"
	"os"
)

func main() {
	//envFile, _ := godotenv.Read("../.env")
	//fmt.Println("loaded env variables")
	envFile := make(map[string]string)
	envFile["HOST"] = os.Getenv("HOST")
	envFile["DBPORT"] = os.Getenv("DBPORT")
	envFile["DBNAME"] = os.Getenv("DBNAME")
	envFile["USER"] = os.Getenv("USER")
	envFile["YOUTUBE_DEVELOPER_KEY"] = os.Getenv("YOUTUBE_DEVELOPER_KEY")
	envFile["GEMINI_API_KEY"] = os.Getenv("GEMINI_API_KEY")
	envFile["PASSWORD"] = os.Getenv("PASSWORD")

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

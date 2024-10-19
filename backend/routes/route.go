// this file handles routing of the user request to respective handlers
package routes

import (
	"database/sql"
	"github.com/IamMahfhooz/fampay-assignment/handlers"
	"fmt"
	"github.com/labstack/echo/v4"
	"log"
	"net/http"
)

func AssignHandlers(db *sql.DB, e *echo.Echo, env map[string]string) {
	// Verify connection
	err := db.Ping()
	if err != nil {
		fmt.Println("from routes")
		log.Fatal(err)
	}
	fmt.Println("Successfully connected to the database from handlers!")
	var keywords []string
	h := &handlers.DbHandler{
		Keywords: keywords,
		DB:       db,
		Env:      env,
	}
	e.POST("/youtube", h.FetchYoutube)
	e.POST("/database", h.FetchDatabase)
	e.GET("/ping", func(c echo.Context) error { return c.JSON(http.StatusOK, "i'm alive") })
}
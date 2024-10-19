// Package routes : this file handles routing of the user request to respective handlers
package routes

import (
	"github.com/IamMahfhooz/fampay-assignment/handlers"
	"github.com/labstack/echo/v4"
	"net/http"
)

func AssignHandlers(e *echo.Echo, h *handlers.DbHandler) {

	e.POST("/youtube", h.FetchYoutube)
	e.POST("/database", h.FetchDatabase)
	e.GET("/ping", func(c echo.Context) error { return c.JSON(http.StatusOK, "i'm alive") })
}

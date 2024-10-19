// Package handlers : this file handles request to search query from database
package handlers

import (
	"fmt"
	"github.com/IamMahfhooz/fampay-assignment/utils"
	"github.com/labstack/echo/v4"
	"strings"
)

type databaseRequest struct {
	Modify     bool   `json:"modify,omitempty"`
	Keyword    string `json:"keyword"`
	MaxResults int64  `json:"maxResults"`       // Allow flexibility for max results
	Offset     int64  `json:"offset,omitempty"` // For pagination offset
	StartFrom  string `json:"startDate,omitempty"`
}

func (h *DbHandler) FetchDatabase(c echo.Context) error {
	req := new(databaseRequest)
	err := c.Bind(req)
	if err != nil {
		return c.JSON(400, map[string]string{"error": "Invalid request body"})
	}

	// Optionally modify the keyword if Modify is set to true

	req.Keyword, err = utils.ReverseSearchDB((*utils.DbHandler)(h), req.Keyword, h.Env["GEMINI_API_KEY"])
	if err != nil || req.Keyword == "NO" {
		fmt.Println("No match found :", err.Error())
		return c.JSON(500, map[string]string{"error": "No videos with the given keyword in the database . Search again with YouTube option."})
	}
	req.Keyword = strings.TrimSpace(req.Keyword)
	fmt.Println("keyword was : -->", req.Keyword)

	//Fetch data from the database based on the keyword, limit (MaxResults), and offset
	videos, err := utils.GetYoutubeResponsesByKeyword((*utils.DbHandler)(h), req.Keyword, req.MaxResults, 0)
	if err != nil {
		fmt.Println("Unable to fetch response from database:", err.Error())
		return c.JSON(500, map[string]string{"error": "Failed to fetch records from database"})
	}
	fmt.Println(videos)

	return c.JSON(200, videos)
}

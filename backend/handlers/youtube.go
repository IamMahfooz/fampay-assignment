// Package handlers : this file handles request to search query from youtube
package handlers

import (
	"database/sql"
	"fmt"
	"github.com/IamMahfhooz/fampay-assignment/utils"
	"github.com/labstack/echo/v4"
	"google.golang.org/api/googleapi/transport"
	"google.golang.org/api/youtube/v3"
	"log"
	"net/http"
	"time"
)

type DbHandler struct {
	Keywords []string
	DB       *sql.DB
	Env      map[string]string
}

type YoutubeRequest struct {
	Modify        bool   `json:"modify"`
	Keyword       string `json:"keyword"`
	MaxResults    int64  `json:"maxResults"`
	NextPageToken string `json:"nextPageToken,omitempty"`
	StartFrom     int    `json:"startDate,omitempty"`
}

type clientResponse struct {
	Keyword      string `json:"keyword"`
	VideoID      string `json:"videoId"`
	Title        string `json:"title"`
	Description  string `json:"description"`
	ThumbnailUrl string `json:"thumbnailUrl"`
	VideoUrl     string `json:"videoUrl"`
	PublishedAt  string `json:"publishedAt"`
}

func (h *DbHandler) FetchYoutube(c echo.Context) error {
	// Verify connection
	err := h.DB.Ping()
	if err != nil {
		fmt.Println("error db from youtube page")
		log.Fatal(err)
	}
	fmt.Println("Successfully connected to the database!")
	req := new(YoutubeRequest)
	err = c.Bind(req)
	if err != nil {
		return c.JSON(400, map[string]string{"error": "Invalid request body"})
	}
	if req.Modify {
		req.Keyword, err = utils.PrettyPrompt(req.Keyword, h.Env["GEMINI_API_KEY"])
		if err != nil {
			fmt.Println("Unable to modify prompt, continuing with the original:", err.Error())
		}
	}
	originalKeyword := req.Keyword
	videoData, err := RunSearchQuery(h, req, originalKeyword)
	if err != nil {
		return c.JSON(500, map[string]string{"error": err.Error()})
	}
	return c.JSON(200, videoData)
}

func RunSearchQuery(h *DbHandler, req *YoutubeRequest, originalKeyword string) ([]clientResponse, error) {
	client := &http.Client{
		Transport: &transport.APIKey{Key: h.Env["YOUTUBE_DEVELOPER_KEY"]},
	}

	service, err := youtube.New(client)
	if err != nil {
		log.Fatalf("Error creating new YouTube client: %v", err)
		return nil, err
	}

	var videoData []clientResponse
	var paramsInResponse = []string{"snippet", "id"}

	totalResultsFetched := int64(0)
	for totalResultsFetched <= req.MaxResults {
		fmt.Println("starting")
		// Determine how many results to fetch in this iteration
		totalResultsFetched = totalResultsFetched + 10

		// API call to YouTube
		call := service.Search.List(paramsInResponse).
			Q(req.Keyword).
			MaxResults(10).
			Type("video").
			Order("date").
			PageToken(req.NextPageToken).
			PublishedAfter(startDate(req.StartFrom))

		response, err := call.Do()
		if err != nil {
			log.Printf("Error fetching YouTube response: %v", err)
			return nil, err
		}

		// Iterate through each item
		for _, item := range response.Items {
			video := clientResponse{
				Keyword:      originalKeyword,
				VideoID:      item.Id.VideoId,
				Title:        item.Snippet.Title,
				Description:  item.Snippet.Description,
				ThumbnailUrl: item.Snippet.Thumbnails.Default.Url,
				VideoUrl:     "https://www.youtube.com/watch?v=" + item.Id.VideoId,
				PublishedAt:  PostgresDates(item.Snippet.PublishedAt),
			}
			videoData = append(videoData, video)

			// Insert data into the database
			err = utils.InsertYoutubeResponse((*utils.DbHandler)(h), originalKeyword, item)
			if err != nil {
				log.Printf("Error inserting into DB: %v", err)
				return nil, err
			}
		}

		totalResultsFetched += int64(len(response.Items))
		req.NextPageToken = response.NextPageToken

		// Break if there are no more pages to fetch
		if req.NextPageToken == "" {
			break
		}
	}
	return videoData, nil
}

func PostgresDates(str string) string {
	layout := time.RFC3339
	t, err := time.Parse(layout, str)
	if err != nil {
		fmt.Println("Error parsing date:", err)
		return str
	}
	// Format to PostgreSQL compatible timestamp format (YYYY-MM-DD HH:MM:SS)
	return t.Format("2006-01-02 15:04:05")
}

func startDate(x int) string {
	currentTime := time.Now()
	pastTime := currentTime.AddDate(0, 0, -x)
	newTime := pastTime.Format("2006-01-02") + "T00:00:00Z"
	fmt.Println("new time : ", newTime)
	return newTime
}

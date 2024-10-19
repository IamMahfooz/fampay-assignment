// this file handlers read and write operations to the postgres-db
package utils
import (
	"database/sql"
	"fmt"
	"google.golang.org/api/youtube/v3"
	"time"
)

// ClientResponse Struct to format the response sent back to the client
type ClientResponse struct {
	Keyword      string `json:"keyword"`
	VideoID      string `json:"videoId"`
	Title        string `json:"title"`
	Description  string `json:"description"`
	ThumbnailUrl string `json:"thumbnailUrl"`
	VideoUrl     string `json:"videoUrl"`
	PublishedAt  string `json:"publishedAt"`
}
type DbHandler struct {
	Keywords []string
	DB       *sql.DB
	Env      map[string]string
}

// InsertYoutubeResponse Function to insert the YouTube response into the database
func InsertYoutubeResponse(h *DbHandler, keyword string, item *youtube.SearchResult) error {
	query := `
		INSERT INTO youtube_responses (keyword, video_id, title, description, thumbnail_url, video_url, published_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7)
		ON CONFLICT (keyword, video_id) DO NOTHING;` // Avoid duplicates

	_, err := h.DB.Exec(query,
		keyword,
		item.Id.VideoId,
		item.Snippet.Title,
		item.Snippet.Description,
		item.Snippet.Thumbnails.Default.Url,
		"https://www.youtube.com/watch?v="+item.Id.VideoId,
		PostgresDates(item.Snippet.PublishedAt), // Formatting date for PostgreSQL
	)
	if err != nil {
		fmt.Println("Error inserting into DB:", err)
	}
	return err
}

// GetYoutubeResponsesByKeyword Function to fetch records by keyword with pagination support
func GetYoutubeResponsesByKeyword(h *DbHandler, keyword string, limit, offset int64) ([]ClientResponse, error) {
	query := `
		SELECT keyword, video_id, title, description, thumbnail_url, video_url, published_at
		FROM youtube_responses
		WHERE keyword = $1
		ORDER BY published_at DESC
		LIMIT $2 OFFSET $3;  -- Pagination support
	`

	rows, err := h.DB.Query(query, keyword, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var responses []ClientResponse
	for rows.Next() {
		var response ClientResponse
		err := rows.Scan(&response.Keyword, &response.VideoID, &response.Title, &response.Description, &response.ThumbnailUrl, &response.VideoUrl, &response.PublishedAt)
		if err != nil {
			fmt.Println("Error scanning row:", err)
			return nil, err
		}
		responses = append(responses, response)
	}

	// Check for any error that occurred during iteration over rows
	if err = rows.Err(); err != nil {
		return nil, err
	}

	return responses, nil
}

// PostgresDates Utility function to convert YouTube date to PostgreSQL date format
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
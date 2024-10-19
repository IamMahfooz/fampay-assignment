// Package handlers : this file handles concurrent fetching of videos from youtube and storing in the database
package handlers

import (
	"fmt"

	"time"
)

func Cronjob(h *DbHandler) {
	for {
		fmt.Println("-------------Running Cronjob-------------------------")
		for key, _ := range h.Keywords {
			req := &YoutubeRequest{
				Modify:        true,
				Keyword:       key,
				MaxResults:    10,
				NextPageToken: "",
				StartFrom:     10,
			}
			_, err := RunSearchQuery(h, req, key)
			if err != nil {
				fmt.Println("unable to perform cronjob")
			}
		}
		time.Sleep(30 * time.Minute)
	}

}

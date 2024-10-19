// Package utils : this file handles concurrent fetching of videos from youtube and storing in the database
package utils

//
//import (
//	"fmt"
//	"github.com/IamMahfhooz/fampay-assignment/handlers"
//	"time"
//)
//
//func cronjob(h *DbHandler) {
//	for {
//		for _, key := range h.Keywords {
//			req := &handlers.YoutubeRequest{
//				Modify:        false,
//				Keyword:       key,
//				MaxResults:    10,
//				NextPageToken: "",
//				StartFrom:     10,
//			}
//			_, err := handlers.RunSearchQuery((*handlers.DbHandler)(h), req, key)
//			if err != nil {
//				fmt.Println("unable to perform cronjob")
//			}
//		}
//		time.Sleep(30 * time.Minute)
//	}
//
//}

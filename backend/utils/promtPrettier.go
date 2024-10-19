// this file handles the promt modifying feature to query from database/youtube for particular keyword
package utils

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
)

type Content struct {
	Parts []string `json:"Parts"`
	Role  string   `json:"Role"`
}
type Candidates struct {
	Content *Content `json:"Content"`
}
type ContentResponse struct {
	Candidates *[]Candidates `json:"Candidates"`
}

func PrettyPrompt(keyword string, gemini_api_key string) (string, error) {
	//initializing the gemini
	ctx := context.Background()
	client, err := genai.NewClient(ctx, option.WithAPIKey(gemini_api_key))
	if err != nil {
		return keyword, err
	}
	defer func(client *genai.Client) {
		err := client.Close()
		if err != nil {

		}
	}(client)
	model := client.GenerativeModel("gemini-1.5-flash")
	prompt := []genai.Part{
		genai.Text("original promt = " + keyword + " ; Instructions for response :  1. Return the modified promt that gives most related youtube videos though youtube video search api ; If you think the user is searching for particular keyword  then return the original promt itself 2. Return only the modified promt without any other texts ( not even double inverted commas)"),
	}
	resp, err := model.GenerateContent(ctx, prompt...)
	if err != nil {
		return keyword, err
	}
	marshalResponse, _ := json.MarshalIndent(resp, "", "  ")
	var generateResponse ContentResponse
	if err := json.Unmarshal(marshalResponse, &generateResponse); err != nil {
		return keyword, err
	}
	for _, cad := range *generateResponse.Candidates {
		if cad.Content != nil {
			for _, part := range cad.Content.Parts {
				fmt.Print(part)
				return part, nil
			}
		}
	}
	return keyword, nil
}
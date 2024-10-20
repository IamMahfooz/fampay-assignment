
## Project Goal:
Create an API to fetch the latest videos sorted in reverse chronological order of their publishing date-time from YouTube for a given tag/search query, with paginated responses.

### **Live Link**:
[Live App](https://fampay-assignment-alpha.vercel.app/)  
**Note**: Local pagination doesn't work on the hosted site, but works on local deployment due to caching issues in the free tier service. Hosting the frontend locally resolves the issue.

### **Server Link**:
[API Server](https://fampay-assignment-production-66b8.up.railway.app)
- Exposed API Endpoints: `/database` & `/youtube`.
```bash
curl -X POST https://fampay-assignment-production-66b8.up.railway.app/youtube \
-H "Content-Type: application/json" \
-d '{
  "keyword": "cricket",
  "maxResults": 10,
  "modify": false,
  "nextPageToken": "",
  "startDate": 20
}'
```
```bash
curl -X POST https://fampay-assignment-production-66b8.up.railway.app/database \
-H "Content-Type: application/json" \
-d '{
  "keyword": "cricket",
  "maxResults": 10,
  "modify": false,
  "nextPageToken": "",
  "startDate": 20
}'
```




---

## WebApp Functionality

### 1. Querying from YouTube:
   - **Step 1**: The user enters a search query and selects YouTube as the data source on the homepage.
   - **Step 2**: The system assigns an API key to the request using a round-robin approach to ensure balanced usage of available keys.
   - **Step 3**: Optionally, the system utilizes the `Gemini API` to generate optimized keywords related to the user's query for better search results.
   - **Step 4**: The request is sent to the YouTube API with the generated keyword(s), and the response containing videos is fetched.
   - **Step 5**: The results are sent back to the user and simultaneously stored in the PostgreSQL database for future reference.
   - **Step 6**: The search query is added to a cron job, which continues to fetch updated results periodically in the background to capture any new videos that match the query.

### 2. Querying from the Database:
   - **Step 1**: The user enters a search query and selects the Database as the data source on the homepage.
   - **Step 2**: The system uses the `Gemini API` to find the best matching keyword from past queries stored in the database.
   - **Step 3**: If a relevant keyword match is found, the system retrieves the previously stored video data associated with that keyword from the database.
   - **Step 4**: The results are returned to the user without making any fresh YouTube API calls, optimizing performance and response times.

---

## Implemented Features:
- **✅ Forward Search**: GET API to query videos from YouTube based on search query.
- **✅ Reverse Search**: GET API to query videos from the database.
- **✅ AI Search**: Uses GenAI tools for query enhancement (optional).
- **✅ Cronjob**: Asynchronously fetches updated YouTube results for past queries.
- **✅ Pagination**: Supports server-side and local pagination for results.
- **✅ Bulk Operation**: Performs bulk read/write operations to minimize database queries.
- **✅ Multiple API Keys**: Implements round-robin key allocation for YouTube API requests.
- **✅ Minimal Frontend**: Built with Next.js for client-server interaction.
- **✅ Scalability**: Utilizes GenAI to match queries to past keywords, optimizing search times and resource usage.

---

## Database Schema:
```sql
CREATE TABLE IF NOT EXISTS youtube_responses (
  id SERIAL PRIMARY KEY,
  keyword TEXT NOT NULL,
  video_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  thumbnail_url TEXT,
  video_url TEXT,
  published_at TIMESTAMP,
  UNIQUE (keyword, video_id)
);

CREATE INDEX IF NOT EXISTS idx_keyword ON youtube_responses(keyword);
```

---

## Tech Stack:
- **Backend**: Golang, API
- **Database**: PostgreSQL
- **Frontend**: Next.js, Shadcn/UI

---

## Hosting Platforms:
- **Backend**: Railway (free tier)
- **Database**: Render (Postgres DB)
- **Frontend**: Vercel

---

## How to Use:
1. **Select the required fields** and click search.
  - Option to search from YouTube or Database.
2. **View Results**:
  - Results are displayed in reverse chronological order.

#### Example Screenshots:
- Search Page  
  ![Search Page](https://github.com/user-attachments/assets/fc7b2d5c-db27-4eb0-ae6c-3d36642fec6e)

- YouTube Query Results  
  ![YouTube Results](https://github.com/user-attachments/assets/c60fd5df-e8a9-49ac-b67d-83ee37c5ec9e)

- Database Query Results  
  ![Database Results](https://github.com/user-attachments/assets/33b7f456-8c4c-49cf-8fae-9af0817d26df)

---

## How to Setup:

### Pre-Changes:
1. In the frontend files (`frontend/app/database/page.tsx` and `frontend/app/youtube/page.tsx`), update the server address to `http://localhost:5004`.
2. Place the `.env` file in the root directory (provided via submission mail).
3. Frontend is accessible at `http://localhost:3000/`

### Docker Setup:
```bash
docker compose up
```  

### Local Setup:
1. **Backend**:
   ```bash
   cd backend
   go mod download
   go run main.go
   ```
2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
3. **Database**:
  - The database is remotely hosted on Render.

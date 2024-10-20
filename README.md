## Project Goal :
To make an API to fetch latest videos sorted in reverse chronological order of their publishing date-time from YouTube for a given tag/search query in a paginated response.

---
**Live Link** : https://fampay-assignment-alpha.vercel.app/  
-- Restrictions in functionality due to caching issues in free tier .  
-- It works completely fine if you **host the frontend locally** and leave everything hosted in the cloud.

**Server Link** : https://fampay-assignment-production-66b8.up.railway.app  
-- Exposed API : /database & /youtube


----
## Basic Working of the webApp:
- **Query from Youtube** : If you select the destination as youtube in the homepage , then the server processes it as :  
  -- It assigns new api key to each request based on round robin approach.  
  -- Using `gemini api` it will find the keywords for better results.  
  -- Then the server sends the user request to `youtube api` and send back the obtained result to the user.  
  -- The results are send to user and also added to the database.  
  -- The query is then added to cronjob list for continous fetching of new results in the background
- **Query From Database**: If you select the destination as Database in the homepage , then the server processes it as :  
  -- Using `gemini api` it finds the best matching keyword from the database that matches the user query .  
  -- It uses past data stored to serve the data rather than querying from `youtube api`.  
  -- If matching keyword is found , it fetches the data and send it to the user.
---
## Implemented Features :
- ✅ **Forward Search** : GET API to query videos from YouTube based on search query.
- ✅ **Reverse Search** : GET API to query videos from the Database , which retrieves videos saved earlier to the database.
- ✅ **AI Search**:  Uses genAI tools for query modification for better search results (optional).
- ✅ **Cronjob** : Uses goroutine (golang thread management system) to asynchronously query YouTube for update results for past queries.
- ✅ **Pagination** : Used server and local pagination for querying and displaying results.
- ✅ **Bulk Operation** : Performs bulk read/write in single operation for database to avoid frequent db queries.
- ✅ **Multiple API Keys** : Uses round-robin approach to allocate api keys for YouTube querying tasks.
- ✅ **Minimal Frontend** : Used next.js to create a minimal frontend for client server interaction (most part reused from previous projects).
- ✅ **Scalable** : Used genAI tools to match queries to past keyword from the database which leads to better utilisation of past result and optimises search times.
----
## Tech Stack :
- **Backend** : Golang
- **Database** : Postgres
- **Frontend** : Next.js , shadcn/ui

## Hosting Platforms:
- **Backend** : Railway free service
- **Database** : Render's postgres database
- **Frontend** : Vercel
---
## How to Use :
-- **Select the required filelds and click search** . [Option to Search from Youtube or Databse]

![Screenshot from 2024-10-20 05-31-52](https://github.com/user-attachments/assets/fc7b2d5c-db27-4eb0-ae6c-3d36642fec6e)

-- **Based on the query , you will see the respones** :

![Screenshot from 2024-10-20 05-32-59](https://github.com/user-attachments/assets/c60fd5df-e8a9-49ac-b67d-83ee37c5ec9e)

![Screenshot from 2024-10-20 06-10-21](https://github.com/user-attachments/assets/33b7f456-8c4c-49cf-8fae-9af0817d26df)

  
---
## How to Setup :
-- **Pre-changes** :
-- from the frontend , change to the server address to `http://loaclhost:5004`.
-- Place the .env file in the root directory
**Local** :
- Backend : ```go mod download && go run main.go``` in the backend directory.
- Frontend : ```npm install && npm run dev``` in the frontend directory.
- Database : Database is remotely hosted at render

**Docker** :
- ```docker-compose up```

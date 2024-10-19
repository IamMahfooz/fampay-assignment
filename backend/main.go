package main
import (
	"github.com/IamMahfhooz/fampay-assignment/routes"
	"fmt"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	_ "github.com/lib/pq"
	"os"
)

func main() {
	envFile, _ := godotenv.Read("../.env")
	fmt.Println("loaded env variables")

	e := echo.New()
	e.Use(middleware.CORS())

	db := routes.StartDbProcess(envFile, e)
	defer db.Close()

	routes.AssignHandlers(db, e, envFile)

	port := os.Getenv("PORT")
	if port == "" {
		port = ":5004"
	} else {
		port = ":" + port
	}

	err := e.Start(port)
	if err != nil {
		fmt.Println("error while starting server : ", err.Error())
		return
	}
}
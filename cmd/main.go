package main

import (
	"context"
	"io/fs"
	"log"
	"net/http"
	"strings"

	"github.com/frsfahd/travel-app/models"
	"github.com/frsfahd/travel-app/web"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/filesystem"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

type Host struct {
	Fiber *fiber.App
}

func init() {
	ctx = context.Background()

	configEnv()

	// switch ENV {
	// case "development":
	// 	configDB()
	// case "production":
	// 	configFirestore()
	// }

}

func main() {
	conn, err := configDB(ctx)
	if err != nil {
		log.Fatalf(err.Error())
	}
	log.Print("database connected...")
	defer conn.Close(ctx)

	queries = models.New(conn)

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))
	app.Use(recover.New())

	// Logging remote IP and Port
	app.Use(logger.New(logger.Config{
		Format:     "[${time} - ${ip}]:${port} ${status} - ${method} ${path}\n",
		TimeFormat: "2006-01-02T15:04:05+07:00",
	}))

	// ----
	// api (site.HOST/api/vX/)
	// ----
	api := app.Group("/api")

	api.Post("/customers", SaveCustomerData)

	api.Get("/customers", ListCustomers)

	api.Get("/customers/:id", GetCustomerById)

	api.Delete("/customers/:id", DeleteCustomerById)

	api.Put("/customers", UpdateCustomerById)

	api.Post("/login", Login)

	api.Get("/token/:token", VerifyToken)

	app.Get("/hello", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	//----------
	// main site
	//----------

	index, err := fs.Sub(web.Index, "dist")
	if err != nil {
		panic(err)
	}

	app.Use("/", filesystem.New(filesystem.Config{
		Root:  http.FS(index),
		Index: "index.html",
	}))

	// Handle all other paths to index.html for React Router to take over
	// Catch-all route for React Router to handle client-side routing
	app.Use(func(c *fiber.Ctx) error {
		if !strings.HasPrefix(c.Path(), "/api") {
			return c.SendFile("web/dist/index.html")
		}
		return c.Next()
	})

	log.Fatal(app.Listen(":" + PORT))

	// defer client.Close()

}

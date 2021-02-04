package main

import (
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
)

const (
	address string = "0.0.0.0:8080"
)

/*
getAddress will return the address of the webserver.
*/
func getAddress() string {
	return address
}

func main() {
	fmt.Println("[+] Initialized the webserver to serve the frontend.")
	gin.SetMode(gin.ReleaseMode)
	router := gin.Default()

	router.Static("/static", "js-frontend/build/static")
	router.StaticFile("/", "js-frontend/build/index.html")

	if err := router.Run(getAddress()); err != nil {
		log.Fatal(err)
	}
	fmt.Println("[+] Stopped the webserver.")
}

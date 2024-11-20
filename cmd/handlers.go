package main

import (
	"log"
	"strconv"

	"github.com/dgrijalva/jwt-go"
	"github.com/frsfahd/travel-app/models"
	"github.com/gofiber/fiber/v2"
)

func Login(c *fiber.Ctx) error {
	var user models.Login

	err := c.BodyParser(&user)
	if err != nil {
		return err
	}

	errMessage := models.ErrorResponse{
		Message: "incorrect email",
	}

	userFetched, err := queries.GetUser(ctx, user.Email)
	// log.Print(userFetched)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(errMessage)
	}

	// token := models.TokenResponse{
	// 	Token: "token_123",
	// }

	// sign jwt
	token, err := signJWT(jwt.MapClaims{"user": userFetched.Email, "role": userFetched.Role}, SECRET)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON("error")
	}

	reponse_token := models.TokenResponse{
		Token: token,
	}

	//verify password
	if hashInput(user.Password) == userFetched.Password {
		return c.Status(fiber.StatusOK).JSON(reponse_token)
	}

	errMessage = models.ErrorResponse{
		Message: "incorrect password",
	}

	return c.Status(fiber.StatusUnauthorized).JSON(errMessage)

}

func VerifyToken(c *fiber.Ctx) error {
	token := c.Params("token")

	errMessage := models.ErrorResponse{
		Message: "invalid token",
	}

	claims, err := verifyJWT(token, SECRET)
	if err != nil {
		return c.Status(fiber.StatusForbidden).JSON(errMessage)
	}

	if claims == nil {
		return c.Status(fiber.StatusBadRequest).JSON(errMessage)
	}

	// user := models.UserResponse{
	// 	User: "admin@gmail.com",
	// }

	// if token == "token_123" {
	// 	return c.Status(fiber.StatusOK).JSON(user)
	// }
	return c.Status(fiber.StatusOK).JSON(claims)

}

func SaveCustomerData(c *fiber.Ctx) error {
	form, err := c.MultipartForm()
	if err != nil {
		log.Print(err.Error())
		return c.Status(fiber.StatusInternalServerError).JSON("server error")
	}

	inputFile := &models.FormDataFile{}

	for key, fileHeaders := range form.File {
		for _, file := range fileHeaders {
			log.Printf("Processing file with key: %s, Filename: %s\n", key, file.Filename)
			// Save the file to disk or process it as needed
			if err := c.SaveFile(file, "./upload/"+file.Filename); err != nil {
				return err
			}

			// Map filenames to struct fields
			switch key {
			case "citizenCard":
				inputFile.CitizenCard = file.Filename
			case "familyCard":
				inputFile.FamilyCard = file.Filename
			case "passport":
				inputFile.Passport = file.Filename
			case "photo":
				inputFile.Photo = file.Filename
			}
		}
	}

	var nonFileForm models.FormData

	err = c.BodyParser(&nonFileForm)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}

	allFormData := models.AddCustomerParams{
		Name:        nonFileForm.Name,
		Gender:      nonFileForm.Gender,
		Birthdate:   nonFileForm.BirthDate,
		Birthplace:  nonFileForm.BirthPlace,
		Address:     nonFileForm.Address,
		Province:    nonFileForm.Province,
		Regency:     nonFileForm.Regency,
		District:    nonFileForm.District,
		Village:     nonFileForm.Village,
		CitizenID:   nonFileForm.CitizenId,
		PassportID:  nonFileForm.PassportId,
		PassportExp: nonFileForm.PassportExp,
		CitizenCard: inputFile.CitizenCard,
		Passport:    inputFile.Passport,
		FamilyCard:  inputFile.FamilyCard,
		Photo:       inputFile.Photo,
		TravelPkg:   nonFileForm.TravelPkg,
		RoomType:    nonFileForm.RoomType,
	}

	addedUser, err := queries.AddCustomer(ctx, allFormData)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON("failed database operation")
	}

	return c.Status(fiber.StatusCreated).JSON(addedUser)
}

func ListCustomers(c *fiber.Ctx) error {
	customers, err := queries.ListCustomers(ctx)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}

	return c.Status(fiber.StatusOK).JSON(customers)

}

func GetCustomerById(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))

	customer, err := queries.GetCustomer(ctx, int32(id))
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}

	return c.Status(fiber.StatusOK).JSON(customer)
}

func DeleteCustomerById(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	err := queries.DeleteCustomer(ctx, int32(id))
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}
	return c.Status(fiber.StatusOK).JSON("customer deleted")
}

func UpdateCustomerById(c *fiber.Ctx) error {
	form, err := c.MultipartForm()
	if err != nil {
		log.Print(err.Error())
		return c.Status(fiber.StatusInternalServerError).JSON("server error")
	}

	inputFile := &models.FormDataFile{}

	for key, fileHeaders := range form.File {
		for _, file := range fileHeaders {
			log.Printf("Processing file with key: %s, Filename: %s\n", key, file.Filename)
			// Save the file to disk or process it as needed
			if err := c.SaveFile(file, "./upload/"+file.Filename); err != nil {
				return err
			}

			// Map filenames to struct fields
			switch key {
			case "citizenCard":
				inputFile.CitizenCard = file.Filename
			case "familyCard":
				inputFile.FamilyCard = file.Filename
			case "passport":
				inputFile.Passport = file.Filename
			case "photo":
				inputFile.Photo = file.Filename
			}
		}
	}

	var nonFileForm models.FormUpdateData

	err = c.BodyParser(&nonFileForm)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}
	id, _ := strconv.Atoi(nonFileForm.ID)
	allFormData := models.UpdateCustomerParams{
		ID:          int32(id),
		Name:        nonFileForm.Name,
		Gender:      nonFileForm.Gender,
		Birthdate:   nonFileForm.BirthDate,
		Birthplace:  nonFileForm.BirthPlace,
		Address:     nonFileForm.Address,
		Province:    nonFileForm.Province,
		Regency:     nonFileForm.Regency,
		District:    nonFileForm.District,
		Village:     nonFileForm.Village,
		CitizenID:   nonFileForm.CitizenId,
		PassportID:  nonFileForm.PassportId,
		PassportExp: nonFileForm.PassportExp,
		CitizenCard: inputFile.CitizenCard,
		Passport:    inputFile.Passport,
		FamilyCard:  inputFile.FamilyCard,
		Photo:       inputFile.Photo,
		TravelPkg:   nonFileForm.TravelPkg,
		RoomType:    nonFileForm.RoomType,
	}

	err = queries.UpdateCustomer(ctx, allFormData)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err.Error())
	}
	return c.Status(fiber.StatusOK).JSON("customer updated")
}

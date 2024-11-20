package models

type Login struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
type UserResponse struct {
	User string `json:"user"`
}

type TokenResponse struct {
	Token string `json:"token"`
}

type ErrorResponse struct {
	Message string `json:"message"`
}

type FormData struct {
	Name        string
	Gender      string
	BirthDate   string
	BirthPlace  string
	Address     string
	Province    string
	Regency     string
	District    string
	Village     string
	CitizenId   string
	PassportId  string
	PassportExp string
	TravelPkg   string
	RoomType    string
}

type FormUpdateData struct {
	ID          string
	Name        string
	Gender      string
	BirthDate   string
	BirthPlace  string
	Address     string
	Province    string
	Regency     string
	District    string
	Village     string
	CitizenId   string
	PassportId  string
	PassportExp string
	TravelPkg   string
	RoomType    string
}

type FormDataFile struct {
	CitizenCard string
	Passport    string
	Photo       string
	FamilyCard  string
}

type AllFormData struct {
	FormData
	FormDataFile
}

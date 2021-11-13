# auth-api

API with register, login and change password endpoints.
Post: localhost:3000/api/user/register
req body
{
"name":"jhondoe",
"email":"jhondoe@gmail.com",
"password":"qwert123"
}

Post: localhost:3000/api/user/login
req body
{

    "email":"jhondoe@gmail.com",
    "password":"qwert123"

}

Post: localhost:3000/api/user/logout
Header:
auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MThmNTI2YzAzZjEwMTE0NWU5N2U0NjYiLCJpYXQiOjE2MzY3ODI3OTN9.T9AHtEoMlwE2ZZlyj0awPvm09cjCOt8UgNPsZ99rFss

req.body
{
"logged": true
}

POST localhost:3000/api/user/changepassword
Header:
auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MThmNTI2YzAzZjEwMTE0NWU5N2U0NjYiLCJpYXQiOjE2MzY3ODI3OTN9.T9AHtEoMlwE2ZZlyj0awPvm09cjCOt8UgNPsZ99rFss
Content-Type: application/json
req.body
{
"password":"qwert123"
}

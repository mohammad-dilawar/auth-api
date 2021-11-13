# auth-api

install Dependency
npm install
to run project
npm start

# API with register, login and change password endpoints.

# Post: localhost:3000/api/user/register

req body
{
"name":"jhondoe",
"email":"jhondoe@gmail.com",
"password":"qwert123"
}

# Post: localhost:3000/api/user/login

req body
{

    "email":"jhondoe@gmail.com",
    "password":"qwert123"

}

# Post: localhost:3000/api/user/logout

Header:
auth-token: <jwttoken>

req body
{
"logged": true
}

# Post: localhost:3000/api/user/changepassword

Header:
auth-token: <jwttoken>
Content-Type: application/json
req body
{
"password":"qwert123"
}

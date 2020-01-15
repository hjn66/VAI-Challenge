# VAI-Challenge
## Install
copy `.enc.emaple` and rename to `.env` and fill sections like server.JWTsecret and admin with desired values then `run npm install`
## Run
Use `node app.js`
## Test
Use `npm test`
## Project Structure
### boot
This directory consist of boot scripts thats runs at start up
#### addAdmin
Add static admin, get configuration from "#Static Admin" section of `.env`
#### databse
Create connection with database (MongoDB) get configuration from "#database" section of `.env`
#### i18n
Configure i18n module for multi language feature, locals save in locals directory
#### initNonLexicals
Add first nonLexical words at start up, init words save in fileStorage directory by default but you can change in "#nonlexicalWords" section of `.env`
#### routes
Configure express, bady-parser and passport and define routes
### DAO
Store Data Access Object for each models, for each model we have a module in this directory and connection with database handled from these modules. I have two models (nonLexical and user).
### fileStorage
Directory for storing files in project like attachments and other. Currently I have on files in it for initLexical Words
### locals
Store i18n localization files. for each language I have one json file that for each key I can put translation for it. Keys are generated authomaticaly when called in code and you can translate it in json file.
### logs
Store error and info logs of project. Their stratucture defined in `looging` middleware
### middlewares
#### errors
This middleware handle errors and return in well format to user also hide server errors from client for security reasons.
#### logging
This middleware are responsible for show logs in console also format and store in logs directory. I use winston module for store logs in this project
#### passport
I use passport for authentication and protect routes. This middlewares check user jwt token
### models
Database models defined in this directory. Two models defined in this project (nonLexical and user)
### routes
Routes defined in this directory. Thare are three routes in this project:
#### complexity
post /complexity return the lexical density of the inputted text. The input text should be
provided via the request.
Request:
```json
{
  "text": "Kim loves going ​ to the ​ cinema" 
}
```
Response:
```json
{
  "data": {
    "overall_ld": "0.67"
  }
}
```
also ​/complexity?mode=verbose return the lexical density of the text broken down into sentences. The input
text should be provided via the request.
Request:
```json
{
    "text": "Kim loves going to the cinema. I love To watch film in home. Text length must be less than or equal to 100 words"
}
```
Response:
```json
{
  "data": {
    "sentence_ld": ["0.67", "0.57", "0.82"],
    "overall_ld": "0.71"
  }
}
```
#### nonLexical
Two routes difined in this project. These two routes are protected and must put jwtToken in authorization in header.
post /non-lexical add new word to non lexicals
Request:
```json
{
	"word":"over"
}
```
Response
```json
{
  "word": {
    "createdAt": "2020-01-15T12:31:36.157Z",
    "_id": "5e1f0852d14c44440b727d5d",
    "word": "over",
    "__v": 0
  }
}
```
get/non-lexicals get list of all non-lexical words in DB
#### user
One route for user login are in this directory
post /users/login

Request:
```json
{
	"username":"USERNAME",
	"password":"PASSWORD"
}
```
Response
```json
{
    "token": "jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMWVmNTNhMTg4ZDJmMWQwM2IyYjE0NyIsImlhdCI6MTU3OTA5MTU3OH0.1yqQvML7_xHFZvlhJY6RFaZJCNc8U4RKINEGma8dGw0"
}
```
### test
Includes two test, one for unit test and another for integration test, We use mocha module for test
### utils
Includes useful utils. We have on utility for calc lexical words in sentence.
### app.js
project startup that calls boot scripts and create server
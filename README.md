# Fasta <br>
This is an api for a **a web service using Node.js that can be deployed to AWS, API can be consumed from any client.**. <hr>

## Requirements <br>
1. Be deployed on https://render.com
2. Allow user create an account with basic user information
3. Allow a user login
4. Allow a user have a wallet
5. Allow a user create a transaction PIN
6. Allow a user create a donation to a fellow user (beneficiary)
7. Allow a user check how many donations he/she has made
8. Have ability to a special thank you message via email or sms or any communication channel, if they make two(2) or more donations.
9. Allow a user view all donation made in a given period of time.
10. Allow a user view a single donation made to a fellow user (beneficiary)  <hr/>
## Setup <br>
 * Install NodeJS, MongoDB
 * pull this repo
 * update env with example.env
 * Download all dependecies using npm install
 * run npm run start
 * run npm test:load <hr>
## Base URL
 * [Link to api](https://fasta-test.onrender.com/) <hr>
## Models <br>
### Users
| field	| data_type	| constraints | validation |
| -------- | ---------| -----------| ----------------------|
| id | UUID | required | None |
| first_name |	string | required |
| last_name |	string | required |
| email |	string | required | unique, email must conform to email (example: user1@gmail.com) |
| password |	string | required | pasword must contain at least one uppercase, one lowercase, one symbol, and must be at least 8 |
| confirmation_code | string | optional | None |
| status | string: enum(Pending, Active)| optional | default: Pending |
| transaction_pin | string | optional | length must be 4 | 
| createdAt | Date | optional | Get added automatically | 
| updatedAt | Date | optional | Get added automatically | <br>
### Wallets
| field	| data_type	| constraints | validation |
| -------- | ---------| -----------| ----------------------|
| id | UUID | required | None |
| balance |	float | required: default to 0.0 | min of 0 |
| wallet_id |	UUID | required | foreign key to User model as Wallet;|
| createdAt | Date | optional | Get added automatically | 
| updatedAt | Date | optional | Get added automatically | <br>
### Donations
| field	| data_type	| constraints | validation |
| -------- | ---------| -----------| ----------------------|
| id | UUID | required | None |
| amount |	float | required: default to 0.0 | min of 0 |
| donor_id |	UUID | required | foreign key to Wallet model as Donor |
| beneficiary_id |	UUID | required | foreign key to Wallet model as Beneficiary |
| createdAt | Date | optional | Get added automatically | 
| updatedAt | Date | optional | Get added automatically | <hr>

## APIs <br>
### Register User <br> 
 * Route: /api/auth/register
 * Method: POST
 * Body:
 ```
 {
  "email": "doe@example.com",
  "password": "Password1",
  "firstname": "jon",
  "lastname": "doe",
 }
 ```
 * Responses: Success
 * Status: 201
  ```
  {
    "msg": "User created successfully! Please check your mail",
  }
  ```
 * Responses: Failure
 * Status: 400
  ```
  {
    "msg": "User already exists",
  }
  ```
 * Responses: Failure
 * Status: 500
  ```
  {
    "msg": "Something went wrong! Please try again",
  }
  ```
### Login User
 * Route: /api/auth/login
 * Method: POST
 * Body:
 ```
 {
   "password": "Password1",
   "email": 'doe@example.com",
 }
 ```
 * Responses: Success
 * Status: 200
 ```
 {
  "message": "User login successfully"
  "id": "14rfd-jehd65w-jwejojw-diwhdiw",
  "email": "doe@example.com",
  "firstname": "jon",
  "lastname": "doe",
  "token": "exampletoken&8ofiwhb.fburu276r4ufhwu4.o82uy3rjlfwebj",
 }
 ```
 * Responses: Failure
 * Status: 400
  ```
  {
    "message": "your email is yet to be verified",
  }
  ```
 * Responses: Failure
 * Status: 401
  ```
  {
    "message": "Unable to login, Invalid email or password",
  }
  ```
 * Responses: Failure
 * Status: 500
  ```
  {
    "message": "An Error Occured",
  }
  ```
### confirm User
 * Route: /api/auth/confirm/{ confirmation_code }
 * Method: GET
 * Headers:
    - path: confirmation_code
 * Body: None
 * Responses: Success
 * Status: 200
 ```
 {
  "message": "User login successfully"
 }
 ```
 * Responses: Failure
 * Status: 400
  ```
  {
    "msg": "Verification Successful.You can now login",
  }
  ```
 * Responses: Failure
 * Status: 500
  ```
  {
    "msg": "Something went wrong",
  }
  ```
### Resend confirmation mail
 * Route: /api/auth/resend-confirm
 * Method: POST
 * Body:
 ```
 {
   "email": 'doe@example.com",
 }
 ```
 * Responses: Success
 * Status: 200
 ```
 {
  "msg": "Verification link sent, kindly check your mail"
 }
 ```
 * Responses: Failure
 * Status: 400
  ```
  {
    "msg": "User does not exist",
  }
  ```
 * Responses: Failure
 * Status: 401
  ```
  {
    "msg": "user already verified",
  }
  ```
 * Responses: Failure
 * Status: 500
  ```
  {
    "msg": "Something went wrong! Please try again", error,
  }
  ```
 ### Home Page
 * Route: /api
 * Method: GET
 * Header
   - Authorization: None
 * Responses: Success
 * Status: 200
 ```
 {
   "message": "Welcome home",
 }
 ```
### Create wallet
 * Route: /
 * Method: POST
 * Header
   - Authorization: Bearer {token}
 * Body: None
 * Responses: Success
 * Status: 201
 ```
 {
  "message": "wallet created successfully!",
  "wallet" : {
                "id": "14rfd-jehd65w-jwejojw-diwhdiw",
                "balance": "2",
                "user_id": "eufhb-gehgbuw-iwejojw-3iwhdiw",
 }
}
 ```
 * Responses: Failure
 * Status: 400
  ```
  {
    "message": "wallet failed to create",
  }
  ```
 * Responses: Failure
 * Status: 401
  ```
  {
    "message": "user already has a wallet",
  }
  ```
 * Responses: Failure
 * Status: 500
  ```
  {
    "message": "Error creating wallet",
  }
  ```
### Get wallet
 * Route: /api/wallet
 * Method: GET
 * Header
   - Authorization: Bearer {token}
 * Body: None
 * Responses: Success
 * Status: 200
 ```
 {
  "message": "wallet retrieved successfully!",
  "wallet" : {
                "id": "14rfd-jehd65w-jwejojw-diwhdiw",
                "balance": "2",
                "user_id": "eufhb-gehgbuw-iwejojw-3iwhdiw",
                "user": {
                            "id": "eufhb-gehgbuw-iwejojw-3iwhdiw",
                            "email": "doe@example.com",
                            "firstname": "jon",
                            "lastname": "doe"
}
                
 }
}
 ```
 * Responses: Failure
 * Status: 400
  ```
  {
    "message": "user has no wallet yet",
  }
  ```
 * Responses: Failure
 * Status: 500
  ```
  {
    "message": "Error retrieving wallet",
  }
  ```
### Create Transaction Pin
 * Route: /api/wallet/create_pin
 * Method: POST
 * Header
   - Authorization: Bearer {token}
 * Body:
 ```
 {
   "transaction_pin": "5786",
 }
 ```
 * Responses: Success
 * Status: 201
 ```
 {
  "message": "Transaction PIN created successfully",                
}
 ```
 * Responses: Failure
 * Status: 401
  ```
  {
    "error": "You do not have a wallet page yet, create one",
  }
  ```
 * Responses: Failure
 * Status: 404
  ```
  {
    "error": "User not found",
  }
  ```
 * Responses: Failure
 * Status: 500
  ```
  {
    "error": ""Error creating transaction PIN"",
  }
  ```
### Verify Beneficiary Wallet
 * Route: /api/donations/verify_beneficiary
 * Method: GET
 * Header
   - Authorization: Bearer {token}
 * Body:
 ```
 {
   "beneficiary_wallet_id": "fg5786flenfh",
 }
 ```
 * Responses: Success
 * Status: 200
 ```
 {
  "beneficiary":  {
                     "id": "eufhb-gehgbuw-iwejojw-3iwhdiw",
                     "email": "doe@example.com",
                     "firstname": "jon",
                     "lastname": "doe",
                  }          
}
 ```
 * Responses: Failure
 * Status: 400
  ```
  {
    "message": "you cannot make donations to yourself",
  }
  ```
 * Responses: Failure
 * Status: 404
  ```
  {
    "message": "Beneficiary wallet not found.",
  }
  ```
 * Responses: Failure
 * Status: 500
  ```
  {
    "message": "Internal server error.",
  }
  ```
### Confirm Donation
 * Route: /api/donations/confirm
 * Method: PUT
 * Header
   - Authorization: Bearer {token}
 * Body:
 ```
 {
   "beneficiary_wallet_id": "fg5786flenfh",
   "amount": "2",
   "transaction_pin": "5467",
 }
 ```
 * Responses: Success
 * Status: 200
 ```
 {
  "message": "donation successful"
  "donation":  {
                     "id": "eufhb-gehgbuw-iwejojw-3iwhdiw",
                     "amount": "2",
                     "beneficiary_id": "eufhb-gehgbuw-iwejojw-3iwhdiw",
                     "donor_id": "eufhb-gehgbuw-iwejojw-3iwhdiw",
                  }          
}
 ```
 * Responses: Failure
 * Status: 404
  ```
  {
    "message": "Beneficiary wallet not found.",
  }
  ```
 * Responses: Failure
 * Status: 402
  ```
  {
    "message": "you don't have a transction pin",
  }
  ```
 * Responses: Failure
 * Status: 401
  ```
  {
    "message": "you do not have enough to donate",
  }
  ```
 * Responses: Failure
 * Status: 500
  ```
  {
    "message": "Internal server error.",
  }
  ```
### Get User Single Donation
 * Route: /api/donations/{ donation_id }
 * Method: GET
 * Header
   - Authorization: Bearer {token}
   - path: donation_id
 * Body: None
 * Responses: Success
 * Status: 200
 ```
 {
  "message": "you don't have a transction pin",
  "donation":  {
                     "id": "eufhb-gehgbuw-iwejojw-3iwhdiw",
                     "amount": "2",
                     "beneficiary_id": "eufhb-gehgbuw-iwejojw-3iwhdiw",
                     "donor_id": "eufhb-gehgbuw-iwejojw-3iwhdiw",
              "Wallet":  {
                     "id": "eufhb-gehgbuw-iwejojw-3iwhdiw",
                     "User":  {
                     "id": "eufhb-gehgbuw-iwejojw-3iwhdiw",
                  }    
                  }             
                  }          
}
 ```
 * Responses: Failure
 * Status: 400
  ```
  {
    "message": "Invalid donation ID",
  }
  ```
 * Responses: Failure
 * Status: 404
  ```
  {
    "message": "Error retrieving donation",
  }
  ```
 * Responses: Failure
 * Status: 500
  ```
  {
    "message": "Internal server error.",
  }
  ```
### Get User Donations
 * Route: /api/donations
 * Method: GET
 * Header
   - Authorization: Bearer {token}
 * Query params:
   - start date  *//start_date=2022/11/01
   - end_date *//end_date=2022/11/01
   - order_by(sort): order_by=amount+DESC,createdAt+ASC
   - page = (default: 1) *//can select any e.g page = 3*
   - limit = (default: 10) *//can limit to any value e.g limit = 5*
   // example url:  http://localhost:4000/api/donations?page=2&limit=8&order_by=amount+DESC,createdAt+ASC&start_date=2022/11/01&end_date=2022/11/01
 * Responses: Success
 * Status: 200
 ```
 {
  "message": "Donations queried successfully!",
  "total_donations": "36",
  "page": "2",
  "limit": "8",
  "donations":  [{
                     "id": "eufhb-gehgbuw-iwejojw-3iwhdiw",
                     "email": "doe@example.com",
                     "firstname": "jon",
                     "lastname": "doe",
                  }].....          
}
 ```
 * Responses: Failure
 * Status: 401
  ```
  {
    "message": "you don't have a wallet yet",
  }
  ```
 * Responses: Failure
 * Status: 404
  ```
  {
    "message": "You haven't made any donation"",
  }
  ```
 * Responses: Failure
 * Status: 500
  ```
  {
    "message": "Error retrieving donation",
  }
  ```
 
...

Contributor:
Oluseyi Adeegbe

# Preparation

- Make sure to add environments variables with the following format:
  ```
      MONGODB_URL = 'mongodb://127.0.0.1:27017/clubOrganiser' or
      MONGODB_URL = '{your url to the mongodb database}'
      JWTKEY = '{your preferred random strong key}'
      OTP_EMAIL = '{your email used to send OTP to users' emails}'
      OTP_EMAIL_PASSWORD = '{your password (app password) for your email}'
  ```

# Notice:

- Profile pic is sent as an address to a cloud file storage, and not the actual picture.
- Start point is index.js
- Build it by ``` npm i ``` first
- Run it by ``` node index.js ```

# Endpoints

- ## For sign up

  ```
      POST /auth/register
  ```

  ### request parameters:

  - Body:

    ```
        {
            "username": "",
            "password": "",
            "email": "",
            "phone": "",
            "userType": "",
            "clubs": "",
            "profilePic": ""
        }

    ```

  ### response format:

        ```
            {
                "message": "Account Created Successfully!",
                "otherUserInfo": {
                    "username": "",
                    "email": "",
                    "phone": "",
                    "userType": "",
                    "clubs": "",
                    "profilePic": "",
                    "_id": "",
                    "createdAt": "",
                    "updatedAt": "",
                    "__v": 0
                }
            }
        ```

- ## For sign in

  ```
      POST /auth/login
  ```

  ### request parameters:

  - Body:

    ```
        {
            "email": "",
            "password": ""
        }

    ```

  ### response format:

        ```
            {
                "message": "Log In Successful!",
                "accessToken": ""
            }
        ```

- ## For update profile

  ```
      PUT /auth/updateprofile
  ```

  ### request parameters:

  - Headers:

    ```

        "token": "bearer {received token}"


    ```

  - Body:

    ```
        {
            "_id": "{recieved id}",
            username: "",
            email: "",
            phone: "",
            userType: "",
            clubs: "",
            profilePic: "",
        }

    ```

  ### response format:

        ```
            {
                "message": "Update Successful!",
                "accessToken": ""
            }
        ```

- ## For change password

  ```
      PUT auth/forgot-password
  ```

  ### request parameters:

  - Body:

    ```
        {
            "email": ""
        }

    ```

  ### response format:

        ```
            This endpoint does not have any responses. It will send OTP to the provided email which will then be used to verify for later routes.
        ```

- ## For resetting password

  ```
      PUT auth/reset-password
  ```

  ### request parameters:

  - Body:

    ```
        {
            "email": "",
            "otp": "",
            "newPassword": ""
        }

    ```

  ### response format:

        ```
            {
                "message": "Password reset successfully"
            }
        ```

### ---------------------------------------------------------------------------------

- ## For adding a new club

  ```
      POST club/new
  ```

  ### request parameters:

  - Headers:

  ```

      "token": "bearer {received token of a user with userType=admin}"


  ```

  - Body:

    ```
        {
            "name": "",
            "description": "",
            "category": "",
            "managers": "{_id of the users that are supposed to be managers of the club}",
            "status": "",

            optional values include the following:

            "events: "{array of _id of events hosted by the club}",
            "location: "",
            "members: "{array of object in the form of {"name": "", "email": "" }}",
            "logo: "{url of an image file}",

        }

    ```

  ### response format:

        ```
            {
                "message": "Club Saved Successfully!",
                "savedClub": {
                    "name": "",
                    "category": "",
                    "description": "",
                    "managers": [
                        "_id of the users set us managers"
                    ],
                    "events": [],
                    "members": [],
                    "status": "",
                    "_id": "6777999c82ea2e360ebde0a2",
                    "createdAt": "2025-01-03T08:02:36.598Z",
                    "updatedAt": "2025-01-03T08:02:36.598Z",
                    "__v": 0
                }
            }  other optional fields will be added if they were included in the request
        ```

- ## For getting all clubs

  ```
      GET club/all
  ```

  ### request parameters:

  - Headers:

  ```

      "token": "bearer {received token of a user with userType=admin}"


  ```

  - Body:

    ```
        {
           not required
        }

    ```

  ### response format:

        ```
            [
                {
                    "_id": "",
                    "name": "",
                    "category": "",
                    "description": "",
                    "managers": [
                        "_id of users set us managers"
                    ],
                    "events": [],
                    "members": [],
                    "status": "",
                    "createdAt": "2025-01-03T08:02:36.598Z",
                    "updatedAt": "2025-01-03T08:02:36.598Z",
                    "__v": 0
                } other optional fields will be added if they were included in the request
            ]
        ```

- ## For single club by manager ID

  ```
      GET club/bymanagerid
  ```

  ### request parameters:

  - Headers:

  ```

      "token": "bearer {received token of a user with userType=organiser}"


  ```

  - Body:

    ```
        {
           not required
        }

    ```

  ### response format:

        ```
            {
                "_id": "",
                "name": "",
                "category": "",
                "description": "",
                "managers": [
                    "_id of users set us managers"
                ],
                "events": [],
                "members": [],
                "status": "",
                "createdAt": "2025-01-03T08:02:36.598Z",
                "updatedAt": "2025-01-03T08:02:36.598Z",
                "__v": 0
            } other optional fields will be added if they were included in the request

        ```

- ## For updating a single club by club ID

  ```
      PUT club/update
  ```

  ### request parameters:

  - Headers:

  ```

      "token": "bearer {received token of a user with userType=organiser}"


  ```

  - Body:

    ```
        {
            "_id": "{club id}",
            "name": "",
            "description": "",
            "category": "",
            "managers": "{_id of the users that are supposed to be managers of the club}",
            "status": "",

            optional values include the following:

            "events: "{array of _id of events hosted by the club}",
            "location: "",
            "members: "{array of object in the form of {"name": "", "email": "" }}",
            "logo: "{url of an image file}",

        }

    ```

  ### response format:

        ```
            {
                "message": "Update Successful!",
                "newValues": {
                    "_id": "",
                    "name": "",
                    "category": "",
                    "description": "",
                    "managers": [
                        "_id of users set us managers"
                    ],
                    "events": [],
                    "members": [],
                    "status": "",
                    "createdAt": "2025-01-03T08:02:36.598Z",
                    "updatedAt": "2025-01-03T08:02:36.598Z",
                    "__v": 0
                } other optional fields will be added if they were included in the request

            }
            
        ```

- ## For deleting a single club by club ID

  ```
      DELETE club/delete
  ```

  ### request parameters:

  - Headers:

  ```

      "token": "bearer {received token of a user with userType=organiser}"


  ```

  - Body:

    ```
        { 
            "_id": "club id"
            
        }

    ```

  ### response format:

        ```
            {
                "message": "Delete Successful!"
            }            
        ```

- ## For requesting to join a single club by club ID

  ```
      PUT club/requestmembership
  ```

  ### request parameters:

  - Body:

    ```
        { 
            "_id": "club id",
            "name": "name of the person requesting to join the club",
            "email": "working email address of the person requesting to join the club"
            
        }

    ```

  ### response format:

        ```
            {
                "message": "Member request submitted successfully"
            }            
        ```

- ## For approving requests of people to join a single club by club ID

  ```
      PUT club/approvemembership
  ```

  ### request parameters:

  - Headers:

  ```

      "token": "bearer {received token of a user with userType=organiser}"


  ```

  - Body:

    ```
        { 
            "_id": "club id",
            "email": "working email address of the person requesting to join the club"
        }

    ```

  ### response format:

        ```
            {
                "message": "Membership request approved!"
            }  If request is approved, the person will receive an email informing them about the approval.           
        ```

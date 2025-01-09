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
- Add packages by ``` npm i ``` or ``` yarn ``` first
- Run it by ``` node index.js ```

# Endpoints

- ## sign up

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

  ### response:

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

- ## sign in

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

  ### response:

        ```
            {
                "message": "Log In Successful!",
                "accessToken": ""
            }
        ```

- ## update profile

  ```
      PUT /auth/updateprofile
  ```

  ### request parameters:

  - Headers:

    ```

        "authorization": "bearer {received token}"


    ```

  - Body:

    ```
        {
            "_id": "{received id}",
            username: "",
            email: "",
            phone: "",
            userType: "",
            clubs: "",
            profilePic: "",
        }

    ```

  ### response:

        ```
            {
                "message": "Update Successful!",
                "accessToken": ""
            }
        ```

- ##  reset password initial

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

  ### response:

        ```
            This endpoint does not have any responses. It will send OTP to the provided email which will then be used to verify for later routes.
        ```

- ## reset password final

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

  ### response:

        ```
            {
                "message": "Password reset successfully"
            }
        ```

--------------------------------------------------------------------------------------------

- ## add a new club

  ```
      POST clubs/
  ```

  ### request parameters:

  - Headers:

  ```

      "authorization": "bearer {received token of a user with userType=admin}"


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

  ### response:

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

- ## get all clubs

  ```
      GET clubs/
  ```

  ### request parameters:

  - Body:

    ```
        {
           not required
        }

    ```

  ### response:

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

- ## get club based on club ID

  ```
      GET clubs/:clubID
  ```

  ### request parameters:

  - Body:

    ```
        {
           not required
        }

    ```

  ### response:

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


- ## get club based on manager ID

  ```
      GET manager/club
  ```

  ### request parameters:

  - Headers:

  ```

      "authorization": "bearer {received token of a user with userType=organiser}"


  ```

  - Body:

    ```
        {
           not required
        }

    ```

  ### response:

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

- ## update a single club by club ID

  ```
      PUT clubs/:clubID
  ```

  ### request parameters:

  - Headers:

  ```

      "authorization": "bearer {received token of a user with userType=organiser}"


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

  ### response:

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
      DELETE clubs/:clubID
  ```

  ### request parameters:

  - Headers:

  ```

      "authorization": "bearer {received token of a user with userType=organiser}"


  ```

  - Body:

    ```
        { 
            "_id": "club id"
            
        }

    ```

  ### response:

        ```
            {
                "message": "Delete Successful!"
            }            
        ```

- ## request to join a single club by club ID

  ```
      POST clubs/requestmembership/:clubID
  ```

  ### request parameters:

  - Body:

    ```
        { 
            "name": "name of the person requesting to join the club",
            "email": "working email address of the person requesting to join the club"
            
        }

    ```

  ### response:

        ```
            {
                "message": "Member request submitted successfully"
            }            
        ```

- ## approve membership requests of people to join a single club by club ID

  ```
      PUT managers/club/approvemembership/:clubID
  ```

  ### request parameters:

  - Headers:

  ```

      "authorization": "bearer {received token of a user with userType=organiser}"


  ```

  - Body:

    ```
        { 
            "_id": "club id",
            "email": "working email address of the person requesting to join the club"
        }

    ```

  ### response:

        ```
            {
                "message": "Membership request approved!"
            }            
        ```
        If request is approved, the person will receive an email informing them about the approval. 

---------------------------------------------------------------------------------------------------

- ## add a new event

  ```
      POST managers/club/events/:clubID
  ```

  ### request parameters:

  - Headers:

  ```

      "authorization": "bearer {received token of a user with userType=admin}"


  ```

  - Body:

    ```
        {
            "name": "",
            "category": "",
            "description": "",
            "status": "",

            optional values include the following:

            "date": "{Date}",
            "location": "",
            "attendees": "{array of object in the form of {"name": "", "email": "" }}",
            "logo: "{url of an image file}",

        }

    ```

  ### response:

        ```
            {
                "message": "Event Created Successfully!",
                "savedClub": {
                    "name": "",
                    "category": "",
                    "description": "",
                    "organiser": "",
                    "attendees": [],
                    "status": "",
                    "_id": "6777999c82ea2e360ebde0a2",
                    "createdAt": "2025-01-03T08:02:36.598Z",
                    "updatedAt": "2025-01-03T08:02:36.598Z",
                    "__v": 0
                }
            }  other optional fields will be added if they were included in the request
        ```

- ## request to reserve a ticket to an event event ID

  ```
      POST events/reserve/:eventID
  ```

  ### request parameters:

  - Body:

    ```
        { 
            "name": "name of the person requesting to join the club",
            "email": "working email address of the person requesting to join the club"
            
        }

    ```

  ### response:

        ```
            {
                "message": "Member request submitted successfully"
            }            
        ```

- ## delete a single event by event ID

  ```
      DELETE managers/club/events/:eventID
  ```

  ### request parameters:

  - Headers:

  ```

      "authorization": "bearer {received token of a user with userType=organiser}"


  ```

  - Body:

    ```
        {
            empty

        }

    ```

  ### response:

        ```
            {
                "message": "Delete Successful!"
            }
        ```

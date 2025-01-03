# Preparation

- Make sure to add environments variables with the following format:
  ```
      MONGODB_URL = 'mongodb://127.0.0.1:27017/gojoye' or
      MONGODB_URL = '{your url to the mongodb database}'
      JWTKEY = '{your preferred random strong key}'
      OTP_EMAIL = '{your email used to send OTP to users' emails}'
      OTP_EMAIL_PASSWORD = '{your password (app password) for your email}'
  ```
# Notice:
- Profile pic is sent an address to a cloud file storage, and not the actual picture.

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
      PUT club/new
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
                        "_id of the users"
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

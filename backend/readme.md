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

- ## For getting the security question

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

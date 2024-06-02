# APIRequest.js | Documentation

This readme should help you get started on the API request.

<details>
<summary>POST_SIGNIN</summary>
 <br/>
 
**POST Paramaters:**

 - username
 - password
    
This constant stores the URL used for making POST requests to authenticate users during the sign-in process.

When signing in successfully, the following JSON data is the expected result.

```bash
{
    "is-success": true,         // Indicates whether the sign-in was successful (true/false).
    "user-profile": {
        "id": 1,                 // User's ID in the database, used for transactions.
        "id-number": 12345678,   // Student or faculty ID number. For students, this is required. The format depends on the backend and is displayed as is in the UI.
        "user-type": "student",  // Type of user: "faculty" or "student". Used for routing on faculty and student home pages.
        "first-name": "Bruce",   // User's first name.
        "last-name": "Wayne",    // User's last name.
        "email": "batman@dc.com" // User's email address.
    },
    "message": null              // Expected to be null when sign-in is successful.
}

```

When signing in failed, the following JSON data is the expected result.

```bash
{
    "is-success": false,
    "user-profile": null,           // Expected to be null when sign-in is unsuccessful.
    "message": "The error message"  // The error message. Please ensure simplicity and clarity.
}

```

</details>
<details>
<summary>POST_REGISTRATION</summary>
This constant stores the URL used for making POST requests to register a user account.

When registration is successfull, the following JSON data is the expected result. The expected result is similar when signing in.

```bash
{
    "is-success": true,         // Indicates whether the sign-in was successful (true/false).
    "user-profile": {
        "id": 1,                 // User's ID in the database, used for transactions.
        "id-number": 12345678,   // Student or faculty ID number. For students, this is required. The format depends on the backend and is displayed as is in the UI.
        "user-type": "student",  // Type of user: "faculty" or "student". Used for routing on faculty and student home pages.
        "first-name": "Bruce",   // User's first name.
        "last-name": "Wayne",    // User's last name.
        "email": "batman@dc.com" // User's email address.
    },
    "message": null              // Expected to be null when sign-in is successful.
}

```

When registration is failed, the following JSON data is the expected result. The expected result is also similar when signing in.

```bash
{
    "is-success": false,
    "user-profile": null,           // Expected to be null when sign-in is unsuccessful.
    "message": "The error message"  // The error message. Please ensure simplicity and clarity.
}

```

</details>

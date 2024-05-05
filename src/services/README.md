# APIRequest.js | Documentation

This readme should help you get started on the API request.

<details>
<summary>POST_SIGNIN</summary>
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

<details>
<summary>POST_UPLOAD_PAPER</summary>
This constant stores the URL used for making POST requests when uploading research paper.

When upload is successfull, the following JSON data is the expected result.

```bash
{
  "is-success": true,
  "message": null,
  "user-paper":
    {
      "id": 13,                      //The ID of the uploaded file saved into the database.
      "image-url": "",               //This is currently on testing, you can leave this empty for now. I am planning to use the first page of the pdf file as the default thumbnail.
      "title": "The title of the paper",
      "author": [                    //This will contain the author/s of the papers. The first item is the user who uploaded the file.
        {
          "user-id": 5,
          "name": "PLOS ONE"
        }
      ],
      "date-published": "2024-05-29", //Make sure to follow this format. This will be automatically convert in the UI part to May 29, 2024
      "rates": 0,                     //Since this is new, the expected value of this should be 0.
      "likes": 0,                     //Since this is new, the expected value of this should be 0.
      "views": 0,                     //Since this is new, the expected value of this should be 0.
      "status": "pending"             //Since this is new and needs approval before making it available in public, the expected value is "pending".
    }
}

```

When upload is successfull, the following JSON data is the expected result.

```bash
{
  "is-success": false,
  "message": "The error message",
  "user-paper": null
}

```

</details>

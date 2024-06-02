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
    "user-profile": null,           // Expected to be null when unsuccessful.
    "message": "The error message"  // The error message. Please ensure simplicity and clarity.
}

```

</details>
<details>
<summary>POST_REGISTRATION</summary>
<br/>
 
**POST Paramaters:**

 - usertype - 'student' or 'faculty'. Take note that this is all in lowercase.
 - idnumber - Optional for faculty, required for student.
 - firstname
 - lastname
 - username
 - password
   
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
    "user-profile": null,           // Expected to be null when unsuccessful.
    "message": "The error message"  // The error message. Please ensure simplicity and clarity.
}

```

</details>
<details>
<summary>POST_UPLOAD_PAPER</summary>
<br/>
 
**POST Paramaters:**

 - userid - The user id of student in database. Take note that this is not the ID Number of the student.
 - title 
 - abstract
 - authors - Take note that this is string separated by commas. Backend should be the one to split and process this data.
 - keywords - Take note that this is string separated by commas. Backend should be the one to split and process this data.
 - pdf - Ignore this for now, do not process this.
   
This constant stores the URL used for making POST requests to upload the paper of student for approval.

When upload is successfull, the following JSON data is the expected result. 

```bash
{
  "is-success": true,
  "message": null, //error message is expected to be null if succesfull.
  "user-paper": {
    "id": 13,
    "image-url": "", // leave this empty for now.
    "title": "The PageRank citation ranking: Bringing order to the web",
    "authors": [
      { "user-id": 5, "name": "PLOS ONE" },
      { "user-id": 5, "name": "PLOS ONE" },
      //other author here...
    ],
    "date-published": "1999-01-29", //The current date in this format.
    "rates": 0,
    "likes": 0,
    "views": 0,
    "status": "pending", //This should be pending as always after uploading the paper.
    "keywords": [
      {"id": 1, "name": "PageRank"},
      {"id": 2, "name": "Google Search Algorithm"},
      //other keywords here...
    ],
    "abstract": "The abstract of this paper."
  }
}

```

When upload is failed, the following JSON data is the expected result. 

```bash
{
    "is-success": false,
    "user-paper": null,           // Expected to be null when unsuccessful.
    "message": "The error message"  // The error message. Please ensure simplicity and clarity.
}

```

</details>

<details>
<summary>POST_UPDATE_PAPER</summary>
<br/>
 
**POST Paramaters:**

 - paperid - The id of the paper in database.
 - title 
 - abstract
 - authors - Take note that this is string separated by commas. Backend should be the one to split and process this data.
 - keywords - Take note that this is string separated by commas. Backend should be the one to split and process this data.
   
This constant stores the URL used for making POST requests to update the content of the paper of student.

When update is successfull, the following JSON data is the expected result.  Note that the result is similar to POST_UPLOAD_PAPER.

```bash
{
  "is-success": true,
  "message": null, //error message is expected to be null if succesfull.
  "user-paper": {
    "id": 13,
    "image-url": "", // leave this empty for now.
    "title": "The PageRank citation ranking: Bringing order to the web",
    "authors": [
      { "user-id": 5, "name": "PLOS ONE" },
      { "user-id": 5, "name": "PLOS ONE" },
      //other author here...
    ],
    "date-published": "1999-01-29", 
    "rates": 0,
    "likes": 0,
    "views": 0,
    "status": "pending", 
    "keywords": [
      {"id": 1, "name": "PageRank"},
      {"id": 2, "name": "Google Search Algorithm"},
      //other keywords here...
    ],
    "abstract": "The abstract of this paper."
  }
}

```

When update is failed, the following JSON data is the expected result. Note that the result is similar to POST_UPLOAD_PAPER.

```bash
{
    "is-success": false,
    "user-paper": null,           // Expected to be null when unsuccessful.
    "message": "The error message"  // The error message. Please ensure simplicity and clarity.
}

```

</details>

<details>
<summary>POST_DELETE_PAPER</summary>
<br/>
 
**POST Paramaters:**

 - paperid - The id of the paper in database.
   
This constant stores the URL used for making POST requests to delete the paper of student.

When delete is successfull, the following JSON data is the expected result. 

```bash
{
    "is-success": true,
    "message": null //message is expected to be null on success.
}

```

When deleting paper failed, the following JSON data is the expected result. 

```bash
{
    "is-success": false,
    "message": "The error message"  // The error message. Please ensure simplicity and clarity.
}

```

</details>

<details>
<summary>POST_UPDATE_PAPER_STATUS</summary>
<br/>
 
**POST Paramaters:**

 - paperid - The id of the paper in database.
 - status - The status of the paper ('pending', 'approved', 'declined').
   
This constant stores the URL used for making POST requests to update the status of the paper of student.

When update of status is successfull, the following JSON data is the expected result. 

```bash
{
    "is-success": true,
    "message": null //message is expected to be null on success.
}

```

When updating the status of paper failed, the following JSON data is the expected result. 

```bash
{
    "is-success": false,
    "message": "The error message"  // The error message. Please ensure simplicity and clarity.
}

```

</details>

<details>
<summary>GET_STUDENT_PAPERS</summary>
<br/>
 
**POST Paramaters:**

 - userid - The id of the user in database.
   
This constant stores the URL used for making POST requests to retrieve all the paper of specific student.

When fetching is successfull, the following JSON data is the expected result. 

```bash
{
  "is-success": true,
  "message": null,
  "user-papers": [
    {
      "id": 1,
      "image-url": "", //leave this empty for now.
      "title": "Public Availability of Published Research Data in High-Impact Journals",
      "authors": [
        { "user-id": 1, "name": "Alawi A. Alsheikh-Ali" },
        { "user-id": 2, "name": "Waqas Qureshi" },
        //other authors...
      ],
      "date-published": "2011-09-07",
      "rates": 4.5,
      "likes": 200,
      "views": 1111,
      "status": "approved",
      "keywords": [
        {"id": 1, "name": "Research Data"},
        //other keywords...
      ],
      "abstract": "This abstract of this paper"
    },
    {
      "id": 2,
      "image-url": "", //leave this empty for now.
      "title": "Data Availability",
      "authors": [
        { "user-id": 5, "name": "PLOS ONE" }
        //other authors...
      ],
      "date-published": "2021-08-04",
      "rates": 4.7,
      "likes": 150,
      "views": 3400,
      "status": "approved",
      "keywords": [
        {"id": 6, "name": "Data Availability"},
        {"id": 7, "name": "Open Data"},
        //other keywords...
      ],
      "abstract": "The abstract of this paper"
    }
    //other papers here...
  ]
}

```

When fetching failed, the following JSON data is the expected result. 

```bash
{
    "is-success": false,
    "user-papers": null,             // Expected to be null when unsuccessful.
    "message": "The error message"  // The error message. Please ensure simplicity and clarity.
}

```

</details>

<details>
<summary>GET_PAPERS</summary>
<br/>
 
**POST Paramaters:**

 - quantity - The quantity of papers to be fetch.
 - sortby - Not sure how to utilize this for now. Sort the result into the latest uppload based on date for now. 
 - status - The status of papers to be retrieve ('pending', 'approved', 'declined')
   
This constant stores the URL used for making POST requests to retrieve papers based on the number of quantity and its status.

When fetching is successfull, the following JSON data is the expected result. 

```bash
{
  "is-success": true,
  "message": null,
  "user-papers": [
    {
      "id": 1,
      "image-url": "", //leave this empty for now.
      "title": "Public Availability of Published Research Data in High-Impact Journals",
      "authors": [
        { "user-id": 1, "name": "Alawi A. Alsheikh-Ali" },
        { "user-id": 2, "name": "Waqas Qureshi" },
        //other authors...
      ],
      "date-published": "2011-09-07",
      "rates": 4.5,
      "likes": 200,
      "views": 1111,
      "status": "approved",
      "keywords": [
        {"id": 1, "name": "Research Data"},
        //other keywords...
      ],
      "abstract": "This abstract of this paper"
    },
    {
      "id": 2,
      "image-url": "", //leave this empty for now.
      "title": "Data Availability",
      "authors": [
        { "user-id": 5, "name": "PLOS ONE" }
        //other authors...
      ],
      "date-published": "2021-08-04",
      "rates": 4.7,
      "likes": 150,
      "views": 3400,
      "status": "approved",
      "keywords": [
        {"id": 6, "name": "Data Availability"},
        {"id": 7, "name": "Open Data"},
        //other keywords...
      ],
      "abstract": "The abstract of this paper"
    }
    //other papers here...
  ]
}

```

When fetching failed, the following JSON data is the expected result. 

```bash
{
    "is-success": false,
    "user-papers": null,             // Expected to be null when unsuccessful.
    "message": "The error message"  // The error message. Please ensure simplicity and clarity.
}

```

</details>

<details>
<summary>SEARCH_PAPERS</summary>
<br/>
 
**POST Paramaters:**

 - query - The string to search. This could be a title, abstract, keywords, and authors. Backend should look into these four entity.
 - status - The status of papers to be search ('pending', 'approved', 'declined')
 - filter - not sure how to utilize this for now. ignore this for now.
   
This constant stores the URL used for making POST requests to search for papers based on the query and its status.

When fetching is successfull, the following JSON data is the expected result. 

```bash
{
  "is-success": true,
  "message": null,
  "user-papers": [
    {
      "id": 1,
      "image-url": "", //leave this empty for now.
      "title": "Public Availability of Published Research Data in High-Impact Journals",
      "authors": [
        { "user-id": 1, "name": "Alawi A. Alsheikh-Ali" },
        { "user-id": 2, "name": "Waqas Qureshi" },
        //other authors...
      ],
      "date-published": "2011-09-07",
      "rates": 4.5,
      "likes": 200,
      "views": 1111,
      "status": "approved",
      "keywords": [
        {"id": 1, "name": "Research Data"},
        //other keywords...
      ],
      "abstract": "This abstract of this paper"
    },
    {
      "id": 2,
      "image-url": "", //leave this empty for now.
      "title": "Data Availability",
      "authors": [
        { "user-id": 5, "name": "PLOS ONE" }
        //other authors...
      ],
      "date-published": "2021-08-04",
      "rates": 4.7,
      "likes": 150,
      "views": 3400,
      "status": "approved",
      "keywords": [
        {"id": 6, "name": "Data Availability"},
        {"id": 7, "name": "Open Data"},
        //other keywords...
      ],
      "abstract": "The abstract of this paper"
    }
    //other papers here...
  ]
}

```

When fetching failed, the following JSON data is the expected result. 

```bash
{
    "is-success": false,
    "user-papers": null,             // Expected to be null when unsuccessful.
    "message": "The error message"  // The error message. Please ensure simplicity and clarity.
}

```

</details>


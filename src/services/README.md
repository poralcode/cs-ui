const POST_SIGNIN = "";

When signing in, the following json data is the expected result.

When sign in is succesfull:
{
"is-success": true, //true or false, indicating success or failure upon signi in.
"user-profile": {
"id": 1, //The user id in the database. This will be use in every transaction created by the user.
"id-number": 12345678, //Student or Faculty ID Number. Not sure if faculty has their own ID Number, but for Student this is required. The format of this will depends on the backend. It will display as is in the UI part, no conversion will happen.
"user-type": "student", //The type of the user. As of now, there are only two types which is faculty and student. Make sure the spelling is correct and this needs to be in text since this is used in routing in faculty and student home page.
"first-name": "Bruce", //The first name of user.
"last-name": "Wayne", //The last name of user.
"email": "batman@dc.com" //The email address of the user.
},
"message": null //message is expected to be null when signing in is succesfull.
}

When sign in is failed:

{
"is-success": false,
"user-profile": null, //user-profile is expected to be null when signing in is NOT succesfull.
"message": "The error message" //The error message. Please make sure this message is simple as much as possible, not too long, and clear.
}

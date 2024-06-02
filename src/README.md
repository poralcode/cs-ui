# APIRequest.js | Documentation

This readme should help you get started with the API requests.

<details>
<summary>POST_SIGNIN</summary>
<br/>

### POST Parameters:

- `username`
- `password`

This endpoint is used for authenticating users during the sign-in process.

### Successful Sign-in Response:

```json
{
  "is-success": true,
  "user-profile": {
    "id": 1,
    "id-number": 12345678,
    "user-type": "student",
    "first-name": "Bruce",
    "last-name": "Wayne",
    "email": "batman@dc.com"
  },
  "message": null
}
```

### Failed Sign-in Response:

```json
{
  "is-success": false,
  "user-profile": null,
  "message": "The error message"
}
```

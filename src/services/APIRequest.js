import axios from "axios";

// TEST URL FAILED: https://b6ca97a70efe42f898646035910c5ca4.api.mockbin.io/
// TEST URL SUCCESS: https://c861af947d0340e7af544477a9719f6c.api.mockbin.io/

/* POST REQUEST API URL */
const POST_SIGNIN = "https://c861af947d0340e7af544477a9719f6c.api.mockbin.io/";
const POST_REGISTRATION =
  "https://c861af947d0340e7af544477a9719f6c.api.mockbin.io/";
const POST_UPLOAD_PAPER =
  "https://2fcb0b7920054ed6ab84c7adb4839c84.api.mockbin.io/";

/* GET REQUEST API URL */
const GET_USER_PAPERS =
  "https://45422d29ab7f415585aeb774e146c82d.api.mockbin.io/";
const GET_PAPERS = "https://eed838f12097493db07d58c691032d7c.api.mockbin.io/";

export default {
  signIn: (username, password) =>
    axios.post(`${POST_SIGNIN}`, { username, password }),

  register: (usertype, idnumber, firstname, lastname, username, password) =>
    axios.post(`${POST_REGISTRATION}`, {
      usertype,
      idnumber,
      firstname,
      lastname,
      username,
      password,
    }),

  uploadPaper: (userid, title, abstract, keywords, pdf) =>
    axios.post(`${POST_UPLOAD_PAPER}`, {
      userid,
      title,
      abstract,
      keywords,
      pdf,
    }),

  getUserPapers: (userid) =>
    axios.get(`${GET_USER_PAPERS}`, {
      userid,
    }),

  getPapers: (quantity, sortby, status) =>
    axios.get(`${GET_PAPERS}`, {
      quantity,
      sortby,
      status,
    }),

  /* Add more API calls as needed */
};

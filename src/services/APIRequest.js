import axios from "axios";

/* Use this endpoint to sign in the student or faculty member. This will return the user's profile. */
const POST_SIGNIN = "https://7f0637a9f7694fb3a2633b43a3a8303d.api.mockbin.io/"; //Mockup data for Student type: "https://c861af947d0340e7af544477a9719f6c.api.mockbin.io/";

/* Use this endpoint to register a new student or faculty member. This will return the user's profile. */
const POST_REGISTRATION =
  "https://7f0637a9f7694fb3a2633b43a3a8303d.api.mockbin.io/"; //Mockup data for Student type: "https://c861af947d0340e7af544477a9719f6c.api.mockbin.io/";

/* Use this endpoint to upload student papers. This will return the uploaded paper of student in JSON format. */
const POST_UPLOAD_PAPER =
  "https://14e14ac062a24ccea0a93e9f0e502d2f.api.mockbin.io/";

/* Use this endpoint to update paper. */
const POST_UPDATE_PAPER =
  "https://14e14ac062a24ccea0a93e9f0e502d2f.api.mockbin.io/";

/* Use this endpoint to delete a paper. */
const POST_DELETE_PAPER =
  "https://33650924f37540f1aeaf447f32ac8b23.api.mockbin.io/";

/* Use this endpoint to update the status of paper. */
const POST_UPDATE_PAPER_STATUS =
  "https://8fed41c6337147579aca8c5bee09fe07.api.mockbin.io/";

/* Use this endpoint to fetch all papers of specific student. */
const GET_STUDENT_PAPERS =
  "https://033f49b0d00f4e9a9bc0fb06776c88d8.api.mockbin.io/";

/* Use this endpoint to fetch all papers depending on their status (Pending, Approved, or Declined). */
const GET_PAPERS = "https://e1b93d99ad2949dcaa9151f310e91d9f.api.mockbin.io/";

/* Use this endpoint to search papers. */
const SEARCH_PAPERS =
  "https://e1b93d99ad2949dcaa9151f310e91d9f.api.mockbin.io/";

export default {
  /* Use this function to sign in the student or faculty member. This will return the user's profile.
   * Used on `sign in` page.
   */
  signIn: (username, password) =>
    axios.post(`${POST_SIGNIN}`, { username, password }),

  /* Use this function to register a new student or faculty member. This will return the user's profile.
   * Used on `register` page to register student or faculty.
   */
  register: (usertype, idnumber, firstname, lastname, username, password) =>
    axios.post(`${POST_REGISTRATION}`, {
      usertype,
      idnumber,
      firstname,
      lastname,
      username,
      password,
    }),

  /* Use this function to upload student papers. This will return the uploaded paper of student in JSON format.
   * Used on `student` page to upload papers.
   */
  uploadPaper: (userid, title, abstract, authors, keywords, pdf) =>
    axios.post(`${POST_UPLOAD_PAPER}`, {
      userid, //the user id in the database, not the ID Number.
      title,
      abstract,
      authors,
      keywords,
      pdf,
    }),

  /* Use this function to fetch all papers of specific student.
   * Used on `student` page to display all uploaded papers by the student.
   */
  getStudentPapers: (userid) =>
    axios.get(`${GET_STUDENT_PAPERS}`, {
      userid, //the user id in the database, not the ID Number.
    }),

  /* Use this function to fetch all papers depending on their status (Pending, Approved, or Declined).
   * Used on `browse` page to display available and approved papers.
   */
  getPapers: (quantity, sortby, status) =>
    axios.get(`${GET_PAPERS}`, {
      quantity, //if quantity is 0, meaning "ALL", get all the data.
      sortby, //could be null, default, date-desc, date-asc, etc. Not sure how to utilize this yet. Ignore this for now.
      status, //approved, pending, or declined. This is required.
    }),

  /* Use this function to search papers.
   * Used on `browse` page to search for papers.
   */
  searchPaper: (query, status, filter) =>
    axios.get(`${SEARCH_PAPERS}`, {
      query, //string.
      status, //approved, pending, or declined.
      filter, //ignore the filter for now.
    }),

  /* Use this function to delete a paper.
   * Used on `paper` page to delete paper.
   */
  deletePaper: (paperId) => axios.get(`${POST_DELETE_PAPER}`, { paperId }),

  /* Use this function to update paper.
   * Used on `paper` page to update paper.
   */
  updatePaper: (paperid, title, abstract, authors, keywords) =>
    axios.post(`${POST_UPDATE_PAPER}`, {
      paperid,
      title,
      abstract,
      authors,
      keywords,
    }),

  /* Use this function to update the status of paper to pending, approved, or declined.
   * Used on `paper` page to update the status of a paper.
   */
  updatePaperStatus: (paperId, status) =>
    axios.get(`${POST_UPDATE_PAPER_STATUS}`, { paperId, status }),

  /* Add more API calls as needed */
};

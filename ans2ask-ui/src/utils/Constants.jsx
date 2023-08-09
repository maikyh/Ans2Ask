//url
const url = `http://localhost:3001`;

//Youtube Data Api key
const API_KEY = 'AIzaSyDxpVm_ulyGpjBUXnDT1A0QfLT_bBQU1HI';

//10 minutes
const MAX_TIME = 600000; 

//1 minutes
const MAX_TIME_TO_DELETE = 60000; 

//Max number of characters of question
const MAX_LENGTH = 480;

//Max number of characters of question on search bar
const MAX_LENGTH_SEARCH = 120;

//Subjects
const allSubjects = "All";

//Query on search
const noQuery = 0;

// (<= 100) nothing in localStorage
const nothingInLocalStorage = 100; 

//Vals for search query
const percentNumberOfSameWords = 30;
const percentCosineSim = 600;
const percentQuestionClicks = 10;

export { url, MAX_TIME, MAX_TIME_TO_DELETE, MAX_LENGTH, MAX_LENGTH_SEARCH, allSubjects, noQuery, nothingInLocalStorage, API_KEY, percentNumberOfSameWords, percentCosineSim, percentQuestionClicks };
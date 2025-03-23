import { movieReviews } from "./data.js";
import formatDate from "./utils.js";

let sortDesc = false;

function init() {
  const reviews = movieReviews();
  registerHandlers(reviews);
  paintStatistics(reviews);
  paintReviews(reviews);
}

function paintStatistics(reviews) {
  const reviewsFlatData = reviews.flat();

  const tMoviesId = document.getElementById("tMoviesId");
  const tAvgRatingId = document.getElementById("tAvgRatingId");
  const tReviewsId = document.getElementById("tReviewsId");

  const movies = reviews.length;
  addStat(tMoviesId, movies, "Movies");
  const reviewsCount = reviewsFlatData.length;
  addStat(tReviewsId, reviewsCount, "Reviews");
  const avgRating =
    reviewsFlatData.reduce((acc, cur) => acc + cur.rating, 0) / reviewsCount;
  addStat(tAvgRatingId, avgRating, "Average Rating");
}

function addStat(elem, value, label) {
  const spanEL = document.createElement("span");
  spanEL.classList.add("text-6xl");
  spanEL.innerText = value;
  elem.appendChild(spanEL);

  const pEL = document.createElement("p");
  pEL.classList.add("text-sm");
  pEL.innerText = label;
  elem.appendChild(pEL);
}

function paintReviews(reviews) {
  const reviewsFlatData = reviews.flat();
  const sorted = reviewsFlatData.sort((a, b) => b.on - a.on);
  const movieListEL = document.querySelector("#movieListId ul");
  addMovieReviewData(movieListEL, sorted);
}

function addMovieReviewData(elem, data) {
  data.map((movie) => {
    const liElem = document.createElement("li");
    liElem.classList.add("card", "p-5", "my-5");

    const titleEL = document.createElement("h2");
    titleEL.classList.add("text-xl", "mb-2", "uppercase", "font-bold");
    titleEL.innerText = `${movie.title} - ${movie.rating}`;
    liElem.appendChild(titleEL);

    const contentEL = document.createElement("p");
    contentEL.classList.add("mb-2");
    contentEL.innerText = movie.content;
    liElem.appendChild(contentEL);

    const byEL = document.createElement("p");
    byEL.classList.add("text-blue-600", "text-sm");
    byEL.innerText = `by ${movie.by} on ${formatDate(movie.on)}`;
    liElem.appendChild(byEL);

    elem.appendChild(liElem);
  });
}

function registerHandlers(reviews) {
  const sortBtn = document.getElementById("srtBtnId");
  sortBtn.addEventListener("click", () => sortByReview(reviews));

  const grpBtn = document.getElementById("grpBtnId");
  grpBtn.addEventListener("click", () => groupReviewsByTitle(reviews));
}

function sortByReview(reviews) {
  sortDesc = !sortDesc;
  const reviewsFlatData = reviews.flat();
  let sorted = sortDesc
    ? reviewsFlatData.sort((a, b) => b.rating - a.rating)
    : reviewsFlatData.sort((a, b) => a.rating - b.rating);
  const movieListEL = document.querySelector("#movieListId ul");
  removeAllChildNodes(movieListEL);
  addMovieReviewData(movieListEL, sorted);
}

function groupReviewsByTitle(reviews) {
  const reviewsFlatData = reviews.flat();
  const groupdReviews = Object.groupBy(reviewsFlatData, ({ title }) => title);

  // const titleKeys = Object.keys(groupdReviews);
  const titleKeys = Reflect.ownKeys(groupdReviews);

  const movieListEL = document.querySelector("#movieListId ul");
  removeAllChildNodes(movieListEL);

  titleKeys.forEach((title) => {
    const liElem = document.createElement("li");
    liElem.classList.add("card", "p-5", "my-5");

    const titleEL = document.createElement("h2");
    titleEL.classList.add("text-xl", "uppercase", "mb-2", "font-bold");
    titleEL.innerText = title;
    liElem.appendChild(titleEL);

    const movieReviews = groupdReviews[title];
    movieReviews.forEach((review) => {
      const contentEL = document.createElement("p");
      contentEL.classList.add(
        "my-3",
        "bg-white",
        "border",
        "border-1",
        "border-solid",
        "border-gray-200",
        "p-2"
      );
      const content = `❤ <strong>${review.by}</strong> has given <strong>${review.rating}</strong> rating with a comment:<span class="text-sm block mt-2"><i>❝${review.content}❞</i></span>`;
      contentEL.innerHTML = content;
      liElem.appendChild(contentEL);
    });

    movieListEL.appendChild(liElem);
  });
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

init();

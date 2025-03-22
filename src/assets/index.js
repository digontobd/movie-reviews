import { movieReviews } from "./data.js";
import formatDate from "./dateHelper.js";

function init() {
  const reviews = movieReviews();
  paintStatistics(reviews);
  paintReviews(reviews);
}

function paintStatistics(reviews) {
  const reviewsFlatData = reviews.flat();
  const tMoviesId = document.getElementById("tMoviesId");
  const tAvgRatingId = document.getElementById("tAvgRatingId");
  const tReviewsId = document.getElementById("tReviewsId");

  const movies = reviews.length;
  addStat(tMoviesId, movies);
  const reviewsCount = reviewsFlatData.length;
  addStat(tReviewsId, reviewsCount);
  const avgRating =
    reviewsFlatData.reduce((acc, cur) => acc + cur.rating, 0) / reviewsCount;
  addStat(tAvgRatingId, avgRating);
}

function addStat(elem, value) {
  const spanEL = document.createElement("span");
  spanEL.classList.add("text-6xl");
  spanEL.innerText = value;
  elem.appendChild(spanEL);
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
    liElem.classList.add("card", "p-2", "my-5");

    const titleEL = document.createElement("h2");
    titleEL.classList.add("text-xl", "mb-2");
    titleEL.innerText = `${movie.title} - ${movie.rating}`;
    liElem.appendChild(titleEL);

    const contentEL = document.createElement("p");
    contentEL.innerText = movie.content;
    liElem.appendChild(contentEL);

    const byEL = document.createElement("p");
    byEL.innerText = `by ${movie.by} on ${formatDate(movie.on)}`;
    liElem.appendChild(byEL);

    elem.appendChild(liElem);
  });
}

init();

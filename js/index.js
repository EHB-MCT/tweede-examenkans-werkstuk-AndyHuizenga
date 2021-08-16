"use strict";

data();
class Article {
    constructor(id, title, content, imageURI, likes, datum) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.imageURI = imageURI;
        this.likes = likes;
        this.datum = datum;
    }
}

let articlesArray = [];
let mostLikedButton = document.getElementById("most-liked-button");
let form = document.getElementById("form");
let input = document.getElementById("form-input");

function init() {
    render(articlesArray);

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        searchBar();
    });
    mostLikedButton.addEventListener("click", (e) => {
        e.preventDefault();
        mostLikedSort();
        render(articlesArray);
    });
}

async function data() {
    await fetch("https://thecrew.cc/news/read.php")
        .then((response) => response.json())
        .then((data) => {
            data.news.forEach((article) => {
                articlesArray.push( 
                    new Article(
                        article.UUID,
                        article.title,
                        article.content,
                        article.imageURI,
                        article.likes,
                        article.publicationDate
                    )
                );
            });
            init();
        });
}

function render(data) {
    let articlesContainer = document.getElementById("articles-container");
    let htmlString = "";
    data.forEach((article) => {
        htmlString += `
    <article>
    <div id='title-container'>
      <h2>${article.title}</h2>
      <div id='date-container'>
        <p>${article.datum}</p>
      </div>
    </div>
    <div id='info-container'>
      <div>
        <img src="${article.imageURI}" alt="">
      </div>
      ${article.content}
    </div>
    <div id="heart">
      <p>${article.likes}</p>
      <span class="material-icons">favorite</span>
    </div>
  </article>
      `;
    });
    articlesContainer.innerHTML = htmlString;
}

function searchBar() {
    let searchedKeyword = input.value;
    let newArray = [];
    articlesArray.forEach((article) => {
        if (
            article.title.includes(searchedKeyword) ||
            article.content.includes(searchedKeyword)
        ) {
            newArray.push(article);
        }
    });
    render(newArray);
}

function mostLikedSort() {
    articlesArray.sort((a, b) => {
        return b.likes - a.likes;
    });
}
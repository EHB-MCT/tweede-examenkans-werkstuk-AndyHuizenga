"use strict";
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

data();

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
            render();
        });
}

function render() {
    let articlesContainer = document.getElementById("articles-container");
    let htmlString = "";
    articlesArray.forEach((article) => {
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
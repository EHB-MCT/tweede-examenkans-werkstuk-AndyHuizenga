"use strict";
class Article {
    constructor(id, title, content, imageURL, likes, datum) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.imageURL = imageURL;
        this.likes = likes;
        this.datum = datum;
    }
}

let articlesArray = [];

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
                        article.imageURL,
                        article.likes,
                        article.datum
                    )
                );
            });
            console.log(articlesArray);
        });
}

data();
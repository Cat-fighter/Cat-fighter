"use strict";

function loadCats() {
  const cats = JSON.parse(localStorage.getItem("catList")) || [];
  state.catList = new CatList(cats);
}

function renderCat() {
  loadCats();
  showCats();
}

function showCats() {
  const divCats = document.querySelector(".main-container");

  for (let i in state.catList.cat) {
    let article = document.createElement("article");
    let img = document.createElement("img");
    img.setAttribute("src", state.catList.cat[i].filePath);
    article.appendChild(img);
    let information = document.createElement("p");
    information.textContent = `Name: ${state.catList.cat[i].name}`;
    article.appendChild(information);
    information = document.createElement("p");
    information.textContent = `HP: ${state.catList.cat[i].hp}, DEF: ${state.catList.cat[i].def}, ATT: ${state.catList.cat[i].att}`;
    article.appendChild(information);
    information = document.createElement("p");
    information.textContent = `Class: ${state.catList.cat[i].style}`;
    article.appendChild(information);
    divCats.appendChild(article);
  }
}

renderCat();

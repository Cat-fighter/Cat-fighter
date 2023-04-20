"use strict";

const container = document.getElementById("mainContainer");
container.addEventListener("click", handleRemoveCat);

// we load the cat from the local storage
function loadCats() {
  const cats = JSON.parse(localStorage.getItem("catList")) || [];
  state.catList = new CatList(cats);
}

//function to load and show the cat
function renderCat() {
  loadCats();
  showCats();
}

//function to show the cat
function showCats() {
  //we clear the container to reset the display
  const divCats = document.querySelector(".main-container");
  divCats.innerHTML = "";

  //render of each cat
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
    let button = document.createElement("button");
    button.setAttribute("id", state.catList.cat[i].name);
    button.textContent = "Delete Fighter";
    article.appendChild(button);
    divCats.appendChild(article);
  }
}

//function to remove a cat when we click on a delete button
function handleRemoveCat(event) {
  if (confirm("Are you sure to delete : " + event.target.id + " ?") == true) {
    state.catList.removeCat(event.target.id);
    state.catList.saveToLocalStorage();
    renderCat();
  }
}

//we show all cat at beginning
renderCat();

"use strict";

const selectElement = document.getElementById("catStyle");
const imgStyle = document.getElementById("classCat");

function loadCats() {
  const cats = JSON.parse(localStorage.getItem("catList")) || [];
  state.catList = new CatList(cats);
}

function populateForm() {
  for (let i in state.catStyles) {
    let newStyle = new Option(state.catStyles[i].style);
    selectElement.add(newStyle);
  }
}

function addCatToList() {
  let style = document.getElementById("catStyle");
  let filePath = document.getElementById("classCat");
  let name = document.getElementById("nameCat");
  let att = document.getElementById("attCat");
  let def = document.getElementById("defCat");
  let hp = document.getElementById("hpCat");
  console.log(filePath.src);
  let catTemp = new Cat(style.value, filePath.src, name.value, att.value, def.value, hp.value);
  state.catList.addCat(catTemp);
}
populateForm();
loadCats();

selectElement.addEventListener("change", handleChangeStyle);
const catForm = document.getElementById("newCat");
catForm.addEventListener("submit", handleSubmit);

function handleChangeStyle(event) {
  console.log(selectElement.value);
  for (let i in state.catStyles) {
    if (state.catStyles[i].style === selectElement.value) {
      imgStyle.setAttribute("src", state.catStyles[i].filePath);
    }
  }
}

function handleSubmit(event) {
  event.preventDefault();
  addCatToList();
  state.catList.saveToLocalStorage();
}

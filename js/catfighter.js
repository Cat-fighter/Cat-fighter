"use strict";

const selectFighter1 = document.getElementById("fighter1-select");
const selectFighter2 = document.getElementById("fighter2-select");
const imgStyle = document.getElementById("classCat");

function loadCats() {
  const cats = JSON.parse(localStorage.getItem("catList")) || [];
  state.catList = new CatList(cats);
}

function populateForm() {
  for (let i in state.catList.cat) {
    let newFighter1 = new Option(state.catList.cat[i].name);
    let newFighter2 = new Option(state.catList.cat[i].name);
    selectFighter1.add(newFighter1);
    selectFighter2.add(newFighter2);
  }
}

loadCats();
populateForm();

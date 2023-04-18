"use strict";

state.catList = new CatList([]);

function populateForm() {
  const selectElement = document.getElementById("catStyle");
  for (let i in state.catStyles) {
    let newStyle = new Option(state.catStyles[i].style);
    selectElement.add(newStyle);
  }
}

populateForm();

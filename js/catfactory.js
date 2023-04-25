"use strict";

const selectElement = document.getElementById("catStyle");
const imgStyle = document.getElementById("classCat");
const catForm = document.getElementById("newCat");
let sliderAtt = document.getElementById("attRange");
let outputAtt = document.getElementById("attValue");
let sliderDef = document.getElementById("defRange");
let outputDef = document.getElementById("defValue");
let sliderHp = document.getElementById("hpRange");
let outputHp = document.getElementById("hpValue");
let pointLeft = document.getElementById("pointsLeft");

let totalStat;

//function to load cats from localdata
function loadCats() {
  const cats = JSON.parse(localStorage.getItem("catList")) || [];
  state.catList = new CatList(cats);
}
//populate dropdown menu
function populateForm() {
  for (let i in state.catStyles) {
    let newStyle = new Option(state.catStyles[i].style);
    selectElement.add(newStyle);
  }
}
//add Cat to the list reading informations on the form
function addCatToList() {
  let style = selectElement.value;
  let filePath = imgStyle.src;
  let name = document.getElementById("nameCat").value;
  let att = sliderAtt.value;
  let def = sliderDef.value;
  let hp = sliderHp.value;
  let catTemp = new Cat(style, filePath, name, att, def, hp);
  state.catList.addCat(catTemp);
}
//render the slider and update the totalstat value when slider change value
function renderSlider() {
  outputAtt.innerHTML = sliderAtt.value;
  outputDef.innerHTML = sliderDef.value;
  outputHp.innerHTML = sliderHp.value;
  totalStat = parseInt(sliderAtt.value) + parseInt(sliderDef.value) + parseInt(sliderHp.value);
  pointLeft.innerHTML = 100 - totalStat;

  sliderAtt.oninput = function () {
    outputAtt.innerHTML = this.value;
    totalStat = parseInt(sliderAtt.value) + parseInt(sliderDef.value) + parseInt(sliderHp.value);
    pointLeft.innerHTML = 100 - totalStat;
  };
  sliderDef.oninput = function () {
    outputDef.innerHTML = this.value;
    totalStat = parseInt(sliderAtt.value) + parseInt(sliderDef.value) + parseInt(sliderHp.value);
    pointLeft.innerHTML = 100 - totalStat;
  };
  sliderHp.oninput = function () {
    outputHp.innerHTML = this.value;
    totalStat = parseInt(sliderAtt.value) + parseInt(sliderDef.value) + parseInt(sliderHp.value);
    pointLeft.innerHTML = 100 - totalStat;
  };
}
//style change selector listener to update img
function handleChangeStyle(event) {
  console.log(selectElement.value);
  for (let i in state.catStyles) {
    if (state.catStyles[i].style === selectElement.value) {
      imgStyle.setAttribute("src", state.catStyles[i].filePath);
    }
  }
}
//submit listener
function handleSubmit(event) {
  event.preventDefault();

  let name = document.getElementById("nameCat");
  let alreadyTaken = false;
  //check if a name is entered
  if (name.value === "") {
    confirm("please enter a name !");
  } else {
    //check the name is not already taken
    for (let i in state.catList.cat) {
      if (state.catList.cat[i].name === name.value) {
        confirm("This fighter name already exist, please choose another one !");
        alreadyTaken = true;
      }
    }
    if (!alreadyTaken) {
      //check if total stat not > 100
      if (totalStat > 100) {
        confirm("Total Stats can't be superior to 100 !");
      } else {
        addCatToList();
        state.catList.saveToLocalStorage();
        confirm("Fighter added to the list !");
      }
    }
  }
}

selectElement.addEventListener("change", handleChangeStyle);
catForm.addEventListener("submit", handleSubmit);

populateForm();
loadCats();
renderSlider();

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
  let att = sliderAtt.value;
  let def = sliderDef.value;
  let hp = sliderHp.value;
  console.log(filePath.src);
  let catTemp = new Cat(style.value, filePath.src, name.value, att, def, hp);
  state.catList.addCat(catTemp);
}
populateForm();
loadCats();

selectElement.addEventListener("change", handleChangeStyle);
catForm.addEventListener("submit", handleSubmit);

outputAtt.innerHTML = sliderAtt.value;
outputDef.innerHTML = sliderDef.value;
outputHp.innerHTML = sliderHp.value;
let totalStat = parseInt(sliderAtt.value) + parseInt(sliderAtt.value) + parseInt(sliderAtt.value);
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

  let name = document.getElementById("nameCat");
  let alreadyTaken = false;

  if (name.value === "") {
    confirm("please enter a name !");
  } else {
    for (let i in state.catList.cat) {
      if (state.catList.cat[i].name === name.value) {
        confirm("This fighter name already exist, please choose another one !");
        alreadyTaken = true;
      }
    }
    if (!alreadyTaken) {
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

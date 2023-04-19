"use strict";

//get selector fighter
const selectFighter1 = document.getElementById("fighter1-select");
const selectFighter2 = document.getElementById("fighter2-select");
//get element of image
const imgFighter1 = document.getElementById("fighter1Img");
const imgFighter2 = document.getElementById("fighter2Img");
//hide them at beginning as none is selected
imgFighter1.style.visibility = "hidden";
imgFighter2.style.visibility = "hidden";

var delayRoundMilliseconds = 5000;

//get text element to update the view dependant of the figther pick
//fighter1
const textHpFighter1 = document.getElementById("hpFighter1");
const textAttFighter1 = document.getElementById("attFighter1");
const textDefFighter1 = document.getElementById("defFigther1");

let attFighter1 = 0;
let defFighter1 = 0;
let hpFighter1 = 0;
//fighter2
const textHpFighter2 = document.getElementById("hpFighter2");
const textAttFighter2 = document.getElementById("attFighter2");
const textDefFighter2 = document.getElementById("defFigther2");

let attFighter2 = 0;
let defFighter2 = 0;
let hpFighter2 = 0;

const rumble = document.getElementById("rumble");
const statut = document.getElementById("status");

//load cat list from localstorage
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

selectFighter1.addEventListener("change", handleFighter1Change);
selectFighter2.addEventListener("change", handleFighter2Change);
rumble.addEventListener("click", handleRumble);

function handleFighter1Change(event) {
  imgFighter1.style.visibility = "visible";

  for (let i in state.catList.cat) {
    if (state.catList.cat[i].name === selectFighter1.value) {
      imgFighter1.setAttribute("src", state.catList.cat[i].filePath);
      attFighter1 = state.catList.cat[i].att;
      hpFighter1 = state.catList.cat[i].hp;
      defFighter1 = state.catList.cat[i].def;

      textHpFighter1.innerHTML = hpFighter1;
      textAttFighter1.innerHTML = attFighter1;
      textDefFighter1.innerHTML = defFighter1;
    }
  }
}

function handleFighter2Change(event) {
  imgFighter2.style.visibility = "visible";

  for (let i in state.catList.cat) {
    if (state.catList.cat[i].name === selectFighter2.value) {
      imgFighter2.setAttribute("src", state.catList.cat[i].filePath);
      attFighter2 = state.catList.cat[i].att;
      hpFighter2 = state.catList.cat[i].hp;
      defFighter2 = state.catList.cat[i].def;

      textHpFighter2.innerHTML = hpFighter2;
      textAttFighter2.innerHTML = defFighter2;
      textDefFighter2.innerHTML = attFighter2;
    }
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function handleRumble(event) {
  rumble.removeEventListener("click", handleRumble);

  let fighterStart = getRandomInt(1, 2);
  statut.innerHTML = "Fighter " + fighterStart + " is starting this fight !";

  if (fighterStart === 1) {
    while (hpFighter1 > 0 || hpFighter2 > 0) {
      await sleep(1000);
      roundFighter1();
      if (hpFighter2 == 0) {
        statut.innerHTML = "Fighter 1 WIN !";
        statut.style.color = "green";
        break;
      }
      await sleep(1000);
      roundFighter2();
      if (hpFighter1 == 0) {
        statut.innerHTML = "Fighter 2 WIN !";
        statut.style.color = "green";
        break;
      }
    }
  } else {
    while (hpFighter1 > 0 && hpFighter2 > 0) {
      await sleep(500);
      roundFighter2();
      if (hpFighter1 == 0) {
        statut.innerHTML = "Fighter 2 WIN !";
        statut.style.color = "green";
        break;
      }
      await sleep(500);
      roundFighter1();
      if (hpFighter2 == 0) {
        statut.innerHTML = "Fighter 1 WIN !";
        statut.style.color = "green";
        break;
      }
    }
  }
}

function roundFighter1() {
  let damagecalcul = attFighter1 * 0.1 - defFighter2 * 0.02;
  hpFighter2 -= damagecalcul;
  if (hpFighter2 < 0) {
    hpFighter2 = 0;
  }
  textHpFighter2.innerHTML = hpFighter2.toFixed(2);
}

function roundFighter2() {
  let damagecalcul = attFighter2 * 0.1 - defFighter1 * 0.02;
  hpFighter1 -= damagecalcul;
  if (hpFighter1 < 0) {
    hpFighter1 = 0;
  }
  textHpFighter1.innerHTML = hpFighter1.toFixed(2);
}

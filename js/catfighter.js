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

//Get other elements
const reset = document.getElementById("refresh");
reset.style.visibility = "hidden";
const rumble = document.getElementById("rumble");
const statut = document.getElementById("status");

//load cat list from localstorage
function loadCats() {
  const cats = JSON.parse(localStorage.getItem("catList")) || [];
  state.catList = new CatList(cats);
}
//populate dropdown list
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
reset.addEventListener("click", function (event) {
  window.location.reload();
});

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
      textAttFighter2.innerHTML = attFighter2;
      textDefFighter2.innerHTML = defFighter2;
    }
  }
}
//to make pause between round
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
//get random number between min and max included
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function handleRumble(event) {
  rumble.removeEventListener("click", handleRumble);
  //add animation class
  imgFighter1.classList.add("animationFighter1");
  imgFighter2.classList.add("animationFighter2");
  await sleep(2000);
  imgFighter1.classList.remove("animationFighter1");
  imgFighter2.classList.remove("animationFighter2");
  //leave fighter in middle
  imgFighter1.classList.add("posFightFighter1");
  imgFighter2.classList.add("posFightFighter2");

  let fighterStart = getRandomInt(1, 2);
  statut.innerHTML = "Fighter " + fighterStart + " is starting this fight !";

  if (fighterStart === 1) {
    while (hpFighter1 > 0 || hpFighter2 > 0) {
      await sleep(1000);
      roundFighter1();
      await sleep(1000);
      imgFighter2.classList.remove("animationShaking");
      if (hpFighter2 == 0) {
        statut.innerHTML = "Fighter 1 WIN !";
        statut.style.color = "green";
        imgFighter1.classList.remove("posFightFighter1");
        imgFighter2.classList.remove("posFightFighter2");
        imgFighter1.classList.add("winnerFighter1");
        imgFighter1.classList.add("animationWinner");
        break;
      }
      await sleep(1000);
      roundFighter2();
      await sleep(1000);
      imgFighter1.classList.remove("animationShaking");
      if (hpFighter1 == 0) {
        statut.innerHTML = "Fighter 2 WIN !";
        statut.style.color = "green";
        imgFighter1.classList.remove("posFightFighter1");
        imgFighter2.classList.remove("posFightFighter2");
        imgFighter2.classList.add("winnerFighter2");
        imgFighter2.classList.add("animationWinner");
        break;
      }
    }
  } else {
    while (hpFighter1 > 0 && hpFighter2 > 0) {
      await sleep(1000);
      roundFighter2();
      await sleep(1000);
      imgFighter1.classList.remove("animationShaking");
      if (hpFighter1 == 0) {
        statut.innerHTML = "Fighter 2 WIN !";
        statut.style.color = "green";
        imgFighter1.classList.remove("posFightFighter1");
        imgFighter2.classList.remove("posFightFighter2");
        imgFighter2.classList.add("winnerFighter2");
        imgFighter2.classList.add("animationWinner");
        break;
      }
      await sleep(1000);
      roundFighter1();
      await sleep(1000);
      imgFighter2.classList.remove("animationShaking");
      if (hpFighter2 == 0) {
        statut.innerHTML = "Fighter 1 WIN !";
        statut.style.color = "green";
        imgFighter1.classList.remove("posFightFighter1");
        imgFighter2.classList.remove("posFightFighter2");
        imgFighter1.classList.add("winnerFighter1");
        imgFighter1.classList.add("animationWinner");
        break;
      }
    }
  }
  reset.style.visibility = "visible";
}
//round fighter 1
function roundFighter1() {
  imgFighter2.classList.add("animationShaking");
  let damagecalcul = attFighter1 * 0.5 - defFighter2 * 0.02;
  if (damagecalcul < 0) {
    damagecalcul = 0;
  }
  hpFighter2 -= damagecalcul;
  if (hpFighter2 < 0) {
    hpFighter2 = 0;
  }
  textHpFighter2.innerHTML = hpFighter2.toFixed(2);
}
//round fighter 2
function roundFighter2() {
  imgFighter1.classList.add("animationShaking");
  let damagecalcul = attFighter2 * 0.5 - defFighter1 * 0.02;
  if (damagecalcul < 0) {
    damagecalcul = 0;
  }
  hpFighter1 -= damagecalcul;
  if (hpFighter1 < 0) {
    hpFighter1 = 0;
  }
  textHpFighter1.innerHTML = hpFighter1.toFixed(2);
}

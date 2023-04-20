"use strict";

//State keep track of the application state

const state = {
  catStyles: [
    { style: "Miarior", filePath: "../img/cat1.jpg" },
    { style: "Miagicien", filePath: "../img/cat2.jpg" },
    { style: "Miarcher", filePath: "../img/cat3.jpg" },
  ],
  catList: null,
};

//Cat List constructor
const CatList = function (cat) {
  //this.cat is an array of cat
  this.cat = cat;
};

CatList.prototype.addCat = function (Cat) {
  this.cat.push(Cat);
};

CatList.prototype.removeCat = function (catName) {
  for (let i = 0; i < state.catList.cat.length; i++) {
    if (state.catList.cat[i].name === catName) {
      state.catList.cat.splice(i, 1);
    }
  }
};

CatList.prototype.saveToLocalStorage = function () {
  localStorage.setItem("catList", JSON.stringify(state.catList.cat));
};

//Cat constructor
const Cat = function (style, filepath, name, att, def, hp) {
  this.style = style;
  this.filePath = filepath;
  this.att = att;
  this.def = def;
  this.hp = hp;
  this.name = name;
};

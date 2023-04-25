"use strict";

//State keep track of the application state

const state = {
  catStyles: [
    { style: "Miarior", filePath: "../img/Miaror.png" },
    { style: "Miasword", filePath: "../img/Miasword.png" },
    { style: "Miarior King", filePath: "../img/Miaror-King.png" },
    { style: "Miagicien", filePath: "../img/Miagicien.png" },
    { style: "Miarcher", filePath: "../img/Miarcher.png" },
  ],
  catList: null,
};

//Cat List constructor
const CatList = function (cat) {
  //this.cat is an array of cat
  this.cat = cat;
};
//function to add a cat
CatList.prototype.addCat = function (Cat) {
  this.cat.push(Cat);
};
//function to remove a cat
CatList.prototype.removeCat = function (catName) {
  for (let i = 0; i < state.catList.cat.length; i++) {
    if (state.catList.cat[i].name === catName) {
      state.catList.cat.splice(i, 1);
    }
  }
};
//function to save to local storage
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

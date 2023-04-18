"use strict";

//State keep track of the application state

const state = {
  catStyles: [
    { style: "style1", filePath: "../img/cat1.jpg" },
    { style: "style2", filePath: "../img/cat2.jpg" },
    { style: "style3", filePath: "../img/cat3.jpg" },
    { style: "style4", filePath: "../img/cat4.jpg" },
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

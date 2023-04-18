"use strict";

//State keep track of the application state

const state = {
  catStyles: [
    { style: "style1", filePath: "" },
    { style: "style2", filePath: "" },
    { style: "style3", filePath: "" },
    { style: "style4", filePath: "" },
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
  localStorage.setItem("catList", JSON.stringify(state.catList));
  localStorage.setItem("catStyles", JSON.stringify(state.catStyles));
};

//Cat constructor
const Cat = function (style, name, att, def, hp) {
  this.style = style.style;
  this.filePath = style.filePath;
  this.att = att;
  this.def = def;
  this.hp = hp;
};

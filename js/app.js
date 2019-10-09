'use strict';

//global variables
var imageSectionTag = document.getElementById('');
var leftImageTag = document.getElementById('');
var middleImageTag = document.getElementById('');
var rightImageTag = document.getElementById('');
var resetButton = document.getElementsByClassName('');
var totalClicks = 0;

var leftImgOnThePage = null;
var middleImgOnThePage = null;
var rightImgOnThePage = null;


//constructor function
var BusmallImage = function(name, imgURl){
  this.name = name;
  this.imgURl = imgURl;
  this.totalClicks = 0;
  this.timeShown = 0;

  BusmallImage.allimages.push(this);

};

new BusmallImage('bag', './img/bag.jpg');
new BusmallImage('banana', './img/banana.jpg');
new BusmallImage('bathroom', './img/bathroom.jpg');
new BusmallImage('boots', './img/boots.jpg');
new BusmallImage('breakfast', './img/breakfast.jpg');
new BusmallImage('bubblegum', './img/bubblegum.jpg');
new BusmallImage('chair', './img/chair.jpg');
new BusmallImage('cthulhu', './img/cthulhu.jpg');
new BusmallImage('dog-duck', './img/dog-duck.jpg');
new BusmallImage('dragon', './img/dragon.jpg');
new BusmallImage('pen', './img/pen.jpg');
new BusmallImage('pet-sweep', './img/pet-sweep.jpg');
new BusmallImage('scissors', './img/scissors.jpg');
new BusmallImage('shark', './img/shark.jpg');
new BusmallImage('sweep', './img/sweep.jpg');
new BusmallImage('tauntaun', './img/tauntaun.jpg');
new BusmallImage('unicorn', './img/unicorn.jpg');
new BusmallImage('usb', './img/usb.jpg');
new BusmallImage('water-can', './img/water-can.jpg');
new BusmallImage('wine-glass', './img/wine-glass.jpg');

BusmallImage.allImages = []; //array to store images

//prototype to keep track of results?

//to create and track image percentage data
//productImage.prototype.getPercentofShown = function(){
//this object's total clicks
//this object's total shown
//format it as a percentage
//return
//}

//helper functions
var renderNewImages = function(leftIndex, middleIndex, rightIndex){ //renders three images on the screen
  leftImageTag.src = BusmallImage.allImages[leftIndex].imgURL;
  middleImageTag.src = BusmallImage.allImages[middleIndex].imgURL;
  rightImageTag.src = BusmallImage.allImages[rightIndex].imgURL;
};

var pickNewImages = function(){
  var leftIndex = Math.ceil(Math.random() * BusmallImage.allImages.length - 1);

  do {
    var rightIndex = Math.ceil(Math.random() * BusmallImage.allImages.length - 1);
    var middleIndex = Math.ceil(Math.random() * BusmallImage.allImages.length - 1);
  } while((rightIndex === leftIndex) || (rightIndex === middleIndex) || (leftIndex === middleIndex));

  leftImgOnThePage = BusmallImage.allImages[leftIndex];
  rightImgOnThePage = BusmallImage.allImages[rightIndex];
  middleImgOnThePage = BusmallImage.allImages[middleIndex];

  renderNewImages(leftIndex, rightIndex, middleIndex);
};

//Event Handler
var handleClickOnImg = function(event){

  if(totalClicks < 25) {
    var thingWeClickedOn = event.target;
    var id = thingWeClickedOn.id;

    if(id === 'left_image' || id === 'right_image'){

      if (id === 'left_image'){
        leftImgOnThePage.clicks ++;
      }
      if (id === 'middle_image'){
        middleImgOnThePage.clicks ++;
      }
      if (id === 'right_image'){
        rightImgOnThePage.clicks ++;
      }

      leftImgOnThePage.timesShown ++;
      middleImgOnThePage.timesShown ++;
      rightImgOnThePage.timesShown ++;

      //pick a new Image - function...
      pickNewImages();
    }
  }
  totalClicks ++;
  if(totalClicks === 25) {
    resetButton.addEventListener('click', handleReset);
    resetButton.className = 'resetEnable';
    imageSectionTag.removeEventListener('click', handleClickOnImg);
    alert('Thank You For Your Participation!');
  }

};

imageSectionTag.addEventListener('click', handleClickOnImg);

function handleReset(){
  totalClicks = 0;
  imageSectionTag.addEventListener('click', handleClickOnImg);
  resetButton.className = 'resetDisable';
}

pickNewImages();




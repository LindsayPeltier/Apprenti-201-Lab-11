'use strict';

//global variables
var imageSectionTag = document.getElementById('products');
var leftImageTag = document.getElementById('leftImageTag');
var middleImageTag = document.getElementById('middleImageTag');
var rightImageTag = document.getElementById('rightImageTag');
var resetButton = document.getElementById('reset');
var totalClicks = 0;

var leftImgOnThePage = null;
var middleImgOnThePage = null;
var rightImgOnThePage = null;


//constructor function
var BusmallImage = function(name, imgURl){
  this.name = name;
  this.imgURL = imgURl;
  this.totalClicks = 0;
  this.timeShown = 0;
  this.previouslyShown = false;
  BusmallImage.allImages.push(this);

};

//array to store images
BusmallImage.allImages = [];

//local storage
function updateLocalStorage() {
  var arrString = JSON.stringify(BusmallImage.allImages);
  localStorage.setItem('data', arrString);
}

function getStoredData() {
  var localData = localStorage.getItem('data');
  var productData = JSON.parse(localData);

  if (productData !== null) {
    BusmallImage.allImages = productData;
  }
}

//renders three images on the screen
var renderNewImages = function(leftIndex, middleIndex, rightIndex){
  leftImageTag.src = BusmallImage.allImages[leftIndex].imgURL;
  middleImageTag.src = BusmallImage.allImages[middleIndex].imgURL;
  rightImageTag.src = BusmallImage.allImages[rightIndex].imgURL;
};

//Randomizer (Reviewed Natalie and Mason's code)
var pickNewImages = function() {
  var leftIndex = Math.ceil(Math.random() * BusmallImage.allImages.length - 1);
  var middleIndex = Math.ceil(Math.random() * BusmallImage.allImages.length - 1);
  var rightIndex = Math.ceil(Math.random() * BusmallImage.allImages.length - 1);  
  while(BusmallImage.allImages[leftIndex].previouslyShown) {
    leftIndex = Math.ceil(Math.random() * BusmallImage.allImages.length - 1);
  }
  while(rightIndex === leftIndex || BusmallImage.allImages[rightIndex].previouslyShown) {
    rightIndex = Math.ceil(Math.random() * BusmallImage.allImages.length - 1);
  }
  while(leftIndex === middleIndex || rightIndex === middleIndex || BusmallImage.allImages[middleIndex].previouslyShown) {
    middleIndex = Math.ceil(Math.random() * BusmallImage.allImages.length - 1);
  }
  for (var i = 0; i < BusmallImage.allImages.length; i++) {
    BusmallImage.allImages[i].previouslyShown = false;
  }

  leftImgOnThePage = BusmallImage.allImages[leftIndex];
  middleImgOnThePage = BusmallImage.allImages[middleIndex];
  rightImgOnThePage = BusmallImage.allImages[rightIndex];

  BusmallImage.allImages[leftIndex].previouslyShown = true;
  BusmallImage.allImages[rightIndex].previouslyShown = true;
  BusmallImage.allImages[middleIndex].previouslyShown = true;

  renderNewImages(leftIndex, middleIndex, rightIndex);
};

//Event Handler
var handleClickOnImg = function(event){
  var mainEl = document.getElementById('wrapper');

  if(totalClicks < 25) {
    var thingWeClickedOn = event.target;
    var id = thingWeClickedOn.id;

    if(id === 'leftImageTag' || id === 'middleImageTag' || id === 'rightImageTag') {

      if (id === 'leftImageTag'){
        leftImgOnThePage.totalClicks ++;
      }
      if (id === 'middleImageTag'){
        middleImgOnThePage.totalClicks ++;
      }
      if (id === 'rightImageTag'){
        rightImgOnThePage.totalClicks ++;
      }

      leftImgOnThePage.timesShown ++;
      middleImgOnThePage.timesShown ++;
      rightImgOnThePage.timesShown ++;

      pickNewImages();
    }
  }
  totalClicks ++;

  if(totalClicks === 25) {
    resetButton.addEventListener('click', handleReset);
    resetButton.className = 'resetEnable';
    imageSectionTag.removeEventListener('click', handleClickOnImg);
    alert('Thank You For Your Participation!');
    //showFinalList();
    updateLocalStorage();
  }

  var showFinalList = function() {
    var results = document.getElementById('results');
    var resultsList = document.createElement('ul');
    results.appendChild(resultsList);

  for(var i = 0; i < BusmallImage.allImages.length ; i++){
    var liEl = document.createElement('li');
    liEl.textContent = `${BusmallImage.allImages[i].name}: ${BusmallImage.allImages[i].totalClicks}`;
    mainEl.appendChild(liEl);
  }
  makeChart();
  updateLocalStorage();
};

imageSectionTag.addEventListener('click', handleClickOnImg);

function handleReset(){
  totalClicks = 0;
  imageSectionTag.addEventListener('click', handleClickOnImg);
  resetButton.className = 'resetDisable';
}

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
new BusmallImage('sweep', './img/sweep.png');
new BusmallImage('tauntaun', './img/tauntaun.jpg');
new BusmallImage('unicorn', './img/unicorn.jpg');
new BusmallImage('usb', './img/usb.gif');
new BusmallImage('water-can', './img/water-can.jpg');
new BusmallImage('wine-glass', './img/wine-glass.jpg');

pickNewImages();

var genLabels = function(images) {
  var labelsArr = [];
  for (var i = 0; i < images.length; i++){
    labelsArr.push(images[i].product);
  };
  return labelsArr;
};

var genDataClicks = function(images) {
  var dataArr = [];
  for (var i = 0; i < images.length; i++) {
    dataArr.push(images[i].clicks);
  };
  return dataArr
};

var genDataTime = function(images) {
  var dataArr = [];
  for (var i = 0; i < images.length; i++) {
    dataArr.push(images[i].timeshown);
  }
  return dataArr;
}

function makeChart(){
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: genLabels(BusmallImage.allImages),
      datasets: [{
        label: '# of Votes',
        data: genDataClicks(BusmallImage.allImages),
        backgroundColor: [
          'red',
          'red',
          'red',
          'red',
          'red',
          'red',
          'red',
          'red',
          'red',
          'red',
          'red',
          'red',
          'red',
          'red',
          'red',
          'red',
          'red',
          'red',
          'red',
          'red',
        ],
        borderColor: [
          'red',
          'red',
          'red',
          'red',
          'red',
          'red',
          'red',
          'red',
          'red',
          'red',
          'red',
          'red',
          'red',
          'red',
          'red',
          'red',
          'red',
          'red',
          'red',
          'red',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

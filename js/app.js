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

//renders three images on the screen
var renderNewImages = function(leftIndex, middleIndex, rightIndex){
  leftImageTag.src = BusmallImage.allImages[leftIndex].imgURL;
  middleImageTag.src = BusmallImage.allImages[middleIndex].imgURL;
  rightImageTag.src = BusmallImage.allImages[rightIndex].imgURL;
};

//Randomizer
var pickNewImages = function(){
  var leftIndex = Math.ceil(Math.random() * BusmallImage.allImages.length - 1);

  do {
    var rightIndex = Math.ceil(Math.random() * BusmallImage.allImages.length - 1);
    var middleIndex = Math.ceil(Math.random() * BusmallImage.allImages.length - 1);
  } while((rightIndex === leftIndex) || (rightIndex === middleIndex) || (leftIndex === middleIndex));

  leftImgOnThePage = BusmallImage.allImages[leftIndex];
  middleImgOnThePage = BusmallImage.allImages[middleIndex];
  rightImgOnThePage = BusmallImage.allImages[rightIndex];

  renderNewImages(leftIndex, middleIndex, rightIndex);
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

//chart
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
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


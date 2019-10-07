'use strict';

//define global variables


//create constructor function
var BusmallImage = function(name, imgURl){
  this.name = name;
  this.imgURl = imgURl;
  this.totalClicks = 0;
  this.timeShown = 0;

  BusmallImage.allimages.push(this); //Pushes every new image/item into the array below

};

BusmallImage.allImages = []; //stores the images created by the constructor
var productImage = newBusmallImage ( , ); //What is this doing?

//helper functions
var renderNewImages = function(leftIndex, middleIndex, rightIndex){ //to display images on html page
  leftImageTag.src = BusmallImage.allImages[leftIndex]; 
  middleImageTag.src =  BusmallImage.allImages[middleIndex];
  rightImageTag.src = BusmallImage.allImages[rightIndex];
}; 


//Algorithm
  //randomly generate 3 unique images
  //display them side by side in the browser
var pickNewImages = function(){
  //pick a new image...
  //console.log('Pick a New Image');

  var leftIndex = Math.ceil(Math.random()) * (BusmallImage.allImages.length -1);
  ///Randomizes a new image from the array
  do {
    var rightIndex = Math.ceil(Math.random()) * (BusmallImage.allImages.length -1);
  } while (rightIndex === leftIndex); //We don't want to pick the same images, so this will randomize until the images are not the same/ drop out of the loop if they are not the same
//search for a picture until it does not match the midddle picture and then until it does not match the right picture
  leftImgOnThePage = BusmallImage.allImages[leftIndex];
  middleImgOnThePage = BusmallImage.allImages[middleIndex];
  rightImgOnThePage = BusmallImage.allImages[rightIndex]; 

  renderNewImages(leftIndex, middleIndex, rightIndex);
};

//var image1 = newNatureImage('Niclas Moser', '../img/')
//var image2 = newNatureImage('Omar Faruk', '../img/')

console.log(BusmallImage.allImages)[0];
renderNewImages(BusmallImage.allImages[0].imgURL, BusmallImage.allImages[1].imgURL);
//You need the .imgURL to target the url within the entire object that NatureImages.allImages[] refrences


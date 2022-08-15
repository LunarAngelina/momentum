
 //Background slider Beginning

 function getRandomNum(min, max) {
  const subResult = Math.random() * (max - min + 1) + min;
  return Math.floor(subResult);
}
const body = document.querySelector('body');
let bgNumber = getRandomNum(1, 20);

function setBg() {
  let timeOfDay = getTimeOfDay();
  let bgNumbertoString = String(bgNumber);
  if (bgNumbertoString.length === 1) {
    bgNumbertoString = `0${bgNumbertoString}`
    bgNumber = bgNumbertoString;
  }
  let referenseOfPicture = 
  `https://github.com/LunarAngelina/stage1-tasks/blob/assets/images/${timeOfDay}/${bgNumber}.jpg?raw=true`;
  const img = new Image();
  img.src = `${referenseOfPicture}`;
  img.onload = () => {
    body.style.backgroundImage = 
  `url("${referenseOfPicture}")`;
  };
}

setBg();
const sliderNext = document.querySelector('.slide-next');
const sliderPrev = document.querySelector('.slide-prev');
const getSliderNext = () => {
  bgNumber = Number(bgNumber);
  bgNumber += 1; 
  if (bgNumber > 20) {
    bgNumber = 1; 
  }
  setBg();
};

sliderNext.addEventListener('click', getSliderNext);

const getSliderPrev = () => {
  bgNumber -= 1; 
  if (bgNumber < 1) {
    bgNumber = 20; 
  }
  setBg();
};

sliderPrev.addEventListener('click', getSliderPrev);

 //Background slider End

// Setting time and date Beginning 

const time  = document.querySelector('.time');
const  dateDisplay = document.querySelector('.date');
const options = { weekday: 'long', day: 'numeric', 
month: 'long'};

const showDate = () => {
  const date = new Date();
  const currentDate = date.toLocaleDateString(
    'ru-RU', options);
  let currentDate0 = currentDate[0].toUpperCase();
  let currentDateToUpperCase = currentDate.replace(currentDate[0], currentDate0);
  dateDisplay.textContent = currentDateToUpperCase;
};

const showTime = () => {
  const date = new Date();
  const currentTime =  date.toLocaleTimeString();
  time.textContent = currentTime;
  setTimeout(showTime, 1000);
  showDate();
};

showTime();

// Setting time and date End 

// Setting greeting Beginning 
const greeting = document.querySelector('.greeting');

function getTimeOfDay () {
  const date = new Date();
  let hours = date.getHours();
  if (hours < 6){
    return 'night';
  } else if (hours < 12){
    return 'morning';
  } else if (hours < 18){
    return 'afternoon'
  } else {
    return 'evening'
  }
}

function showGreeting() {
  let dayTime = getTimeOfDay();
  let greetingText = `Good ${dayTime}`;
  greeting.textContent = greetingText;
  setTimeout(showGreeting, 10000);
}

showGreeting(); 

// Setting greeting End 

// Local storage Beginning 

function setLocalStorageA() {
  const name = document.querySelector('.name');
  localStorage.setItem('name', name.value); 
}
 window.addEventListener('beforeunload', setLocalStorageA);

 function getLocalStorageA() {
  const name = document.querySelector('.name');
  if (localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');  
  }
 }
 window.addEventListener('load', getLocalStorageA);

 // Local storage End 

// Weather Beginning 

const city = document.querySelector('.city');
const weatherError = document.querySelector('.weather-error');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');

async function getWeather() {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=18ca2e9f8d15ae11935e9465873bf791&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  
  if (response.status < 300) {
    weatherError.textContent = ''
    humidity.textContent = `Влажность ${Math.round(data.main.humidity)}%`
    wind.textContent = `Скорость ветра ${Math.round(data.wind.speed)} м/с`
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    weatherIcon.style.visibility = 'visible'; 
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    setLocalStorage(city);
  } else {
    weatherIcon.style.visibility = 'hidden'; 
    weatherError.textContent = 'Попробуйте ввести город еще раз';
    wind.textContent = '';
    humidity.textContent = '';
    temperature.textContent = '';
    weatherDescription.textContent = '';
  } 
}

city.addEventListener('change', getWeather);

//LocalStorage for weather Beginning

function setLocalStorage(elem) {
  localStorage.setItem(elem.className, elem.value);
}

 function getLocalStorage(elem) {
  if (localStorage.getItem(elem.className)) {
    elem.value = localStorage.getItem(elem.className);  
  }
 }
 function loadCity () {
  getLocalStorage(city);
  if (!city.value) {
    city.value = 'Minsk';
  }
  getWeather();
 }

 window.addEventListener('load', loadCity);

 //LocalStorage for weather End

 //Quotes Beginning
 
 let quotesArr = [];

 function getRandomIndex(arr){
  let random = Math.random() * arr.length;
  let index = Math.floor(random);
  return(index);
  }

 async function getQuotes () {
  const qouteA = document.querySelector('.quote');
  const quotes = './js/quotes.json';
  const res =  await fetch(quotes);
  quotesArr = await res.json();

  let index = getRandomIndex(quotesArr);
  let singleQuote = quotesArr[index];
  singleQuote.toString = function () {
    return `'${this.text}' \n${this.author}`;
  };
 qouteA.innerText = singleQuote.toString();
 }

 getQuotes ()

 //Quotes End

//Audio Player Beginning
import {playList} from '../js/playList.js'; //import of playlist

//creating progress bar
const progressBar = document.querySelector('.progress-bar');

function updateProgressValue () {
  let song = document.querySelector('.item-active').firstElementChild;
  progressBar.max = song.duration;
  progressBar.value = song.currentTime;
  document.querySelector('.current-time').innerHTML = (formatTime(song.currentTime));
  if (document.querySelector('.duration-time').innerHTML === "NaN:NaN") {
    document.querySelector('.duration-time').innerHTML = "0:00";
  } else {
    document.querySelector('.duration-time').innerHTML = (formatTime(song.duration));
  }
}

function formatTime(seconds) {
  let min = Math.floor((seconds / 60));
  let sec = Math.floor(seconds - (min * 60));
  if (sec < 10) {
    sec = `0${sec}`;
  };
  return `${min}:${sec}`;
}

function changeProgressBar() {
  let song = document.querySelector('.item-active').firstElementChild;
  song.currentTime = progressBar.value;
};



//creating arrays of song data
let titlesOfPlayList = [];
let srcOfPlayList = [];
let durationOfPlayList = [];

function createSeparateArrays () {
  for (let element of playList) {
    titlesOfPlayList.push(element.title);
    srcOfPlayList.push(element.src);
    durationOfPlayList.push(element.duration);
  }
};
createSeparateArrays (); 

//creating and showing list of songs
function newLi(title) {
  let newLi = document.createElement("li");
  newLi.innerText = title;
  newLi.classList.add('play-item');
  return newLi;
}
function newAudio(title) {
  let audio = new Audio(`../assets/sounds/${title}.mp3`);
  return audio;
}

const playListWrap = document.querySelector('.play-list');

function createPlayList () {

  for (let i = 0; i < titlesOfPlayList.length; i++) {
    let title = titlesOfPlayList[i];
    let li = playListWrap.appendChild(newLi(title));
    li.append(newAudio(title));
    li.classList.toggle('songElement' + i);
    li.addEventListener('click', addClassActive.bind(null, li));
    li.addEventListener('click', offPlayIcon);
  }
}
createPlayList ();

//Change playIcon to pauseIcon and back + chanfing classes
const playIcon = document.querySelector('.play');
let isPlay = false;
function offPlayIcon(){
  playIcon.classList.toggle('pause', false)
}
function togglePlayIcon() {
  if(playIcon.classList.contains('pause')) {
    playIcon.classList.toggle('pause');
    isPlay = true;
  } else {
    playIcon.classList.toggle('pause');
    isPlay = false;
  }
}
playIcon.addEventListener('click', togglePlayIcon);

function addClassActive(elem) {
  elem.classList.add('item-active');
  let classes = elem.classList;
  let classWithNumber = classes[1];
  let index = classWithNumber[classWithNumber.length - 1];
  const listofLis = playListWrap.querySelectorAll('.play-item');
   
  for (let i = 0; i < listofLis.length; i ++) {
    let classWithIndex = listofLis[i].classList[1];
    let j = classWithIndex[classWithIndex.length - 1];
    if(j != index) {
      listofLis[i].classList.toggle('item-active', false);
      listofLis[i].firstElementChild.pause();
    }
  }
}

// Implementing Play function

function playPause() {
  let li = document.querySelector('.item-active')
  let audio = li?.firstElementChild;
  if(!audio) {
    let audioLi = document.querySelector('.songElement0');
    audio = audioLi.firstElementChild;
    addClassActive(audioLi);
    setInterval(updateProgressValue, 500);
  }
  
  if (isPlay === false){
    audio.play();
    isPlay = true;
  } else {
    audio.pause();
    isPlay = false;
  }
  audio.addEventListener('ended', playNext);
}
playIcon.addEventListener('click', playPause); 

// Implementing PlayNext and PlayPreviouse function
const playNextButton = document.querySelector('.play-next');
const playPreviousButton = document.querySelector('.play-prev');


function getCurrentSongIndex() {
  let index = '';
  let currentSong = document.querySelector('.item-active');
  if(!currentSong) {
    currentSong = document.querySelector('.songElement0');
    let classOfCurrentSong = currentSong.classList[1];
    index = classOfCurrentSong[classOfCurrentSong.length - 1];
  } else {
    let classOfCurrentSong = currentSong.classList[1];
    index = classOfCurrentSong[classOfCurrentSong.length - 1];
  }
  return index;
}

function getNextSongIndex() {
  let currentIndex = Number( getCurrentSongIndex() );
  let nextIndex = currentIndex + 1;
  if (nextIndex > playList.length - 1) {
    nextIndex = 0;
  } 
  return nextIndex;
}

function getPrevSongIndex() {
  let currentIndex = Number( getCurrentSongIndex() );
  let nextIndex = currentIndex - 1;
  if (nextIndex < 0) {
    nextIndex = playList.length - 1;
  } 
  return nextIndex;
}

function playPrev () {
  if (isPlay) {
    let audio = document.querySelector('.item-active').firstElementChild;
    audio.pause()
    let indexOfPrevSong = getPrevSongIndex();
    let PrevSong = document.querySelector('.songElement' + indexOfPrevSong);
    addClassActive(PrevSong);
    audio = document.querySelector('.item-active').firstElementChild;
    audio.currentTime = 0;
    audio.play();
  } else {
    let elementIsOnPlay = document.querySelector('.item-active');
    if (!elementIsOnPlay){
      let indexOfLustSong = playList.length - 1;
      let songToPlayPrev = document.querySelector('.songElement' + indexOfLustSong);
      addClassActive(songToPlayPrev);
    } else {
      let indexOfPrevSong = getPrevSongIndex();
       let PrevSong = document.querySelector('.songElement' + indexOfPrevSong);
      addClassActive(PrevSong);
    }
  }
}

function playNext () {
  if (isPlay) {
    let audio = document.querySelector('.item-active').firstElementChild;
    audio.pause()
    let indexOfNextSong = getNextSongIndex();
    let nextSong = document.querySelector('.songElement' + indexOfNextSong);
    addClassActive(nextSong);
    audio = document.querySelector('.item-active').firstElementChild;
    audio.currentTime = 0;
    audio.play();
  } else {
    let elementIsOnPlay = document.querySelector('.item-active');
    if (!elementIsOnPlay){
      let songToPlayNext = document.querySelector('.songElement1')
      addClassActive(songToPlayNext);
    } else {
      let indexOfNextSong = getNextSongIndex();
      let nextSong = document.querySelector('.songElement' + indexOfNextSong);
      addClassActive(nextSong);
    }
  }
}
playNextButton.addEventListener('click', playNext);
playPreviousButton.addEventListener('click', playPrev);



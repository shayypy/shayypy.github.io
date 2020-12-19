function toggleFutharkTitleMeaning() {
  var sub = document.getElementById('futhark-subtitle');
  if (sub.innerHTML == '') {sub.innerHTML = '<i>\'shay\' in Elder Futhark</i>'}
  else {sub.innerHTML = ''}
}

function revealEvenSmallerFutharkText() {document.getElementById('futhark-subsubtitle').innerHTML = "<i>it could also mean 'shai' because Elder Futhark has no 'y' character.</i>"} 
function hideEvenSmallerFutharkText() {document.getElementById('futhark-subsubtitle').innerHTML = ""}

function darkMode(enabled) {
  // dark mode (haha unless)
  var wholeDoc = document.getElementById('all-body');
  if (enabled == true) {wholeDoc.classList.add('dark')}
  else {wholeDoc.classList.remove('dark')};

  var boxes = document.getElementsByClassName('box');
  for (var i=0; i < boxes.length; i++) {    
    var thiselement = boxes[i];
    if (enabled == true) {thiselement.classList.add('dark')}
    else {thiselement.classList.remove('dark')}
  };
  
  var a_elems = document.getElementsByTagName('a');
  for (var i=0; i < a_elems.length; i++) {    
    var thiselement = a_elems[i];
    if (enabled == true) {thiselement.classList.add('dark')}
    else {thiselement.classList.remove('dark')}
  };
  
  if (enabled == true) {
    document.getElementById('darkmode-words-box').onclick = function() {darkMode(false)};
    document.getElementById('darkmode-words').innerHTML = '🌞 enable light mode';
  }
  else {
    document.getElementById('darkmode-words-box').onclick = function() {darkMode(true)};
    document.getElementById('darkmode-words').innerHTML = '🌙 enable dark mode';
  }
}
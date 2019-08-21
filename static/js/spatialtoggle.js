slider = document.querySelector('.slider');
var yesToggled = true;

function checkYes(){
  // https://stackoverflow.com/questions/8723152/javascript-toggle-state-function

    if (yesToggled){
        //do this toggle function with false passed in;
        console.log('toggle on state')
        yesToggled = false;
    } else {
        //do this toggle function wih true passed in;
        console.log('toggle off state')
        yesToggled = true;
    }
}

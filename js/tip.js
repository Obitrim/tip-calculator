
let screens = document.getElementsByClassName("screen");

showScreen(0);

/**
 * # displays one screen(wrapper element) at a time
 * # takes index of screen (wrapper element) to display
 * 
 * @param { Number } index 
 */
function showScreen( index ){

    for (let screen of screens){
        screen.style.display = "none";
    }

    screens[ index ].style.display = "block";
}




let tip_calculator = document.getElementById("btn-tip");
let inputs = document.getElementsByTagName('input');
let calculator = document.getElementById("calculator");

let tip = 0;
let split_tip = 0;

/**
 * When tip calculator button is cliked, calculate tip
 */

 tip_calculator.addEventListener("click", function(event){

    event.preventDefault();

    let amount = parseFloat(inputs.amount.value);
    let no_of_persons = parseInt(inputs.no_of_persons.value);

    if (isValid(amount, inputs.amount) && isValid(no_of_persons, inputs.no_of_persons)) {

        if (confirm("Data entered will be lost, do you want to continue ?")) {
            let selected_quality = null;
            let radios = document.getElementById("form-group-service").getElementsByTagName("input");

            // getting rating for services provided
            for (let radio of radios) {

                if (radio.checked) {
                    selected_quality = radio.value;
                    break;
                }
            }

            //calculating tips and split_tips
            tip = getTip(amount, selected_quality);
            split_tip = (tip / no_of_persons).toFixed(2);

            document.getElementById("tip").innerText = split_tip;

            // displaying result screen
            showScreen(1);

            //clearing input fields
            reset(radios);
        }
    }
    
   
 });


 /**
  * #Function validates data in 
  * #the amount and no. of persons fields
  * 
  * @param { Number } value 
  * @param { Object } input
  * 
  * 
  * @returns { Boolean } 
  */

function isValid( value, input ) {

    if (value <= 0 || isNaN(value)) {
        input.focus();
        input.select();

        return false;
    }

    return true;
}



 /**
  * #functon resets form fields
  * 
  * 
  * @param { Object } radios
  * 
  * @returns { undefined };
  */
 function reset( radios ){

    inputs.amount.value = "";
    inputs.no_of_persons.value = "1";
    radios[2].checked = "true";
 }




 /**
  * # calculates tips based on the quality
  * # of service user rates service
  * 
  * @param { Number } amount
  * @param { String } selected_quality
  * 
  * 
  * @returns { Number }
  */
function getTip(amount, selected_quality ){
    
    let calculated_tip = 0;
    switch( selected_quality.toLowerCase() ){

        case 'excellent':
            calculated_tip = 0.20 * amount;
            break;
        case 'good':
            calculated_tip = 0.19 * amount;
            break;
        case 'average':
            calculated_tip = 0.18 * amount;
            break;
        case 'poor':
            calculated_tip = 0.17 * amount;
            break;
        case 'very poor':
            calculated_tip = 0.15 * amount;
            break;
    }

    return calculated_tip;
}


// calculator button
let btn_calc = document.getElementById("btn-to-calculator");

btn_calc.addEventListener('click', function( event ){
    showScreen(0);
});
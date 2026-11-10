//Rishab Kumar
//3196216
//Assignment 04
//Internet Programming 



// Save the URL
 //  the url by adding password and username as query parameters
let color_url = "https://acs2909.lusciousorange.com/colors.php?username=kumar-r77&passcode=St2F7L!b9";

window.addEventListener('DOMContentLoaded', initialize);


function initialize() 
{
    document.getElementById('color_form').addEventListener('submit', processFormSubmission);
    
}

function processFormSubmission(event) 
{
    event.preventDefault(); // prevent the default form submission behavior

     const inputValue = document.getElementById('color_selector').value;
     if(inputValue==="random")
     {
        let xhr=new XMLHttpRequest(); // create a new xhr request object
       

        //adds the url to fetch colors from server
        
        xhr.open("GET", color_url); // open the xhr request
        xhr.send(); // send the xhr request
        xhr.addEventListener('load', processXHRLoad);//so when server returns data, load event listener process it in processXHRLoad function

     }
     else
     {
        const selectElement = document.getElementById('color_selector'); // get the select element
        const selectedOption = selectElement.options[selectElement.selectedIndex]; // get the selected option from the select element
        const color_code = selectedOption.value; // get the color code from the selected option
        const color_name = selectedOption.textContent; // get the color name from the selected option
        createNewSwatchBox(color_code, color_name); // creates a new swatch box
     }

     
}

function processXHRLoad(xhr_load_event) //input is the event object
{
    const xhr = xhr_load_event.target; // get the xhr object from the event
    if (xhr.status === 200) // check if the request was successful (200 MEANS reqiest was successful)
         { 
        const responseData = JSON.parse(xhr.responseText); // parse the JSON response
        const color_code = responseData.code; // get the color code from the response
        const color_name = responseData.name; // get the color name from the response
        addColorToSelect(color_code, color_name); // add the color to the dropdowm
        createNewSwatchBox(color_code, color_name); // creates a new swatch box
        } 
    else 
    {
        console.error('Error fetching color data:', xhr.statusText); // log any errors if the request failed
    }

}

function addColorToSelect(color_code, color_name) 
{
    const selector = document.getElementById('color_selector'); // get the select element

    for(let i = 0; i < selector.options.length; i++)
        {
            if(selector.options[i].value === color_code)
            {
                return; // color already exist, don't add it
            }
        }

	const option = document.createElement('option'); // create a new option element
    option.value = color_code; // set the value of the option to the color code
    option.textContent = color_name; // set the text content of the option to the color name
    selector.appendChild(option); // append the option to the select element
}

function createNewSwatchBox(color_code, color_name)
{
    const swatch=document.createElement('div');//creates a new div element
    swatch.classList.add('swatch'); // add swatch class to the div

    //specifications diffrent for respective swatches are gonna be styled here and the same ones gonna be styled in the css file
    swatch.style.backgroundColor=color_code; // set the background color of the swatch
    swatch.textContent=color_name; // set the text content of the swatch to the color name

    document.getElementById('swatches').appendChild(swatch); // append the swatch to the swatch container
    

    
}

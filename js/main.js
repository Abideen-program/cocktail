let input = document.querySelector('input');
let button = document.querySelector('button');
let img = document.querySelector('img');
let Title = document.querySelector('.text');
let instruction = document.querySelector('.instructions');
let slideShow = document.getElementById('slideshow');
let timer;
let removeDelay;

async function load() {
    try{
        let inputVal = input.value
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputVal}`);
        const data = await response.json();
        createSlideshow(data.drinks)
        input.value ='';
        console.log(data)
    }  catch (e){
        input.value = '';
        alert(`Can't access the data of this drink from the server`)
    }
} 

function inputValueLength(){
    return input.value.length
}

function createSlideshow(images){
    let currentPosition = 0;
    clearInterval(timer);
    clearTimeout(removeDelay);

    if(inputValueLength() > 1) {
        if (images.length > 1) {

            Title.innerHTML = `
            <h2 class="textone">${images[0].strDrink}</h2>
            <h2 class="textone">${images[1].strDrink}</h2>
            `
            slideShow.innerHTML = `
                <img class='slide' src='${images[0].strDrinkThumb}'>
                <img class='slide' src='${images[1].strDrinkThumb}'>
            ` 

            instruction.innerHTML = `
                <p class='instruction'>${images[0].strInstructions}</p>
                <p class='instruction'>${images[1].strInstructions}</p>
            `

            currentPosition += 2;

            if(images.length == 2){
                currentPosition = 0;
            }

            timer = setInterval(nextImage, 6000);

        } else{
            Title.innerHTML = `
            <h2 class="textone">${images[0].strDrink}</h2>
            <h2 class="textone"></h2>
            `

            slideShow.innerHTML = `
                <img class='slide' src='${images[0].strDrinkThumb}'>
                <img class='slide'>
            `
            instruction.innerHTML = `
                <p class='instruction'>${images[0].strInstructions}</p>
                <p class='instruction'></p>
            `
        }

       function nextImage(){
            Title.insertAdjacentHTML('beforeend', `<h2 class="textone">${images[currentPosition].strDrink}</h2>`);

            slideShow.insertAdjacentHTML('beforeend', `<img class='slide' src='${images[currentPosition].strDrinkThumb}'>`);

            instruction.insertAdjacentHTML('beforeend', `<p class='instruction'>${images[currentPosition].strInstructions}</p>`)

            removeDelay = setTimeout( () =>{
                document.querySelector('.textone').remove()
                document.querySelector('.slide').remove();
                document.querySelector('.instruction').remove();
            }, 1000);

            if(currentPosition + 1 >= images.length){
                currentPosition = 0;
            } else{
                currentPosition++;
            }

        }
    }

}

button.addEventListener('click', load);
function addListAfterKeypress(event){
    if(inputValueLength() > 0 && event.keyCode === 13){
        load()
    }
}
input.addEventListener('keypress', addListAfterKeypress)

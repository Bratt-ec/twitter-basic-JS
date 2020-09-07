// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');

let tweets = [];


// Event listeners
eventListeners();

function eventListeners(){
    formulario.addEventListener('submit', addTweet);
    // 
    document.addEventListener('DOMContentLoaded', () => {
    tweets = JSON.parse(localStorage.getItem('tweets')) ||  [];

    showTweets();
    });
}

// Funciones
function addTweet(e){
    e.preventDefault();
    const tweet = document.querySelector('#tweet').value;
    // console.log('Add tweet ' + tweet);
    if(tweet === ''){
        showError('Escriba un tweet por favor');
        return; 
    }

    const tweetObj = {
        id: Date.now(),
        texto : tweet
    }

    // add array de tweets
    tweets = [...tweets, tweetObj];

    // add tweets
    showTweets();
    // reset form
    formulario.reset();

}

// div de error
function showError(mensaje){
    const error = document.createElement('p');
    error.textContent = mensaje;
    error.classList.add('error');
    const contenido =  document.querySelector('#contenido');
    contenido.appendChild(error);

    setTimeout( () => {
        error.remove();
    }, 3000);
}   

// muestra tweets
function showTweets(){
    limpiarHTML();
    if(tweets.length > 0){
        tweets.forEach(tweet => {
            // boton eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X';
            // funcion eliminar
            btnEliminar.onclick = () =>{
                borraTweet(tweet.id);
            }

            const li = document.createElement('li');
            li.innerText = tweet.texto;
            li.appendChild(btnEliminar);

            listaTweets.appendChild(li);
        });
    }
    sincronizarStorage();
}

// 
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}
// 
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

// borrar tweets
function borraTweet(id){
    tweets = tweets.filter( tweet => tweet.id !== id);
    showTweets();
}
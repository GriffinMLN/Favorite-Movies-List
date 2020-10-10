const addMovieModal = document.getElementById('add-modal');
const startAddMovieBtn = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieBtn = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieBtn = cancelAddMovieBtn.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const theMovieList = document.getElementById('movie-list');
const movies = [];

const updateUI = () => {
    if (movies.length == 0) {
        entryTextSection.style.display = 'block';
    } else {
        entryTextSection.style.display = 'none';
    }
};

const deleteMovieHandler = (movieId) => {
    let identifiedMovieId = 0;
        for (const movie of movies){
        if (movie.id === movieId){
            break;
        }
        identifiedMovieId++;
    }
    movies.splice(identifiedMovieId,1);
    theMovieList.children[identifiedMovieId].remove();
    // theMovieList.removeChild(theMovieList.children[identifiedMovieId]);
};

const renderNewMovieEle = (id, title, imageURL, rating) => {
    const newMovieEle = document.createElement('li');
    newMovieEle.className = 'movie-element';
    newMovieEle.innerHTML = `
    <div class='movie-element__image'>
        <img src=${imageURL} alt=${title}>
    </div>
    <div class='movie-element__info'>
    <h2>${title}</h2>
    <p>${rating}/5 stars</p>
    </div>
    `;
    newMovieEle.addEventListener('click', deleteMovieHandler.bind(null, id));
    theMovieList.append(newMovieEle);
}

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
};

const backdropClickHandler = () => {
    toggleMovieModal();
};

const toggleMovieModal = () => {
    addMovieModal.classList.toggle('visible');
    toggleBackdrop();
};

const clearMovieInputs = () => {
    for (const toBeClearedInputs of userInputs){
        toBeClearedInputs.value = '';
    };
};

const cancelAddMovieHandler = () => {
    toggleMovieModal();
    clearMovieInputs();
};


const addMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imageValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if (titleValue.trim() === '' || imageValue.trim() === '' || ratingValue.trim() === '' || +ratingValue < 1 || +ratingValue > 5){
        return alert('Please enter a valid value!');
    };
    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageValue,
        rating: ratingValue
    };
    movies.push(newMovie);
    console.log(movies);
    toggleMovieModal();
    clearMovieInputs();
    updateUI();
    renderNewMovieEle(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
};

startAddMovieBtn.addEventListener('click', toggleMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieBtn.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieBtn.addEventListener('click', addMovieHandler);
const addMovieModal = document.getElementById('add-modal');
const startAddMovieBtn = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieBtn = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieBtn = cancelAddMovieBtn.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const theMovieList = document.getElementById('movie-list');
const deleteMovieModal = document.getElementById('delete-modal');
const movies = [];

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
};

const updateUI = () => {
    if (movies.length == 0) {
        entryTextSection.style.display = 'block';
    } else {
        entryTextSection.style.display = 'none';
    }
};

const closeMovieDeletionModal = () => {
    toggleBackdrop();
    deleteMovieModal.classList.remove('visible');
}

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
    closeMovieDeletionModal();
    updateUI();
    // theMovieList.removeChild(theMovieList.children[identifiedMovieId]);
}

const confirmDeleteMovieHandler = (movieId) => {
    deleteMovieModal.classList.add('visible');
    toggleBackdrop();
    

    const cancelDeletionBtn = deleteMovieModal.querySelector('.btn--passive');
    let confirmDeletionBtn = deleteMovieModal.querySelector('.btn--danger');

    cancelDeletionBtn.removeEventListener('click', closeMovieDeletionModal)
    cancelDeletionBtn.addEventListener('click', () => {
        closeMovieDeletionModal();
    });
    
    confirmDeletionBtn.replaceWith(confirmDeletionBtn.cloneNode(true));
    confirmDeletionBtn = deleteMovieModal.querySelector('.btn--danger');
    confirmDeletionBtn.addEventListener('click', deleteMovieHandler.bind(null, movieId))
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
    newMovieEle.addEventListener('click', confirmDeleteMovieHandler.bind(null, id));
    theMovieList.append(newMovieEle);
}

const backdropClickHandler = () => {
    closeMovieModal();
    closeMovieDeletionModal();
    clearMovieInputs();
};

const closeMovieModal = () => {
    addMovieModal.classList.remove('visible');
}

const showMovieModal = () => {
    addMovieModal.classList.add('visible');
    toggleBackdrop();
};

const clearMovieInputs = () => {
    for (const toBeClearedInputs of userInputs){
        toBeClearedInputs.value = '';
    };
};

const cancelAddMovieHandler = () => {
    closeMovieModal();
    clearMovieInputs();
    toggleBackdrop();
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
    closeMovieModal();
    toggleBackdrop();
    clearMovieInputs();
    updateUI();
    renderNewMovieEle(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
};

startAddMovieBtn.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieBtn.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieBtn.addEventListener('click', addMovieHandler);
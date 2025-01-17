export const fetchSuggestionsByQuery = async (query) =>{
    return await fetch(`/breeds/search?q=${query}`);
}

export const fetchBreedDetailById = async (id) => {
    return await fetch(`/breeds/${id}`);
}

export const fetchImagesById = async (id) => {
    return await fetch(`/breeds/images?q=${id}`);
}
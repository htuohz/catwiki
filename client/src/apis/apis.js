export const fetchSuggestionsByQuery = async (query) =>{
    return await fetch(`/breeds/search?q=${query}`);
}


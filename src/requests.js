const API_KEY ="80c28cb0d587ff44c0e8ff79ca3b69c8";
const baseURL="https://api.themoviedb.org/3"
const requests ={
    
    fetchTopRated:baseURL+'/movie/top_rated?api_key='+API_KEY+'&language=en-US&page=1',
    fetchList:'https://api.themoviedb.org/4/list/7101308?page=1&api_key='+API_KEY,
    fetchListAnime:'https://api.themoviedb.org/4/list/7102518?page=1&api_key='+API_KEY,
    fetchListTvSeries:'https://api.themoviedb.org/4/list/7102519?page=1&api_key='+API_KEY,
    fetchUpcoming:baseURL+'/movie/upcoming?api_key='+API_KEY,
    fetchPopular:baseURL+'/movie/popular?api_key='+API_KEY,
    fetchPopularTv:baseURL+'/tv/popular?api_key='+API_KEY,
    fetchTrending:baseURL+'/trending/all/week?api_key='+API_KEY+'&language=en_US',
    fetchNetflixOriginals:baseURL+'/discover/tv?api_key='+API_KEY+'&with_networks=213',
    fetchAmazonOriginals:baseURL+'/discover/tv?api_key='+API_KEY+'&with_networks=1024',
    fetchDisney:baseURL+'/discover/tv?api_key='+API_KEY+'&with_networks=2739',
    fetchCrunchyroll:baseURL+'/discover/tv?api_key='+API_KEY+'&with_networks=1112',
    fetchTopAnime:baseURL+'/discover/tv?api_key='+API_KEY+'&sort_by=vote_count.desc&with_original_language=ja',
    fetchActionMovies:baseURL+'/discover/movie?api_key='+API_KEY+'&sort_by=vote_count.desc&include_adult=true&with_genres=28',
    fetchComedyMovies:baseURL+'/discover/movie?api_key='+API_KEY+'&sort_by=vote_count.desc&include_adult=true&with_genres=35',
    fetchHorrorMovies:baseURL+'/discover/movie?api_key='+API_KEY+'&sort_by=vote_count.desc&include_adult=true&with_genres=27',
    fetchClassicMovies:baseURL+'/discover/movie?api_key='+API_KEY+'&sort_by=vote_count.desc&include_adult=true&primary_release_date.lte=1980'
}

export default requests;


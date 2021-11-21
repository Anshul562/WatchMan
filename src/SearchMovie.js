import { Link } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import "./css/content.css";
import axios from "axios";
import "./css/Row.css"
import "./css/List.css"
import "./css/search.css"

const base_url = "https://image.tmdb.org/t/p/original/";

function SearchMovie({ match }) {
    // console.log(match)
    const [movie, setSearchMovie] = useState([]);
    const [query, setQuery] = useState([]);
    useEffect(() => {
    const fetchData = async () => {

        const fetchMovie = await axios.get("https://api.themoviedb.org/3/discover/movie?api_key=80c28cb0d587ff44c0e8ff79ca3b69c8&language=en-US&with_genres=" + match.params.id)

        const fetchquery = await axios.get("https://api.themoviedb.org/3/search/multi?api_key=80c28cb0d587ff44c0e8ff79ca3b69c8&language=en-US&query=" + match.params.id)

        axios.all([fetchMovie, fetchquery]).then(axios.spread((...allData) => {

            const searchmovie = allData[0].data.results
            setSearchMovie(searchmovie);
            // console.log(searchmovie);

            const searchquery = allData[1].data.results
            setQuery(searchquery);
            // console.log(searchquery);

        })
        )
    }
   
        fetchData()
    }, [match.params.id])
    
    function truncateAgain(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + ("\u00A0") : str;
    }
    return (
        <>
        <div className="title">
            <h6>Search results for</h6>
            <h2><em>'{(match.params.type==="q")?(match.params.id):(match.params.name)}'</em></h2>
</div>
            <div className="list" style={{ position: 'relative' }}>


                {((match.params.type === "g") ? (movie) : (query)).map((list) => (
                    <Link key={list.id} to={'/content/'+((list?.media_type==="movie") ? "m":"t")+list.id}  target="_blank"><div className="allItems" key={list.id}>
                        <img src={(base_url + list.poster_path)} className="listChild" alt={list.title} />

                        <div className="hover_contents">
                            <h4>{list.title|| list.name || list.original_title || list.original_name }</h4>
                            <h6 style={{ color: '#e4f226' }}><span className="fa fa-star" />{"\u00A0"}{list.vote_average}</h6>
                            <h6>{list.release_date}</h6>
                            <p>{truncateAgain(list.overview, 170)}<span className="aqua" style={{ color: 'aqua' }}>view more...</span></p>
                        </div>
                    </div>
                    </Link>
                ))}
            </div>
        </>
    );
}

export default SearchMovie;
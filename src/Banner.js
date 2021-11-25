import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import "./css/Banner.css"
import requests from "./requests";
import { auth, db } from "./config/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

function Banner({ url }) {
    const [movie, setMovie] = useState([]);
    const [user] = useAuthState(auth);





    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(requests.fetchTrending);

            setMovie(
                request.data.results[
                Math.floor(Math.random() * request.data.results.length)
                ]
            );
        }
        fetchData()
    }, [url]);

    const addToWatchlist = async () => {
        try {
            await db.collection("users")
                .doc(user.email)
                .collection('watchlist')
                .doc(`${movie.id}`)
                .set({ movie})
                .then(function () {
                    console.log('successfully added')
                })
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }

    const base_url = "https://image.tmdb.org/t/p/original/";

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }
        return (
        <>
            {(movie && (
                <div className="banner" style={{
                    backgroundImage: 'url(' + base_url + movie.backdrop_path + ')',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                }}>
                    <div className="banner_contents">
                        <h1 className="banner_title">
                            {movie.title || movie.name}
                        </h1>
                        <div className="banner_buttons">
                        {user ? <button className="banner_button" id="watchlist-btn" onClick={addToWatchlist}>Add to watchlist</button> : ""}
                            <Link key={movie.id} to={'/content/m' + movie?.id}><button className="banner_button">View More</button></Link>
                        </div>
                        <div className="banner_guide">
                            <div className="stars">
                                <span className="fa fa-star"></span>
                                {movie?.vote_average}/10
                            </div>
                            <div className="runtime">
                                From {movie?.vote_count} votes
                            </div>
                            <div className="language">
                                {movie?.release_date}
                            </div>
                        </div>
                        <h3 className="banner_description">{truncate(movie?.overview, 200)}</h3>
                    </div>
                    <div className="banner_fadeBottom" />
                </div>
            )
            )}
        </>
    )
}

export default Banner;


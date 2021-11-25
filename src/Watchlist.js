import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { auth, db } from './config/firebaseConfig'

function Watchlist() {
    const [user] = useAuthState(auth);
    const [list, setList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            db.collection("users")
                .doc(user?.email)
                .collection('watchlist')
                .get()
                .then(querySnapshot => {
                    const documents = querySnapshot.docs.map(doc => doc.data())
                    setList(documents)
                    console.log(list)
                })
        }
        fetchData()
    }, [user?.email])
    const base_url = "https://image.tmdb.org/t/p/";
    function truncateAgain(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + ("\u00A0") : str;
    }
    return (
        <>
                <div className="title">
                    <h6>My Watchlist</h6>
                </div>
                <div className="list" style={{ position: 'relative' }}>


                    {list.map((list) => (
                        <Link key={list.movie.id} to={'/content/' + ((!list?.movie.first_air_date) ? "m" : "t") + list.movie.id} target="_blank"><div className="allItems" key={list.movie.id}>
                            <img src={(base_url +"/w220_and_h330_face"+ list.movie.poster_path)} className="listChild" alt={list.movie.title} />

                            <div className="hover_contents">
                                <h4>{list.movie.title || list.movie.name || list.movie.original_title || list.movie.original_name}</h4>
                                <h6 style={{ color: '#e4f226' }}><span className="fa fa-star" />{"\u00A0"}{list.movie.vote_average}</h6>
                                <h6>{list.movie.release_date}</h6>
                                <p>{truncateAgain(list.movie.overview, 170)}<span className="aqua" style={{ color: 'aqua' }}>view more...</span></p>
                            </div>
                        </div>
                        </Link>
                    ))}
                </div>
        </>

    )
}

export default Watchlist

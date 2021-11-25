import { Link } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion"
import { auth } from "./config/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import Tilt from 'react-tilt'
import "./css/content.css";
import axios from "axios";
import "./css/Banner.css";
import "./css/Row.css"
import { db } from "./config/firebaseConfig";
import altimg from "./media/person_alt.png"

const base_url = "https://www.themoviedb.org/t/p";

function Content({ match }) {
    // const [items,setItems]=useState([]);
    const [movie, setmovie] = useState([]);
    const [networks, setNetworks] = useState([]);
    const [US, setUS] = useState([]);
    const [networkLink, setNetworksLink] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [trailer, setTrailer] = useState([]);
    const [actors, setActor] = useState([]);
    const [crew, setCrew] = useState([]);
    const [similars, setSimilar] = useState([]);
    const [genre, setGenre] = useState([]);
    const [user] = useAuthState(auth);
    const [rating, setRating] = useState([])
    const [watchlist, setWatchlist] = useState()

    // console.log(user)
    useEffect(() => {
        const fetchData = async () => {


            const fetchmovie = axios.get("https://api.themoviedb.org/3/" + (match.params.media === "m" ? "movie" : "tv") + "/" + match.params.id + "?api_key=80c28cb0d587ff44c0e8ff79ca3b69c8&language=en-US")

            const fetchNetworks = axios.get("https://api.themoviedb.org/3/" + (match.params.media === "m" ? "movie" : "tv") + "/" + (match.params.id) + "/watch/providers?api_key=80c28cb0d587ff44c0e8ff79ca3b69c8")

            const fetchPhoto = axios.get("https://api.themoviedb.org/3/" + (match.params.media === "m" ? "movie" : "tv") + "/" + (match.params.id) + "/images?api_key=80c28cb0d587ff44c0e8ff79ca3b69c8")

            const fetchTrailer = axios.get("https://api.themoviedb.org/3/" + (match.params.media === "m" ? "movie" : "tv") + "/" + (match.params.id) + "/videos?api_key=80c28cb0d587ff44c0e8ff79ca3b69c8")

            const fetchActor = axios.get("https://api.themoviedb.org/3/" + (match.params.media === "m" ? "movie" : "tv") + "/" + (match.params.id) + "/credits?api_key=80c28cb0d587ff44c0e8ff79ca3b69c8&language=en-US")

            const fetchSimilar = axios.get("https://api.themoviedb.org/3/" + (match.params.media === "m" ? "movie" : "tv") + "/" + (match.params.id) + "/recommendations?api_key=80c28cb0d587ff44c0e8ff79ca3b69c8&language=en-US&page=1")


            axios.all([fetchmovie, fetchNetworks, fetchPhoto, fetchActor, fetchSimilar, fetchTrailer]).then(axios.spread((...allData) => {
                const allDatamovie = allData[0].data
                const allDataPhoto = allData[2].data.backdrops
                const allDataActor = allData[3].data.cast
                const allDataCrew = allData[3].data.crew
                const allDataSimilar = allData[4].data.results
                const genres = allData[0].data.genres

                let trailer = allData[5].data.results

                trailer.length < 1 ? (trailer = 0) : (trailer = allData[5].data.results[0])

                let networkUSCheck = allData[1]
                const allDataNetworks = allData[1].data.results

                !(JSON.stringify(allDataNetworks).indexOf('US' || 'IN') > -1) ? (networkUSCheck = allData[1].data.results) : ((JSON.stringify(allDataNetworks.US).indexOf('flatrate_and_buy') > -1) ? (networkUSCheck = allDataNetworks.US.flatrate_and_buy) : ((networkUSCheck = allDataNetworks.US.flatrate) || (networkUSCheck = allDataNetworks.US.rent)))
                setUS(networkUSCheck);
                // console.log(networkUSCheck)


                let allDataNetworksLink = allData[1].data;
                (JSON.stringify(allDataNetworks).indexOf('US') > -1) ? (allDataNetworksLink = allData[1].data.results.US) :
                    (allDataNetworksLink = allData[1].data.results)

                setNetworksLink(allDataNetworksLink)
                // console.log(allDataNetworksLink)

                // console.log(allDataItem);
                setmovie(allDatamovie);
                // console.log(allDatamovie);
                setNetworks(allDataNetworks);
                // console.log(allDataNetworks)
                setPhotos(allDataPhoto);
                // console.log(allDataPhoto);
                setActor(allDataActor);
                // console.log(allDataActor);
                setCrew(allDataCrew);
                // console.log(allDataCrew);
                setSimilar(allDataSimilar);
                // console.log(allDataSimilar);
                setGenre(genres)
                setTrailer(trailer)
                // console.log(trailer)
            })
            )
        }



        const allstars = document.querySelectorAll('input')
        if(user){
            allstars.forEach(rate => {
            rate.onclick = () => {
                let starlevel = rate.getAttribute('value')
                allstars.forEach(el => {
                    document.getElementById('submit').style.visibility = 'visible'
                    document.getElementById('prating').innerHTML = starlevel + "/10"
                }
                )
            }
        })
    } else alert('A user account is required to rate')


        fetchData()
    }, [match.params.id, match.params.media])

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "" : str;
    }



    const addRating = async () => {
        try {
            await db.collection("users")
                .doc(user.email)
                .collection('ratings')
                .doc(`${match.params.id}`)
                .set({ id: match.params.id, value: document.getElementById('prating').innerHTML, })
                .then(function () {
                    console.log('successfully added')
                })
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }


    useEffect(() => {
        async function fetchData() {

            const exp = await db.collection("users")
                .doc(user?.email)
                .collection('ratings').get()
            if (!exp?.docs?.empty) {
                try {
                    await db.collection("users").doc(user?.email).collection('ratings').where("id", '==', match.params.id).get()
                        .then(function (querySnapshot) {
                            setRating(querySnapshot.docs[0]?._delegate._document.data.value.mapValue.fields.value)

                        })
                } catch (err) {
                    console.error(err);
                    alert(err.message);
                }
            }
        }
        fetchData()


        const watchlistedOrNot = async () => {
            const exp = await db.collection("users")
                .doc(user?.email)
                .collection('ratings').get()
            if (!exp?.docs?.empty) {
                try {
                    await db.collection("users").doc(user?.email).collection('watchlist').doc(match.params.id).get()
                        .then(function (querySnapshot) {
                            querySnapshot.exists ? setWatchlist(true) : setWatchlist(false)
                            console.log(querySnapshot)
                        })
                } catch (err) {
                    console.error(err);
                }
            }
        }

        watchlistedOrNot()
    }, [match.params.id, user?.email, watchlist])


    const addToWatchlist = async () => {
        try {
            await db.collection("users")
                .doc(user.email)
                .collection('watchlist')
                .doc(`${match.params.id}`)
                .set({ movie })
                .then(function () {
                    setWatchlist(true)
                    console.log('successfully added')
                })
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }

    const removeFromWatchlist = async () => {
        try {
            await db.collection("users")
                .doc(user.email)
                .collection('watchlist')
                .doc(`${match.params.id}`)
                .get()
                .then(querySnapshot => {
                    querySnapshot.ref.delete()
                    console.log('successfully removed')
                    setWatchlist(false)
                })
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }






    var startTime = new Date().getTime();
    var latency = startTime - performance.timing.navigationStart;
    const containerVariants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: { duration: .5 }
        },
        exit: {
            x: '-100vw',
            transition: { ease: 'easeInOut' }
        }
    }


    return (
        <>
            <motion.div className="ContentHome"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit">
                <div className="backdrop" style={{
                    backgroundImage: 'url("https://image.tmdb.org/t/p/original' + movie.backdrop_path + '")'
                }}>
                    <div className="banner_fadeBottomPoster" />
                </div>

                {movie && (<div className="banner_contentsPoster">
                    <Tilt className="Tilt" >
                        <div className="posterOnly">
                            <motion.div className="banner_poster" style={{
                                backgroundImage: 'url(' + base_url + "/w440_and_h660_face" + movie.poster_path + ')',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center center'
                            }}
                                animate={{ y: 0, opacity: 1 }} initial={{ y: 200, opacity: 0 }} transition={{ delay: latency + "ms", type: 'spring', stiffness: 100 }}
                            />
                        </div></Tilt>


                    <motion.div animate={{ x: 0, opacity: 1 }} initial={{ x: 150, opacity: 0 }} transition={{ delay: 0.5 }}>
                        <div className="banner_titlePoster" >{movie.title || movie.name || movie.original_name}{"\u00A0"}{"(" + ((match.params.media === "m") ? truncate(movie.release_date, 5) + ")" : ("First aired on: " + movie.first_air_date + ")"))}</div>
                    </motion.div>
                    <motion.div className="guide" animate={{ x: 0, opacity: 1 }} initial={{ x: 150, opacity: 0 }} transition={{ delay: 0.75 }}>
                        <span className="base_info">{genre.map((genre) => (
                            <Link key={genre.id} to={{ pathname: '/search/g/movie/' + genre.id + "/" + genre.name }}><button className="genreBtn">{genre.name}</button>{"\u00A0"}</Link>
                        ))}
                        </span><br /><br />
                        <i className="fa fa-clock-o" />
                        {"\u00A0"}<span className="base_info">{(match.params.media === "m" ? movie.runtime : movie.episode_run_time) + " min"}</span>{"\u00A0"}
                        <i className="fa fa-star" />
                        <span className="base_info">{"\u00A0"}
                            {movie.vote_average}</span>
                        {user ?(!watchlist ?
                            (<button className="watchlist__btn" onClick={addToWatchlist}>Add to Watchlist</button>)
                            :
                            (<button className="watchlist__btn" onClick={removeFromWatchlist}>Remove from Watchlist</button>)
                        ):''}
                    </motion.div>


                    <motion.div className="field" animate={{ x: 0, opacity: 1 }} initial={{ x: 150, opacity: 0 }} transition={{ delay: 1 }}>

                        <fieldset className="rating" >

                            {user ? <button id="submit" onClick={addRating}>Submit</button> : ""}
                            <input type="radio" id="star5" name="rating" value="10" />
                            <label className="full" htmlFor="star5" title="Awesome"
                                style={{ color: (rating?.stringValue === '10/10') ? '#e9c603' : '#949696' }}></label>

                            <input type="radio" id="star4" name="rating" value="8" />
                            <label className="full" htmlFor="star4" title="Pretty good"
                                style={{ color: (rating?.stringValue === '10/10' || rating?.stringValue === '8/10') ? '#e9c603' : '#949696' }}></label>

                            <input type="radio" id="star3" name="rating" value="6" />
                            <label className="full" htmlFor="star3" title="Meh"
                                style={{ color: (rating?.stringValue === '10/10' || rating?.stringValue === '8/10' || rating?.stringValue === '6/10') ? '#e9c603' : '#949696' }}></label>

                            <input type="radio" id="star2" name="rating" value="4" />
                            <label className="full" htmlFor="star2" title="Kinda bad"
                                style={{ color: (rating?.stringValue === '10/10' || rating?.stringValue === '8/10' || rating?.stringValue === '6/10' || rating?.stringValue === '4/10') ? '#e9c603' : '#949696' }}></label>

                            <input type="radio" id="star1" name="rating" value="2" />
                            <label className="full" htmlFor="star1" title="Sucks big time"
                                style={{ color: (rating?.stringValue === '10/10' || rating?.stringValue === '8/10' || rating?.stringValue === '6/10' || rating?.stringValue === '4/10' || rating?.stringValue === '2/10') ? '#e9c603' : '#949696' }}></label>

                            {"\u00A0"}<p id="prating">Rate</p>

                        </fieldset>

                    </motion.div>

                    <motion.div className="guide" style={{ gridRow: '4', fontSize: '15px' }} animate={{ x: 0, opacity: 1 }} initial={{ x: 150, opacity: 0 }} transition={{ delay: 1.25 }}>
                        {"Released- " + (movie.first_air_date || movie.release_date)}

                    </motion.div>
                    <motion.div className="tagline" animate={{ x: 0, opacity: 1 }} initial={{ x: 150, opacity: 0 }} transition={{ delay: 1.5 }}>
                        <em>{!(movie.tagline === "") ? ("'" + movie.tagline + "'") : ""}</em>
                    </motion.div>

                    <motion.div className="overview" animate={{ x: 0, opacity: 3 }} initial={{ x: 150, opacity: 0 }} transition={{ delay: 1.65 }}>
                        <h4>Synopsis:</h4>{movie.overview}
                    </motion.div>

                    <div className="watch">
                        <motion.div className="watch_networks" animate={{ x: 0, opacity: 1 }} initial={{ x: 150, opacity: 0 }} transition={{ delay: 1.80 }}>
                            Watch on {"\u00A0"}
                            <div className="networks">
                                {!(JSON.stringify(networks).indexOf('US' || 'AU' || 'IN') > -1) ? (
                                    "(TBA)"
                                ) : (US.map((network) => (
                                    <a href={networkLink.link} key={network.provider_id}>
                                        <img key={network.provider_id} height="40px" width="40px" src={"https://image.tmdb.org/t/p/original" + network.logo_path} style={{ margin: '5px' }} alt={network.provider_id} />
                                    </a>
                                )))}</div>
                        </motion.div>
                        <motion.div className="watch_networks trailer" animate={{ x: 0, opacity: 1 }} initial={{ x: 150, opacity: 0 }} transition={{ delay: 2 }}>
                            Trailer {"\u00A0"}
                            <div className="networks">
                                {<a href={"https://www.youtube.com/watch?v=" + (trailer.key)}><div className="trailer_img" style={{ margin: '5px' }} />
                                </a>
                                    || ("TBR")}</div>
                        </motion.div>
                    </div>

                </div>)}

                <div className="screen_wrapper">
                    <div className="screen">
                        <div className="row" style={{ height: 'auto', marginTop: '20px' }}>
                            <p>Photos</p>
                            <div className="row_posters" style={{ height: 'max-content' }} >

                                {photos.map((photo) => (
                                    <a href={"https://image.tmdb.org/t/p/original" + photo.file_path} key={photo.file_path}>
                                        <img onError={event => {
                                            event.target.src = altimg
                                            event.onerror = null
                                        }}
                                            className={'row_posterSecond'}
                                            src={base_url + "/w533_and_h300_bestv2" + photo.file_path} alt={photo.name} />

                                    </a>

                                ))}
                            </div>
                        </div>


                        <br />

                        <div className="row" style={{ height: 'auto', marginTop: '20px' }}>
                            <p>Cast</p>
                            <div className="row_posters"
                            >
                                {actors.map((actor) => (
                                    <Link to={'/person/' + actor?.id} key={actor.credit_id}>
                                        <div className="cast_name"><img onError={event => {
                                            event.target.src = altimg
                                            event.onerror = null
                                        }}
                                            className='row_posterActor'
                                            src={base_url + "/w220_and_h330_face" + actor.profile_path} />

                                            <h6>{actor.character}</h6><br />
                                            <h4>{actor.name}</h4></div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="row" style={{ marginTop: '20px' }}>
                            <p>Crew</p>
                            <div className="row_posters">
                                {crew.map((actor) => (
                                    <Link to={'/person/' + actor?.id} key={actor?.credit_id}>
                                        <div className="cast_name">

                                        <img onError={event => {
                                            event.target.src = altimg
                                            event.onerror = null
                                        }}
                                            className='row_posterActor'
                                            src={base_url + "/w220_and_h330_face" + actor.profile_path} />

                                            <h6>{actor.job}</h6><br />
                                            <h4>{actor.name}</h4></div>
                                    </Link>

                                ))}
                            </div>
                        </div>


                        <div className="similar">
                            <div className="row" style={{ marginTop: '20px' }}>
                                <p>Recommended</p>
                                <div className="row_posters">

                                    {similars.map((similar) => (
                                        <Link to={'/content/' + (match.params.media === "m" ? "m" : "t") + similar?.id}>
                                            <img key={similar.id}
                                                className={'row_posterSecond'}
                                                src={base_url + "/w220_and_h330_face" + similar.poster_path}
                                                alt="#" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div></div>
                <br />
                <br />
                <br />
                <br />
            </motion.div>
        </>
    );
}

export default Content;
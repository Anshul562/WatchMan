import { React, useState, useContext,useEffect} from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import Header from "./Header";
import Row from "./Row"
import requests from './requests.js';
import Banner from './Banner';
import "./css/Banner.css"
import Content from './Content';
import Person from "./Person"
import List from "./List";
import SearchMovie from './SearchMovie';
import ListDetail from "./ListDetail"
import MovieHome from './MovieHome';
import TvHome from './TvHome';
import AnimeHome from './AnimeHome';
import { db } from './firebase';
import { AuthContext } from "./contexts/AuthContext"




function scrollLeft() {
    document.getElementsByClassName('banner_container')[0].scrollLeft += window.innerWidth
}
function scrollRight() {
    document.getElementsByClassName('banner_container')[0].scrollLeft -= window.innerWidth
}

function App() {
    const location = useLocation();


    return (
        <>

            <AnimatePresence>
                <Switch location={location} key={location.key}>
                    <Route exact path='/home' component={Home} />
                    <Route path='/movie-home/' component={MovieHome} />
                    <Route path='/tv-home/' component={TvHome} />
                    <Route path='/anime-home/' component={AnimeHome} />
                    <Route path='/content/:media:id' component={Content} />
                    <Route path='/person/:id' component={Person} />
                    <Route path='/list/:page:id' component={List} />
                    <Route path='/list-detail/:page:id' component={ListDetail} />
                    <Route path='/search/:type/movie/:id/:name' component={SearchMovie} />
                </Switch>
            </AnimatePresence>
        </>
    );
}

function Home() {
    const [name, Setname] = useState("");
    const [age, Setage] = useState("");
    const [course, Setcourse] = useState("");
    const context = useContext(AuthContext)

   
    
    const sub = (e) => {
        e.preventDefault();

        // Add data to the store

        db.collection("user").doc(context.currentUser._delegate.email).collection('docs').add({
            Name: name,
            Age: age,
            CourseEnrolled: course
        })
            .then((docRef) => {
                alert("Data Successfully Submitted");
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }




    const [info, setInfo] = useState([]);

    // Fetch the required data using the get() method
    const Fetchdata = () => {
        db.collection("user").doc(context.currentUser._delegate.email).collection('docs').get().then((querySnapshot) => {
            querySnapshot.forEach(element => {
                var data = element.data();
                setInfo(arr => [...arr, data]);
            });
        })
    }
    // Start the fetch operation as soon as
    // the page loads
    useEffect(() => {
        Fetchdata();
    },[]);







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
            <Header />

            <motion.div className="home"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit">
                <div className="banner_container">
                    <div className="navigation">
                        <button onClick={scrollRight}>
                            <i className="fa fa-chevron-left"></i></button>
                        <button onClick={scrollLeft} style={{ borderRadius: '20px 0 0 20px' }}>
                            <i className="fa fa-chevron-right" ></i>
                        </button>
                    </div>
                    <Banner url={requests.fetchClassicMovies} />
                    <Banner url={requests.fetchActionMovies} />
                    <Banner url={requests.fetchPopular} />
                </div>




                <div>
                    <center>
                        <form style={{ marginTop: "200px" }}
                            onSubmit={(event) => { sub(event) }}>
                            <input type="text" placeholder="your name"
                                onChange={(e) => { Setname(e.target.value) }} />
                            <br /><br />
                            <input type="number" placeholder="your age"
                                onChange={(e) => { Setage(e.target.value) }} />
                            <br /><br />
                            <input type="text" placeholder="Course Enrolled"
                                onChange={(e) => { Setcourse(e.target.value) }} />
                            <br /><br />
                            <button type="submit">Submit</button>
                        </form>
                    </center>
                </div>

                {
                    info.map((data) => (
                        <p key={data.Age}> course={data.CourseEnrolled}
                            name={data.Nane}
                            age={data.Age}
                        </p>
                    ))
                }




                <div className="rowContainer">
                    <Row type="m" title="Trending Now" extTitle="" fetchUrl={requests.fetchTrending} applyWidth={"100%"} slice="20" />
                    <Row type="t" title="Disney +" extTitle="" fetchUrl={requests.fetchDisney} applyWidth={"100%"} slice="20" />
                    <Row type="m" title="Personal Top 100 Movies" extTitle="See all" fetchUrl={requests.fetchList} applyWidth={"400px"} slice="4" cluster />
                    <Row type="t" title="Personal Top Animes'" extTitle="See all" fetchUrl={requests.fetchListAnime} applyWidth={"400px"} slice="4" cluster />
                    <Row type="t" title="Personal Top Tv Series" extTitle="See all" fetchUrl={requests.fetchListTvSeries} applyWidth={"400px"} slice="4" cluster />
                </div>

            </motion.div>
        </>
    )
}

export default App;

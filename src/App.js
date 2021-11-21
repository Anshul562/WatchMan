import React, { useState } from 'react';
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
      <Header />
      <AnimatePresence>
        <Switch location={location} key={location.key}>
          <Route exact path='/' component={Home} />
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
          <Banner url={requests.fetchTrending} />
          <Banner url={requests.fetchTrending} />
          <Banner url={requests.fetchTrending} />
        </div>



        <div className="rowContainer">
          <Row type="m" title="Trending Now" extTitle="" fetchUrl={requests.fetchTrending} applyWidth={"100%"} slice="20" />
          <Row type="t" title="Disney +" extTitle="" fetchUrl={requests.fetchDisney} applyWidth={"100%"} slice="20" />
        </div>

      </motion.div>
    </>
  )
}

export default App;
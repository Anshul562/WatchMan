import "./css/Row.css"
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import "./css/List.css";
import axios from "axios"
import "./css/Person.css"
import "./css/content.css"
const base_url = "https://www.themoviedb.org/t/p";


function List(match) {
    console.log(match)
    const [list, setList] = useState([]);
    const [list2, setList2] = useState([]);
    const [list3, setList3] = useState([]);
    const [list4, setList4] = useState([]);
    const [list5, setList5] = useState([]);
    const [listinfo, setListInfo] = useState([]);
    useEffect(() => {
        function fetchData() {
            const fetchList = axios.get("https://api.themoviedb.org/4/list/" + (match.match.params.id) + "?page=1&api_key=80c28cb0d587ff44c0e8ff79ca3b69c8")

            let fetchList2 = fetchList;
            ((match.match.params.page) >= 2) ? (fetchList2 = axios.get("https://api.themoviedb.org/4/list/" + (match.match.params.id) + "?page=2&api_key=80c28cb0d587ff44c0e8ff79ca3b69c8")) : (fetchList2 = 0)

            let fetchList3 = fetchList;
            ((match.match.params.page) >= 3) ? (fetchList3 = axios.get("https://api.themoviedb.org/4/list/" + (match.match.params.id) + "?page=3&api_key=80c28cb0d587ff44c0e8ff79ca3b69c8")) : (fetchList3 = 0)

            let fetchList4 = fetchList;
            ((match.match.params.page) >= 4) ? (fetchList4 = axios.get("https://api.themoviedb.org/4/list/" + (match.match.params.id) + "?page=4&api_key=80c28cb0d587ff44c0e8ff79ca3b69c8")) : (fetchList4 = 0)

            let fetchList5 = fetchList;
            (match.match.params.page >= 5) ?
                (fetchList5 = axios.get("https://api.themoviedb.org/4/list/" + (match.match.params.id) + "?page=5&api_key=80c28cb0d587ff44c0e8ff79ca3b69c8")) : (fetchList5 = 0)

            axios.all([fetchList, fetchList2, fetchList3, fetchList4, fetchList5]).then(axios.spread((...allData) => {
                const allDataList = allData[0].data.results
                var allDataList2 = 0;
                var allDataList3 = 0;
                var allDataList4 = 0;
                var allDataList5 = 0;

                (match.match.params.page >= 2) ? (allDataList2 = allData[1].data.results) : allDataList2 = 0;
                
                (match.match.params.page >= 3) ? (allDataList3 = allData[2].data.results) : allDataList3 = 0;

                (match.match.params.page >= 4) ? (allDataList4 = allData[3].data.results) : allDataList4 = 0;

                (match.match.params.page >= 5) ? (allDataList5 = allData[4].data.results) : allDataList5 = 0;

                const list = allData[0].data
                setList(allDataList)
                setList2(allDataList2)
                setList3(allDataList3)
                setList4(allDataList4)
                setList5(allDataList5)
                setListInfo(list)
                // console.log(allDataList4)
                // console.log(listinfo)
            }))
        }

        fetchData()
    }, [listinfo, match.match.params.id, match.match.params.page])

    var i = 1;
    var elems = document.getElementsByClassName('rank');
    Array.prototype.forEach.call(elems, function (elem) {
        elem.innerHTML = i;
        i++;
    });

    function truncateAgain(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + ("\u00A0") : str;
    }
    const containerVariants={
        hidden:{
          opacity:0,
        },
        visible:{
          opacity:1,
          transition:{duration:.5}
        },
        exit:{
          opacity:0,
          transition:{ease:'easeInOut'}
        }
      }
    return (
        <>
        <motion.div className="listHome" variants={containerVariants} 
        initial="hidden"
        animate="visible">
            <div className="backdrop" style={{
                backgroundImage: 'url("https://image.tmdb.org/t/p/original'+ listinfo.backdrop_path + '")',
                backgroundSize: 'cover', height: '300px',
                backgroundPosition: 'center center',
            }}>
                <div className="banner_fadeBottomPoster" style={{ height: '300px' }} />
            </div>
            <div className="contents">
                    <motion.h2 animate={{y:0,opacity:1}} initial={{y:150,opacity:0}} transition={{delay:0.25,type:"tween"}}>{listinfo.name}</motion.h2>
                <div className="info">
                    <motion.h6 animate={{y:0,opacity:1}} initial={{y:150,opacity:0}} transition={{delay:0.5,type:"tween"}}><em>{listinfo.description}</em></motion.h6>
                    <div className="viewOptions">
                        <i className="fa fa-th-large" aria-hidden="true" style={{color:'rgb(167, 167, 49)'}}></i>
                        <Link to={"/list-detail/" + match.match.params.page + match.match.params.id + "/detail"}  target="_blank"><i className="fa fa-list" aria-hidden="true" style={{color:'rgb(88, 138, 138)'}}></i></Link>
                    </div></div>
{list &&(
                <motion.div id="list" className="list" animate={{y:0,opacity:1}} initial={{y:150,opacity:0}} transition={{delay:1.25}} variants={containerVariants} exit="exit">
                    {list.map((list) => (
                        <Link key={list.id} to={'/content/' + ((list?.media_type === "movie") ? "m" : "t") + list?.id}  target="_blank">
                            <motion.div className="allItems" key={list.id}>
                            <img src={(base_url+"/w220_and_h330_face" + list.poster_path)} className="listChild" alt={list.title} />

                            <div id="hover" className="hover_contents">
                                <h4>{list.title || list.name||list.original_title}</h4>
                                <h6 style={{ color: '#e4f226' }}><span className="fa fa-star" />{"\u00A0"}{list.vote_average}</h6>
                                <h6>{list.release_date}</h6>
                                <p>{truncateAgain(list.overview, 170)}<span style={{ color: 'aqua' }}>view more...</span></p>
                            </div>
                        </motion.div>
                            <div className="rank"></div>
                        </Link>
                    ))}

                    {(match.match.params.page >= 2) ?
                        list2.map((list) => (
                            <Link  target="_blank" key={list.id} to={'/content/' + ((list?.media_type === "movie") ? "m" : "t") + list?.id}><div className="allItems" key={list.id}>
                                <img src={(base_url +"/w220_and_h330_face"+ list.poster_path)} className="listChild" alt={list.title} />
                                <div id="hover" className="hover_contents">
                                <h4>{list.title || list.name||list.original_title}</h4>
                                    <h6 style={{ color: '#e4f226' }}><span className="fa fa-star" />{"\u00A0"}{list.vote_average}</h6>
                                    <h6>{list.release_date}</h6>
                                    <p>{truncateAgain(list.overview, 170)}<span style={{ color: 'aqua' }}>view more...</span></p>
                                </div>
                            </div>
                                <div className="rank"></div>
                            </Link>
                        )) : ""}
                    {(match.match.params.page >= 3) ? (
                        list3.map((list) => (
                            <Link  target="_blank" key={list.id} to={'/content/' + ((list?.media_type === "movie") ? "m" : "t") + list?.id}><div className="allItems" key={list.id}>
                                <img src={(base_url +"/w220_and_h330_face"+ list.poster_path)} className="listChild" alt={list.title} />
                                <div id="hover" className="hover_contents">
                                <h4>{list.title || list.name||list.original_title}</h4>
                                    <h6 style={{ color: '#e4f226' }}><span className="fa fa-star" />{"\u00A0"}{list.vote_average}</h6>
                                    <h6>{list.release_date}</h6>
                                    <p>{truncateAgain(list.overview, 170)}<span style={{ color: 'aqua' }}>view more...</span></p>
                                </div>
                            </div>
                                <div className="rank"></div>
                            </Link>
                        ))) : ""}
                    {(match.match.params.page >= 4) ? (
                        list4.map((list) => (
                            <Link  target="_blank" key={list.id} to={'/content/' + ((list?.media_type === "movie") ? "m" : "t") + list?.id}><div className="allItems" key={list.id}>
                                <img src={(base_url +"/w220_and_h330_face"+ list.poster_path)} className="listChild" alt={list.title} />
                                <div id="hover" className="hover_contents">
                                <h4>{list.title || list.name||list.original_title}</h4>
                                    <h6 style={{ color: '#e4f226' }}><span className="fa fa-star" />{"\u00A0"}{list.vote_average}</h6>
                                    <h6>{list.release_date}</h6>
                                    <p>{truncateAgain(list.overview, 170)}<span style={{ color: 'aqua' }}>view more...</span></p>
                                </div>
                            </div>
                                <div className="rank"></div>
                            </Link>
                        ))) : ""}

                    {(match.match.params.page >= 5) ? (
                        list5.map((list) => (
                            <Link  target="_blank" key={list.id} to={'/content/' + ((list?.media_type === "movie") ? "m" : "t") + list?.id}><div className="allItems" key={list.id}>
                                <img src={(base_url +"/w220_and_h330_face"+ list.poster_path)} className="listChild" alt={list.title} />
                                <div id="hover" className="hover_contents">
                                <h4>{list.title || list.name||list.original_title}</h4>
                                    <h6 style={{ color: '#e4f226' }}><span className="fa fa-star" />{"\u00A0"}{list.vote_average}</h6>
                                    <h6>{list.release_date}</h6>
                                    <p>{truncateAgain(list.overview, 170)}<span style={{ color: 'aqua' }}>view more...</span></p>
                                </div>
                            </div>
                                <div className="rank"></div>
                            </Link>
                        ))) : ""}
                </motion.div>
            )}</div>
</motion.div>
        </>
    );
}
export default List;

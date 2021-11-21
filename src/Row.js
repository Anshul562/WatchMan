import React, { useState, useEffect } from "react";
import SkeletonElement from "./SkeletonElement";
import {Link} from 'react-router-dom';
import "./css/Row.css";
import axios from "axios";

const base_url = "https://www.themoviedb.org/t/p";


function Row({ title, fetchUrl, extTitle,applyWidth,slice,type }) {

    const [movies, setMovies] = useState(null);
    const [info,setInfo]=useState([]);

    useEffect(() => {

        const fetchData =async() =>{
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            setInfo(request.data.total_pages);
            console.log(request.data.total_pages)
            return request;
        }
        fetchData()
    }, [fetchUrl]);

    // console.log(movies);

    return (

            
        <div className="row" style={{width:applyWidth}}>
            
            <div className="titles" key={title}>
            {
                (extTitle==="")?
                (<h2>{title}</h2>):<p className='smallTitle'>{title}</p>
                }
                <h5><Link to={'/list/'+info+fetchUrl.slice(34,fetchUrl.indexOf('?'))}>{extTitle}</Link></h5>
            </div>
            <div id="el" className={!(slice<20)?"row_posters":"row_posters_clustered"}>
                {(movies &&
                movies.slice(0, slice).map((movie)=>(
                    
                    <Link key={movie?.id} 
                    to={'/content/'+(type)+movie?.id}
                    
                    >
                        

                        <div className="overlay">
                           
                        <div className={!(slice<20)?"row_poster":"row_poster_clustered"}>
                        
                        <img loading="lazy" src={base_url+"/w220_and_h330_face"+movie.poster_path} srcSet={base_url+"/w220_and_h330_face"+movie.poster_path+" 1x,"+base_url+"/w440_and_h660_face"+movie.poster_path+" 2x"} alt={movie.name} style={{borderRadius:'10px  !important'}}/>

                         <div className={!(slice<20)?"overlay_contents":"none"}>
                         {!(slice<20)?(<div><p>{movie.title ||movie.name|| movie.original_title || movie.original_name}</p>
                                <p><span className="fa fa-star"/>{"\u00A0"}{movie.vote_average}</p>
                                <p>{movie.release_date || movie.first_air_date}</p></div>):""}
                                
                            </div></div></div>
                            
                    </Link>)
                ))}
                {!movies && <SkeletonElement type="title"/>}
                {
                (extTitle==="")?
                (<div className='fadeArea'/>):""
                }
        </div></div>
        
    );
}
export default Row;

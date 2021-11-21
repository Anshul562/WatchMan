import {Link} from "react-router-dom"
import React,{useState,useEffect } from 'react';
import {motion} from "framer-motion"
import "./css/content.css";
import axios from "axios";
import "./css/Row.css"
import "./css/Person.css"

const base_url = "https://www.themoviedb.org/t/p";

function Person({match}) {
    const [personCast,setPersonCast]=useState([]);
    const [personCrew,setPersonCrew]=useState([]);
    useEffect(()=>{
    const fetchData =async() =>{

        const fetchInfo=await axios.get("https://api.themoviedb.org/3/person/"+match.params.id+"/combined_credits?api_key=80c28cb0d587ff44c0e8ff79ca3b69c8&language=en-US")

        axios.all([fetchInfo]).then(axios.spread((...allData)=>{
            const allDataCast=allData[0].data.cast
            const allDataCrew=allData[0].data.crew

            setPersonCast(allDataCast);
            // console.log(allDataCast);
            setPersonCrew(allDataCrew);
            // console.log(allDataCrew);
        })
        )
}

    fetchData()
},[match.params.id])

    const containerVariants={
    hidden:{
      opacity:0,
    },
    visible:{
      opacity:1,
      transition:{duration:.5}
    },
    exit:{
      x:'-100vw',
      transition:{ease:'easeInOut'}
    }
  }

    return(
        <>
        <motion.div className="ContentHome"
        variants={containerVariants} 
        initial="hidden"
        animate="visible"
        exit="exit">
        <fieldset>
             <legend>Acted in</legend>  
        <div className="in-cast">
        {personCast.map((person)=>(
            <Link  target="_blank" to={'/content/'+((person?.media_type==="movie") ? "m":"t")+person?.id} key={person.id}>
            <motion.div animate={{x:0,opacity:1}} initial={{x:150,opacity:0}} transition={{delay:0.5}} className="cast_columnParent">
            <div style={{ backgroundImage:'url('+base_url+"/w220_and_h330_face"+person.poster_path+')'}} className="cast_columnChild" />
            <h6>{" "+person.character}<br/></h6><h5>{" '"}{person.title || person.name || person.original_title || person.original_name}{"'"}</h5>
            </motion.div>
            </Link>
        ))}
        </div>
        </fieldset>

        <fieldset style={{paddingTop:'20px'}}>
             <legend>Part of crew</legend>  
        <div className="in-cast">
        {personCrew.map((person)=>(
            <>
            <Link to={'/content/'+((person?.media_type==="movie") ? "m":"t")+person?.id}  target="_blank">
            <motion.div animate={{x:0,opacity:1}} initial={{x:150,opacity:0}} transition={{delay:0.75}} className="cast_columnParent">
              
            <div style={{ backgroundImage:'url('+base_url+"/w220_and_h330_face"+person.poster_path+')'}} className="cast_columnChild" key={person.id}/>
           <h6>{" "+person.job}<br/></h6><h5>{" '"}{person.title || person.name || person.original_title}{"'"}</h5>
            </motion.div>
            </Link>
            </>
        ))}
        </div>
        </fieldset>
        </motion.div>
        </>
    );
}

export default Person;
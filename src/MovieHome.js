import {React} from 'react';
import { motion } from 'framer-motion';
import requests from './requests.js';
import Row from './Row';
import Banner from './Banner';

function MovieHome(){
   
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

<motion.div className="home" 
  variants={containerVariants} 
  initial="hidden"
  animate="visible"
  exit="exit">
     <Banner url={requests.fetchPopular}/>
<div className="rowContainer">
<Row type="m" title="Popular this week"  extTitle="" fetchUrl={requests.fetchPopular} applyWidth={"100%"} slice="20"/>
<Row type="m" title="Laughing riots" extTitle="" fetchUrl={requests.fetchComedyMovies} applyWidth={"100%"} slice="20"/>
<Row type="m" title="A little action" extTitle="" fetchUrl={requests.fetchActionMovies} applyWidth={"100%"} slice="20"/>
<Row type="m" title="Scary as shit" extTitle="" fetchUrl={requests.fetchHorrorMovies} applyWidth={"100%"} slice="20"/>
<Row type="m" title="Ultra Pro Max Plus Movies" extTitle="" fetchUrl={requests.fetchClassicMovies} applyWidth={"100%"} slice="20"/>
</div>
 
</motion.div>
</>
  )}
  
export default MovieHome
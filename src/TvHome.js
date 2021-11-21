import {React} from 'react';
import { motion } from 'framer-motion';
import requests from './requests.js';
import Row from './Row';
import Banner from './Banner';

function TvHome(){

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
     <Banner url={requests.fetchNetflixOriginals}/>
<div className="rowContainer">
<Row type="t" title="Popular this week"  extTitle="" fetchUrl={requests.fetchPopularTv} applyWidth={"100%"} slice="20"/>
<Row type="t" title="Best of Amazon"  extTitle="" fetchUrl={requests.fetchAmazonOriginals} applyWidth={"100%"} slice="20"/>
<Row type="t" title="Best of Netflix"  extTitle="" fetchUrl={requests.fetchNetflixOriginals} applyWidth={"100%"} slice="20"/>
<Row type="t" title="Disney ain't plus no more"  extTitle="" fetchUrl={requests.fetchDisney} applyWidth={"100%"} slice="20"/>
<Row type="t" title="Personal Top Tv Series" extTitle="See all" fetchUrl={requests.fetchListTvSeries} applyWidth={"400px"} slice="4" cluster/>


</div>

 
</motion.div>
</>
  )}
  
export default TvHome
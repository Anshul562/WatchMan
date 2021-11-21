import { React } from 'react';
import { motion } from 'framer-motion';
import requests from './requests.js';

import Row from './Row';
import Banner from './Banner';

function AnimeHome() {

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
        <Banner url={requests.fetchTopAnime} />
        <div className="rowContainer">
          <Row type="t" title="CrunchyRoll on 'roll'" extTitle="" fetchUrl={requests.fetchCrunchyroll} applyWidth={"100%"} slice="20" />
        </div>


      </motion.div>
    </>
  )
}

export default AnimeHome
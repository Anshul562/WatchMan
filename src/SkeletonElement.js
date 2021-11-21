import React from "react"
import "./css/skeleton.css"

const SkeletonElement =({type})=>{
    const classes='skeleton '+type
    return(<>
        <div className={classes}>
        <div className="shimmer"/>
        </div>
    </>)
}

export default SkeletonElement
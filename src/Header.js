import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import "./css/header.css";
import { auth, db, signInWithGoogle } from "./config/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import {logout } from "./config/firebaseConfig";
import { useEffect } from 'react';

function Header() {
    const [userInput, setUserInput] = useState('')
    const inputchangehandler = (event) => {
        setUserInput(event.target.value)
    }
    


    const [user] = useAuthState(auth);
    // eslint-disable-next-line
    const [name, setName] = useState("");


    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const query = await db
                    .collection("users")
                    .where("uid", "==", user?.uid)
                    .get();
                const data = query.docs[0].data();
                setName(data.name);
            } catch (err) {
                console.error(err);
            }
        };
        fetchUserName()
    }, [user?.uid])

    return (
        <>
            <nav className='navbar navbar-expand-lg navbar-dark'>

                <div className="container-fluid">
                    <div className="nav_logo">
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a href="../" className="nav-link active" aria-current="page" >Home</a>
                            </li>
                            <li className="nav-item">
                                <Link to="/movie-home/" className="nav-link" aria-current="page" >Movies</Link>
                            </li>
                            <li className="nav-item">
                                <a href="/tv-home/" className="nav-link" aria-current="page" >TV</a>
                            </li>
                            <li className="nav-item">
                                <a href="/anime-home/" className="nav-link" aria-current="page" >Anime</a>
                            </li>
                            <li className="nav-item">
                                
                            </li>
                        </ul>
                        <div className="login-data">
                            {
                        user ?  
                        <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                            <li className="nav-item">
                                <a href="/watchlist/" className="nav-link" aria-current="page" >Watchlist</a>
                            </li>
                        </ul> 
                                : 
                                <button className="login__btn" onClick={signInWithGoogle}>Login</button>
                                }

                                {user ? <>Hello {name}<img src={user.photoURL} className="login__avatar" alt="#"/><button className="login__btn" onClick={logout}>
                                    Logout
                                </button></>: ""}
                                </div> 
                        <form action={"/search/q/movie/" + userInput + "/" + userInput} className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search"
                                aria-label="search" onChange={inputchangehandler} value={userInput} />

                            <Link to={"/search/q/movie/" + userInput + "/" + userInput}><div className="btn btn-outline-success" id="btnclick" >Search</div></Link>
                        </form>
                    </div>
                </div>
            </nav>

        </>

    )
}
export default Header
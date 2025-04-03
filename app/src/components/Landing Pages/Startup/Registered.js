import React, {useState, useEffect} from "react";
import "./Registered.css";
import Navbar from "../Navbar";

const Registered = () => {
    return (
        <>
        <Navbar />
                <div className="registered__main__container">
                <div className="container">
                    <h1 className="text-center my-3 startup__heading">For Campigns</h1>
                    <div className="registered my-5">
                        <div className="registered__heading text-center">
                            Start the Journey
                        </div>
                        <div className="registered__container">
                            <div className="timeline my-5">
                                <div className="section left">
                                    <i className="icon fa fa-home"></i>
                                    <div className="content">
                                        <p>
                                            register on home page
                                        </p>
                                    </div>
                                </div>
                                <div className="section right">
                                    <i className="icon fa-solid fa-shield"></i>
                                    <div className="content">
                                        <p>
                                            Go through the registration form
                                        </p>
                                    </div>
                                </div>
                                <div className="section left">
                                    <i className="icon fa fa-user"></i>
                                    <div className="content">
                                        <p>
                                            Showcase your campign with  website
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                <div className="registered my-5">
                    <div className="registered__heading text-center">
                        {/* GET YOUR STARTUP REGISTERED */}
                    </div>
                    <div className="registered__container">
                        <div className="timeline my-5">
                            <div className="section left">
                                <i className="icon fa fa-home"></i>
                                <div className="content">
                                    {/* <p>
                                        Fill all details in the registeration form and set a realisitic fund goal
                                    </p> */}
                                </div>
                            </div>
                            <div className="section right">
                                <i className="icon fa-solid fa-shield"></i>
                                <div className="content">
                                    {/* <p>
                                        Verification part!! Wait for the verification
                                    </p> */}
                                </div>
                            </div>
                            <div className="section left">
                                <i className="icon fa fa-user"></i>
                                <div className="content">
                                    {/* <p>
                                        Get a sharable link, and share as much as possible
                                    </p> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>



                <div className="container">
                    <h1 className="text-center my-3 startup__heading"></h1>
                    <div className="registered my-5">
                        <div className="registered__heading text-center">
                            
                        </div>
                        <div className="registered__container">
                            <div className="timeline my-5">
                                <div className="section left">
                                    <i className="icon fa fa-home"></i>
                                    <div className="content">
                                        <p>
                                           
                                        </p>
                                    </div>
                                </div>
                                <div className="section right">
                                    <i className="icon fa-solid fa-shield"></i>
                                    <div className="content">
                                        <p>
                                           
                                        </p>
                                    </div>
                                </div>
                                <div className="section left">
                                    <i className="icon fa fa-user"></i>
                                    <div className="content">
                                        <p>
                                          
                                        </p>
                                    </div>
                                </div>
                                <div className="section right">
                                    <i className="icon fa-solid fa-shield"></i>
                                    <div className="content">
                                        <p>
                                          
                                        </p>
                                    </div>
                                </div>
                                <div className="section left">
                                    <i className="icon fa fa-user"></i>
                                    <div className="content">
                                        <p>
                                           
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Registered;
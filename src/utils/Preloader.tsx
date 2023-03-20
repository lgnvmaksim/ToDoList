import React from 'react';
import './Preloader.css'
import {Header} from "../Components/Header";

export const Preloader = () => {
    return <div>
        <Header/>
        <div id="preloader" className="preloader-background">
            <div className="preloader">
                <div className="preloader__inner">
                    <div className="outer-circle">
                        <div className="outer-circle__inner">
                        </div>
                    </div>
                    <div className="outer-circle__element">
                        <div className="outer-circle-element__inner1">
                        </div>
                        <div className="outer-circle-element__inner2">
                        </div>
                        <div className="outer-circle-element__inner3">
                        </div>
                    </div>
                    <div className="middle-circle">
                    </div>
                    <div className="inside-circle">
                    </div>
                </div>
                <h2 className="preloader__title">WAIT A FEW SECONDS...</h2>
            </div>
        </div>
    </div>


};

import React, { useEffect, useState } from "react";
import { Carousel } from 'react-responsive-carousel';
import 'rsuite/dist/rsuite.min.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import './carousel.css'
import { Link } from "react-router-dom";

export default function carousel(props) {
    // console.log(props.data);
    const [Theme, setTheme] = useState([]);

    useEffect(() => {
        setTheme(props.data[1].Carousel);
    }, [props.data]);

    // useEffect(() => {
    //     console.log("Theme : ", Theme);
    // }, [Theme]);

    return (
        <div id="carousel">
            <Carousel className='slider'>
                {
                    Theme.map(item => {
                        return (
                            <div className="pic">
                                <img src={item.Data.Image_URL} loading="lazy" />
                                <Link to={`/New/Carousel/${item.id}`}>
                                    <p className="legend">{item.Data.Title}</p>
                                </Link>
                            </div>
                        )
                    })
                }
            </Carousel >
        </div >
    )
}
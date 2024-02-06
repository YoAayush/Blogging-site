import React, { useEffect } from "react";
import Carousel from '../src/inner-components/carousel';
// import Posts from '../src/inner-components/Posts';
import FeaturedPosts from '../src/inner-components/FeaturedPosts';
// import JSON from '../src/inner-components/carousel-data.json'
import featured from '../src/Articles_JSON/Featured_JSON.json'
import './Content.css'

export default function Content(prop) {
    
    // useEffect(()=>{
    //     console.log(prop.login);
    // },[prop.login]);

    return (
        <>
            <div id='links-div' style={{ 'width': 'fit-content', 'padding': '.3%' }}>
                <div className='slider-carousel'>
                    <Carousel data={featured} />
                </div>
                <div className='hr'>
                    <div className='line'></div>
                    <p style={{ color: "#365486" }}>Featured</p>
                </div>
                <div className='posts'>
                    <FeaturedPosts data={featured} />
                </div>
                {/* <div className='hr'>
                    <div className='line'></div>
                    <h3 style={{ color: "#365486" }}>Latest News</h3>
                </div>
                <div className='posts-latest'>
                    {
                        LatestNews.map(article => {
                            return (
                                <Posts />
                            )
                        })
                    }
                </div> */}
            </div >
        </>
    )
}
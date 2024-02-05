import React, { useEffect, useState } from "react";
import './Specified.css';
import { Link } from "react-router-dom";

export default function Specified(prop) {

    // console.log(prop.data);
    const [Theme, setTheme] = useState([]);

    useEffect(() => {
        setTheme(prop.data[0].Featured);
    }, [prop.data]);

    // useEffect(() => {
    //     console.log("Theme : ", Theme);
    // }, [Theme]);

    return (
        <div id="specified-theme-posts">
            {
                Theme.map((item) => {
                    return (
                        <div className="specified-theme-article">
                            <div className="img">
                                <img src={item.Data.Image_URL} alt="" loading="lazy" />
                            </div>
                            <div id="about">
                                <p>{item.Data.Date_of_Publish}</p>
                                <h5 style={{textAlign:'center'}}>{item.Data.Title}</h5>
                                <p id="desc">{item.Data.Short_desc}</p>
                                <Link to={`/New/Featured/${encodeURI(item.id)}`}><input type="button" value="Read More" /></Link>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}


// import React from "react";
// import './FeaturedPosts.css'
// import { Link } from "react-router-dom";

// export default function FeaturedPosts(prop) {
//     // console.log(prop.data);

//     return (
//         <div id="featured-posts">
//             {
//                 prop.data[0].Featured.map((item) => {
//                     return (
//                         <div className="featured-article">
//                             <img src={item.Data.Image_URL} alt="" />
//                             <div id="about">
//                                 <p>{item.Data.Date_of_Publish}</p>
//                                 <h4>{item.Data.Title}</h4>
//                                 <p id="desc">{item.Data.Short_desc}</p>
//                                 <Link to={`/New/${encodeURI()}/${encodeURI(item.id)}`} target="_blank"><input type="button" value="Read More" /></Link>
//                             </div>
//                         </div>
//                     )
//                 })
//             }
//         </div>
//     )
// }
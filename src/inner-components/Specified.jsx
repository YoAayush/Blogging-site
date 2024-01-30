import React, { useEffect, useState } from "react";
import './Specified.css';
import { Link, useParams } from "react-router-dom";

export default function Specified(prop) {

    const { title } = useParams();

    const [Theme, setTheme] = useState([]);

    useEffect(() => {
        if (prop.data[0].Heading === title) {
            setTheme(prop.data[0].Mobile_Phones);
        } else if (prop.data[1].Heading === title) {
            setTheme(prop.data[1].GPUs);
        } else if (prop.data[2].Heading === title) {
            setTheme(prop.data[2].Artifficial_Intelligence);
        }
    }, [prop.data, title]);

    return (
        <div id="specified-theme-posts">
            <p className="title">{title}</p>
            {
                Theme.map((item) => {
                    return (
                        <div className="specified-theme-article">
                            <img src={item.Data.Image_URL} alt="" loading="lazy" />
                            <div id="about">
                                <p>{item.Data.Date_of_Publish}</p>
                                <h4>{item.Data.Title}</h4>
                                <p id="desc">{item.Data.Short_desc}</p>
                                <Link to={`/Different/${encodeURI(title)}/${encodeURI(item.id)}`}><input type="button" value="Read More" /></Link>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
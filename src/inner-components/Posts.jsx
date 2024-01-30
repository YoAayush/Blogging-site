import React from "react";
import './posts.css'
import { Link } from "react-router-dom";

export default function Posts(item) {
    return (
        <div className="all-posts">
            {
                <div className="article">
                    <div className="article-img">
                        <img src={item.data.urlToImage} alt="" />
                    </div>
                    <p id="date">{item.data.publishedAt}</p>
                    <h5 id="title">{item.data.title}</h5>
                    <p id="desc">{item.data.description}</p>
                    <Link to={item.data.url} target="_blank"><input type="button" value="Read More" /></Link>
                </div>
            }
        </div>
    )
}
import React, { useState, useEffect } from 'react';
import "./posts.css";
import "bootstrap/dist/css/bootstrap.min.css";
import format from "date-fns/format";
import { AiOutlineComment, AiFillStar } from 'react-icons/ai';
import { ImLink } from 'react-icons/im';
import 'reactjs-popup/dist/index.css';
import robotjs from '../images/robotjs.png';
import noimage from '../images/noimage.png';
import { Link } from "react-router-dom";

function Posts() {

    //Inital values
    const [items, setItems] = useState([]);
    let data = []; //Further development in order to search for another category

    //useEffect hook used in order to fetch data and update
    useEffect(() => {
        //Fetching a JSON file across the network from Reddit
        fetch("https://www.reddit.com/r/javascript.json?limit=8").then(res => {
            if (res.status != 200) {
                console.log("Something went wrong...");
                return;
            }
            res.json().then(data => {
                if (data != null) {
                    console.log(data);
                    setItems(data.data.children);
                }
            });
        })
    }, []);

    //Further development in order to search for another category
    // const runSearch = (e) => {
    //     e.preventDefault();
    //     console.log(e.target.category.value)   
    //     setItems(e.target.category.value);
    // }

    //Epoch converter: timestamp -> human date
    const setDate = (ts) => {
        var d = new Date(ts * 1000);
        var date = format(d, "MMMM do, yyyy H:mma");
        return date;
    }


    return (
        <div className="container1">
            <img id="robotjs" src={robotjs} alt="robotjs" />
            {/*Further development in order to search for another category
            <form onSubmit={runSearch}>
            <input type="text" name="category" id='searchInput' placeholder='Enter a subreddit...'></input>
            </form> */}
            {items.map((child, i) => (
                <div key={i} className="card-deck">
                    <div className="card">
                        <div className="card-body">
                            <div className="left1">
                                {/* When clicking on a post we want to include which route we´re coming from and to pass along data
                                    We include a state prop with the data we want to pass along - the child*/}
                                <Link state={{ value: child }} to="SelfPost" style={{ textDecoration: "none", color: "white" }}>
                                    <button className="post">
                                        <h4 className="card-title">{child.data.title}</h4>
                                    </button>
                                </Link>
                                <p className="card-author">{child.data.author}</p>
                                <div className="card-info">
                                    <div className="info">
                                        <p id="fact"> <AiOutlineComment style={{ fontSize: "1.5em" }} /> {child.data.num_comments} </p>
                                        <p id="fact"> <AiFillStar style={{ fontSize: "1.2em" }} /> {child.data.score} </p>
                                        <p id="fact"> <a id="permalink" href={`https://www.reddit.com${child.data.permalink}`}> <ImLink style={{ fontSize: "1.2em" }} /> </a></p>
                                    </div>
                                </div>
                            </div>
                            <div className="right1">
                                <img src={`${child.data.thumbnail}`} 
                                        onError={({ currentTarget }) => {
                                        currentTarget.onerror = null; // prevents looping
                                        currentTarget.src = `${noimage}`
                                    }} style={{width: "9em"}}/>
                            </div>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted"> {setDate(child.data.created)} </small>
                        </div>
                    </div>

                </div>
            ))}
        </div>
    )
}

export default Posts;


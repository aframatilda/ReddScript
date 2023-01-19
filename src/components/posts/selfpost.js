import React, { useState, useEffect } from "react";
import "./selfpost.css";
import { useLocation } from "react-router-dom";
import { AiOutlineComment, AiFillStar } from 'react-icons/ai';
import { ImLink } from 'react-icons/im';
import format from "date-fns/format";
import "bootstrap/dist/css/bootstrap.min.css";
import robotcomments from '../images/robotcomments.png';

function SelfPost() {

    //When we pass data along via the state property, that data will be available on the location's state property, which we get access to by useLocation
    const location = useLocation();
    const { value } = location.state;

    const [comments, setComments] = useState([]);
    const permalink = value.data.permalink.substring(0, value.data.permalink.lastIndexOf('/'));

    // useEffect hook used in order to fetch data and update
    useEffect(() => {
        //Fetching a JSON file across the network from Reddit
        fetch(`https://www.reddit.com${permalink}.json`).then(res => {
            if (res.status != 200) {
                console.log("Something went wrong...");
                return;
            }
            res.json().then(data => {
                if (data != null) {
                    // console.log(data[1].data.children)
                    setComments(data[1].data.children);
                }
            });
        })
    }, []);

     //Epoch converter: timestamp -> human date
     const setDate = (ts) => {
        var d = new Date(ts * 1000);
        // var date = format(d, "MMMM do, yyyy H:mma");
        var date = format(d, "d/MM, yyyy H:mma");
        return date;
    }

    return (
        <div className="wrapper">
            <img id="robotcomments" src={robotcomments} alt="robotcomments" />
            <div className="container2">
                <div className="left2">
                    <h4 className="card-title">{value.data.title}</h4>
                    <p className="card-author">{value.data.author}</p>
                    <p className="card-post"> {value.data.selftext}</p>
                    <div className="card-info">
                        <div className="info">
                            <p id="fact"> <AiOutlineComment style={{ fontSize: "1.2em" }} /> {value.data.num_comments} </p>
                            <p id="fact"> <AiFillStar style={{ fontSize: "1em" }} /> {value.data.score} </p>
                            <p id="fact"> <a id="permalink" href={`https://www.reddit.com${value.data.permalink}`}> <ImLink style={{ fontSize: "1em" }} /> </a></p>
                        </div>
                    </div>
                </div>
                <div className="right2">
                    {comments.map((child, i) => (
                        <div className="card" key={i}>
                            <div className="card-header">
                                <p> {child.data.author} </p>
                                <small className="text-muted"> Created: {setDate(child.data.created)} </small>
                            </div>
                            <div class="card-body">
                                <blockquote class="blockquote mb-0">
                                    <p> {child.data.body } </p>
                                </blockquote>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default SelfPost

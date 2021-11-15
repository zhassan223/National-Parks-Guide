
import Activities from "./Activities";
import { Routes, Route, useParams } from 'react-router-dom';
import { Link, useHistory } from 'react-router-dom'

import React, { useEffect, useState } from "react";
import "./Parks.css";
import Header2 from "./Header2";

const useFetch = url => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(async () => {
        const response = await fetch(url);
        const data = await response.json();
        const item = data.data[0]['parks']
        setData(item);
        setLoading(false);
    }, []);

    return { data, loading };
};

function Parks(props) {



    let params = useParams()
    const url = "https://developer.nps.gov/api/v1/activities/parks?q=" + params.activity + "&limit=1&api_key=mWVRZYNNsVJXtdRrlIOnA6v4nFogwFI0MKHa9WaV";
    // const response = await fetch(url);
    // const data = await response.json();
    /* console.log(data.data[0].name) */
    // this.setState({ parks: data.data.parks });




    const { data, loading } = useFetch(url);




    /* data is an array of json objects  */
    console.log(data)
    if (loading) {
        return <div>loading...</div>;
    }

    if (!data) {
        return <div>you don't have data man
        </div>;
    }

    return (

        <div>
            <Header2 />
            {data.map((park, idx) => (
                < Link to={`/park/${park.fullName}`}>
                    <button className="parkbutton"><h2>{park.fullName}</h2>
                        <h4>State(s): {park.states}</h4></button>
                </Link>
            )
            )}

        </div>
    )

}

export default Parks;


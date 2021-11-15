import Activities from "./Activities";
import { Routes, Route, useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom';

import Header3 from "./Header3";
const useFetch = url => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(async () => {
        const response = await fetch(url);
        const data = await response.json();
        const item = data.data
        setData(item);
        setLoading(false);
    }, []);

    return { data, loading };
};


function Webcam(props) {



    let params = useParams()
    const url = "https://developer.nps.gov/api/v1/webcams?limit=50&q=" + params.fname + "&api_key=mWVRZYNNsVJXtdRrlIOnA6v4nFogwFI0MKHa9WaV";




    const { data, loading } = useFetch(url);





    /* data is an array of json objects  */

    console.log(data)
    /* data is an array of json objects  */

    if (loading) {
        return <div>loading...</div>;
    }

    if (!data) {
        return <div>you don't have data man
        </div>;
    }
    const count = 0;
    return (

        <div>

            {data.map((cam, idx) => (
                <>
                    {console.log(cam.images)}
                    {cam.images.map((img, idx) => (
                        <img src={img.url} />
                    ))}
                </>
            ))}

        </div>
    )

}

export default Webcam;
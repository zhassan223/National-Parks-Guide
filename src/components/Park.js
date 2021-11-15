import Activities from "./Activities";
import { Routes, Route, useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom';

import "./Park.css";
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


function Parks(props) {



    let params = useParams()
    const url = "https://developer.nps.gov/api/v1/parks?limit=1&q=" + params.fname + "&sort=&api_key=mWVRZYNNsVJXtdRrlIOnA6v4nFogwFI0MKHa9WaV";
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
            <Header3 />
            <h1>Welcome to {data[0].fullName}!!!</h1>
            <h3> Park description:</h3>
            <p>{data[0].description}</p>
            <h3> Topics related to this park include:</h3>
            <ol>{data[0].topics.map((topic, idx) => (

                <li>{topic.name}</li>
            )
            )}</ol>
            <h3> Activities that are associated with this Park: </h3>
            <ol>{data[0].activities.map((act, idx) => (
                <li> {act.name} </li>
            ))} </ol>
            <h3>Contacts:</h3>
            <h4> Email(s):</h4>
            <ol>
                {data[0].contacts.emailAddresses.map((address, idx) => (
                    <li>
                        {address.emailAddress}
                    </li>
                ))}
            </ol>
            <h4>
                Phone Number(s):
                <ol>
                    {data[0].contacts.phoneNumbers.map((number, idx) => (
                        <li>
                            Phone Number : {number.phoneNumber} , extension : {number.extension}, type: {number.type}
                        </li>
                    ))}
                </ol>
            </h4>
            <h3> Designation: {data[0].designation}</h3>
            <h3> Directions Info: </h3>
            <p>{data[0].directionsInfo}</p>
            <p> For more directions info visit <a href={data[0].directionsUrl}>{data[0].directionsUrl}</a></p>
            <h3> Operating Hours </h3>
            <p> Description of hours: {data[0].operatingHours[0].description} </p>

            <ul>
                <p>Standard Hours:</p>
                {data[0].operatingHours.map((hour, idx) => (
                    <li>
                        Wednesday: {hour.standardHours.wednesday}, Monday: {hour.standardHours.monday}, Thursday:{hour.standardHours.thursday}, Sunday: {hour.standardHours.sunday}, Tuesday: {hour.standardHours.tuesday}, Friday: {hour.standardHours.friday}, Saturday: {hour.standardHours.saturday}
                    </li>
                ))}
            </ul>

            <h4> Exceptions to Hours: </h4>
            <ul>
                {data[0].operatingHours[0].exceptions.map((hours, idx) => (
                    <li>
                        <p>
                            Start Date: {hours.startDate}
                        </p>
                        <p>
                            End Date: {hours.endDate}
                        </p>
                        <p>
                            Exception Hours: Friday: {hours.exceptionHours.friday}, Monday:{hours.exceptionHours.monday}, Saturday:{hours.exceptionHours.saturday}, Sunday:{hours.exceptionHours.sunday}, Thursday:{hours.exceptionHours.thursday}, Tuesday:{hours.exceptionHours.tuesday}, Wednesday: {hours.exceptionHours.wednesday}
                        </p>
                        <p>
                            Why?: {hours.name}
                        </p>


                    </li>
                ))}
            </ul>
            <h3>Entrance Fee(s): </h3>
            <ul> {data[0].entranceFees.map((fee, idx) => (
                <li> Cost: {fee.cost} ; Description of Fee: {fee.description}</li>
            ))
            } </ul>
            <h3> Entrance Pass(es):</h3>
            <ul>

                {data[0].entrancePasses.map((pass, idx) => (
                    <li> Name:{pass.title}
                        Cost: {pass.cost};
                        Description: {pass.description}

                    </li>
                ))}
            </ul>
            <h3>Check Out These Images from the park!</h3>
            <div className="images">
                {data[0].images.map((img, idx) => (
                    <img className="image" src={img.url} />

                )
                )}
            </div>
            <Link to={`/park/webcam/${data[0].fullName}`}>
                <h3>For Webcams pictures from this Park Click Me! </h3>
            </Link>
            <h3> For More info about this park visit </h3>
            <a href={data[0].url}>{data[0].url}</a>
        </div>
    )

}

export default Parks;

import React from "react";
import "./Activities.css";
import Header from "./Header"
import { Link, useHistory } from 'react-router-dom';

// const handleOnSubmit = (props) => {
//     this.props.history.push('/parks/:activity');
// };

class Activities extends React.Component {
    state = {
        loading: true,
        person: null
    };


    async componentDidMount() {
        const url = "https://developer.nps.gov/api/v1/activities?limit=50&api_key=mWVRZYNNsVJXtdRrlIOnA6v4nFogwFI0MKHa9WaV";
        const response = await fetch(url);
        const data = await response.json();
        /* console.log(data.data[0].name) */
        this.setState({ activity: data.data, loading: false });



    }



    render() {
        if (this.state.loading) {
            return <div>loading...</div>;
        }

        if (!this.state.activity) {
            return <div>activity</div>;
        }

        return (
            <div>
                <Header />
                {this.state.activity.map((activity, idx) => (
                    < Link className="Link" to={`/parks/${activity.name}`}>
                        <ActivityButton key={idx} name={activity.name}></ActivityButton>
                    </Link>
                )
                )}
            </div>
        );
    }
}



function ActivityButton(props) {

    return (<div className="act_names">


        <button className="button">{props.name}</button>

    </div >);
}
export default Activities;
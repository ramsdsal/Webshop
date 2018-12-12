import React, { Component } from 'react';
import './UserProfile.css';
import { Link, NavLink} from "react-router-dom";
import { RouteComponentProps } from 'react-router';


export class UserProfile extends Component{
    constructor()
    {
        super();
        this.state = { user : "isLoading"}
        fetch("/api/User/2")
            .then(response => response.json())
            .then(data => {
            console.log(data)
             this.setState({...this.state, user : data[0]})});
        
    }    
            
    
    
    render() {
        if (this.state.user == "isLoading")
        {
            return <p>Loading...</p>
        }
        return (
            <div>
                <h1>Profile</h1>
                <p>Dummy Profile. We will see how it will look like.</p>
                <div>
                    <h3> Gegevens </h3>
                    <li><strong>Naam :</strong> { this.state.user.firstName } </li>
                    <li><strong>Achternaam :</strong> { this.state.user.lastName } </li>
                    <li><strong>Geboortedatum :</strong> { this.state.user.birthDate } </li>
                    <li><strong>E-mail :</strong> { this.state.user.email } </li>           

                    <li><strong>Address : </strong>Schapenburg 2</li>
                </div>
                <div>
                    <h3> Favorieten </h3>
                    <li>Halloween</li>
                    <li>Avengers : Infinity War</li>
                </div>
                <div>
                    <h3> Orders </h3>
                    <table>
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Date of delivery</th>
                            <th scope="col">Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>The Grinch</td>
                            <td>28-2-2019</td>
                            <td>Holé Straat 78</td>
                        </tr>
                        <tr>
                            <td>Titanic</td>
                            <td>18-4-2020</td>
                            <td>Holé Street 78</td>
                        </tr>
                        <tr>
                            <td>Venom</td>
                            <td>2-3-2019</td>
                            <td>Holé Street 76</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
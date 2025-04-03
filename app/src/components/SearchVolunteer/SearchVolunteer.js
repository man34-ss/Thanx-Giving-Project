import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './SearchVolunteer.css';
import UserContext from '../../Context/userContext';
import Navbar from "../Landing Pages/Navbar";

const SearchVolunteer = () => {
    const context = useContext(UserContext);
    const [formData, setFormData] = useState({ city: '', purpose: '' });
    const [volunteers, setVolunteers] = useState([]);
    const [cities, setCities] = useState([]); // To hold the list of cities
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // State for prediction functionality
    const [urgency, setUrgency] = useState('');
    const [predictionError, setPredictionError] = useState('');
    const [predicting, setPredicting] = useState(false);

    // useEffect(() => {
    //     // Fetch list of cities when the component mounts
    //     const fetchCities = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:5000/api/investor/cities');
    //             setCities(response.data); // Assuming the cities endpoint returns a list of cities
    //         } catch (err) {
    //             console.error('Error fetching cities:', err);
    //         }
    //     };
    //     fetchCities();
    // }, []);

    // Handle input change for the form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Fetch volunteers based on the selected city
    const handleSearch = async () => {
        if (!formData.city) {
            setError('Please enter a city');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`http://localhost:5000/api/investor/${formData.city}`, {
                params: {
                    needyName: context.user.name, 
                    needyPhone: context.user.phone,
                    needyPurpose: formData.purpose,
                    urgencyStatus: await getUrgencyStatus() 
                }
            });
            setVolunteers(response.data);
        } catch (err) {
            setError('Failed to fetch volunteer data.');
        } finally {
            setLoading(false);
        }
    };

    const getUrgencyStatus = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/predict', {
                message: formData.purpose,
            });

            return response.data.urgency;
        } catch(err) {
            console.log("Error while getting urgency");
            return "Could not get Urgency Status"
        }
    }


    // Predict urgency based on the purpose
    const handlePrediction = async () => {
        if (!formData.purpose) {
            setPredictionError('Please enter a purpose');
            return;
        }

        setPredicting(true);
        setPredictionError('');
        setUrgency('');

        try {
            const urgencyStatus = await getUrgencyStatus();

            setUrgency(urgencyStatus);
        } catch (err) {
            setPredictionError(err.response?.data?.error || 'Failed to predict urgency');
        } finally {
            setPredicting(false);
        }
    };

    return (
        <>
        <Navbar />
        <div className="search-volunteer">
            <h1 className="text-center top__heading1 my-3">Search Volunteer</h1>

            {/* Volunteer Search Form */}
            <form className="volunteer-form">
                <div className="Purpose">
                    <label>Purpose:</label>
                    <input
                        type="text"
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleChange}
                        placeholder="e.g., Education, Health"
                    />
                </div>

                <div className="City">
                    <label>City:</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Type City Name"
                        list="city-list" // Show a list of suggestions
                    />
                    <datalist id="city-list">
                        {cities.map((city, index) => (
                            <option key={index} value={city} />
                        ))}
                    </datalist>
                </div>

                {/* Search Button */}
                <button className="styled-button" type="button" onClick={handleSearch}>
                    Get Volunteers
                </button>
            </form>

            {/* Loading Indicator */}
            {loading && <p className='loading'>Loading...</p>}

            {/* Error Message */}
            {error && <p className="error">{error}</p>}

            {/* Volunteer Results */}
            {volunteers.length > 0 ? (
                <ul className="volunteer-list">
                    {volunteers.map((volunteer, index) => (
                        <li key={index}>
                            <strong>Name:</strong> {volunteer.name} <br />
                            {/* <strong>Skills:</strong> {volunteer.skills} <br /> */}
                            <strong>City:</strong> {volunteer.city} <br />
                            <strong>Phone Number:</strong> {volunteer.phone} <br />
                        </li>
                    ))}
                </ul>
            ) : (
                !loading && formData.city && (
                    <p style={{ color: 'white' }}>No volunteers available in "{formData.city}".</p>
                )
            )}

            {/* Urgency Prediction Section */}
            <div className="prediction-section">
              
                <button className="styled-button" type="button" onClick={handlePrediction}>
                    Predict Urgency
                </button>

                {predicting && <p>Predicting urgency...</p>}
                {predictionError && <p className="error">{predictionError}</p>}
                {urgency && <p style={{ color: 'white' }}>Predicted Urgency: {urgency}</p>}
            </div>

            {volunteers?.length>0 && <div className='alert-message'>Alert sent successfully to volunteer </div>}
        </div>
        </>
    );
};

export default SearchVolunteer;

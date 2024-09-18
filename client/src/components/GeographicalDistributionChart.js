import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const GeographicalDistributionChart = () => {
    const [geographicalData, setGeographicalData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/customers/geographical');
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setGeographicalData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const positions = geographicalData.map(city => ({
        position: [51.505, -0.09], // Example coordinate; replace with actual coordinates
        popup: city._id,
        count: city.count
    }));

    return (
        <div>
            <h2>Geographical Distribution of Customers</h2>
            <MapContainer center={[51.505, -0.09]} zoom={2} style={{ height: '500px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {positions.map((pos, index) => (
                    <Marker key={index} position={pos.position}>
                        <Popup>{pos.popup}: {pos.count} customers</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default GeographicalDistributionChart;

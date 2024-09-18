import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title } from 'chart.js';


const CustomerLifetimeValueChart = () => {
    ChartJS.register(LineElement, CategoryScale, LinearScale, Title);
    const [lifetimeValueData, setLifetimeValueData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/customers/lifetime');
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setLifetimeValueData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        // fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const chartData = {
        labels: lifetimeValueData.map(item => item._id),
        datasets: [{
            label: 'Customer Lifetime Value',
            data: lifetimeValueData.map(item => item.lifetimeValue),
            borderColor: 'rgba(255, 159, 64, 1)',
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
        }]
    };

    return (
        <div>
            <h2>Customer Lifetime Value by Cohorts</h2>
            <Line data={chartData} />
        </div>
    );
};

export default CustomerLifetimeValueChart;

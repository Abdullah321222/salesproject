import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title } from 'chart.js';


const RepeatCustomersChart = () => {
    ChartJS.register(BarElement, CategoryScale, LinearScale, Title);
    const [repeatCustomersData, setRepeatCustomersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/customers/repeat');
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setRepeatCustomersData(data);
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

    const chartData = {
        labels: repeatCustomersData.map(item => item._id),
        datasets: [{
            label: 'Repeat Customers',
            data: repeatCustomersData.map(item => item.count),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    };

    return (
        <div>
            <h2>Number of Repeat Customers</h2>
            <Bar data={chartData} />
        </div>
    );
};

export default RepeatCustomersChart;

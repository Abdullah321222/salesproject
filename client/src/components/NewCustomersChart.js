import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title } from 'chart.js';


const NewCustomersChart = () => {
    ChartJS.register(BarElement, CategoryScale, LinearScale, Title);
    const [customersData, setCustomersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/customers/new');
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setCustomersData(data);
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
        labels: customersData.map(item => item._id),
        datasets: [{
            label: 'New Customers',
            data: customersData.map(item => item.count),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    };

    return (
        <div>
            <h2>New Customers Added Over Time</h2>
            <Bar data={chartData} />
        </div>
    );
};

export default NewCustomersChart;

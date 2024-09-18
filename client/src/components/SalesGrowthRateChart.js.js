import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title } from 'chart.js';


const SalesGrowthRateChart = () => {
    ChartJS.register(LineElement, CategoryScale, LinearScale, Title);
    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/sales/growth');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setSalesData(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.message);
            setLoading(false);
        }
    };
    useEffect(() => {

        // fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const chartData = {
        labels: salesData.map(item => item._id),
        datasets: [{
            label: 'Sales Growth Rate',
            data: salesData.map(item => item.growthRate),
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
        }]
    };

    return (
        <div>
            <h2>Sales Growth Rate Over Time</h2>
            <Line data={chartData} />
        </div>
    );
};

export default SalesGrowthRateChart;

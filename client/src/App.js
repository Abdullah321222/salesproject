import React from 'react';
import TotalSalesChart from './components/TotalSalesChart';
import SalesGrowthRateChart from './components/SalesGrowthRateChart.js';
import NewCustomersChart from './components/NewCustomersChart';
import RepeatCustomersChart from './components/RepeatCustomersChart';
import GeographicalDistributionChart from './components/GeographicalDistributionChart';
import CustomerLifetimeValueChart from './components/CustomerLifetimeValueChart';

function App() {
    return (
        <div className="App">
            <h1>E-Commerce Data Visualization</h1>
            <TotalSalesChart />
            <SalesGrowthRateChart />
            <NewCustomersChart />
            <RepeatCustomersChart />
            <GeographicalDistributionChart />
            <CustomerLifetimeValueChart />
        </div>
    );
}

export default App;

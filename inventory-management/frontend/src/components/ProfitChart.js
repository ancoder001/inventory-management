import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';

const ProfitChart = () => {
  const [dailyProfit, setDailyProfit] = useState(0);
  const [weeklyProfit, setWeeklyProfit] = useState(0);
  const [monthlyProfit, setMonthlyProfit] = useState(0);
  const [categoryProfits, setCategoryProfits] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dailyResponse = await axios.get('http://localhost:5600/profit/daily');
        setDailyProfit(dailyResponse.data.profit);

        const weeklyResponse = await axios.get('http://localhost:5600/profit/weekly');
        setWeeklyProfit(weeklyResponse.data.profit);

        const monthlyResponse = await axios.get('http://localhost:5600/profit/monthly');
        setMonthlyProfit(monthlyResponse.data.profit);

        const categoryResponse = await axios.get('http://localhost:5600/profit/category');
        setCategoryProfits(categoryResponse.data.categoryProfits);
      } catch (error) {
        console.error('Error fetching profit data:', error);
      }
    };

    fetchData();
  }, []);

  const categoryLabels = Object.keys(categoryProfits);
  const categoryData = Object.values(categoryProfits);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Profit Charts</h2>

      <div className="mb-6 w-3/6 h-[10%]">
        <h3 className="text-xl font-bold mb-4">Daily Profit</h3>
        <Line
          data={{
            labels: ['Today'],
            datasets: [
              {
                label: 'Profit',
                data: [dailyProfit],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          }}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4">Weekly Profit</h3>
        <Line
          data={{
            labels: ['Last 7 Days'],
            datasets: [
              {
                label: 'Profit',
                data: [weeklyProfit],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
              },
            ],
          }}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4">Monthly Profit</h3>
        <Line
          data={{
            labels: ['Last 30 Days'],
            datasets: [
              {
                label: 'Profit',
                data: [monthlyProfit],
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
              },
            ],
          }}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Category-based Profit</h3>
        <Bar
          data={{
            labels: categoryLabels,
            datasets: [
              {
                label: 'Profit',
                data: categoryData,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
              },
            ],
          }}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default ProfitChart;

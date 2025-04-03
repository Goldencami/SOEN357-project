import React, { useEffect, useRef } from 'react';
import { initializeRoundData } from '../../shared/data.js';
import { attacks, lowerCaseAttack } from '../../shared/attacks.js';
import { Chart as ChartJS, registerables } from 'chart.js';

// Register required chart components
ChartJS.register(...registerables);

function Chart({ data }) {
    const chartRef = useRef(null); // Reference to the <canvas> element
    const chartInstanceRef = useRef(null); // Reference to store the Chart.js instance

    const { 
        round1 = initializeRoundData(),
        round2 = initializeRoundData(),
        round3 = initializeRoundData()
    } = data;
    
    useEffect(() => {
        if (!chartRef.current) return; // Ensure canvas is available

        const ctx = chartRef.current.getContext('2d');

        // 🚀 Destroy existing chart before creating a new one
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = new ChartJS(ctx, {
            type: 'bar',
            data: {
                labels: ['Apal', 'Side', 'Roundhouse', 'Back Kick', 'Hook', 'Spin Hook', 'Axe', 'Crescent', 'Twist', 'Double', '360', 'Punch', 'Cut', 'Cancel'],
                datasets: [
                    {
                        label: 'Round 1',
                        data: attacks.map((attack) => round1[lowerCaseAttack(attack)].hasScored),
                        backgroundColor: ['#1976D2'],
                    },
                    {
                        label: 'Round 2',
                        data: attacks.map((attack) => round2[lowerCaseAttack(attack)].hasScored),
                        backgroundColor: ['#FF6F00'],
                    },
                    {
                        label: 'Round 3',
                        data: attacks.map((attack) => round3[lowerCaseAttack(attack)].hasScored),
                        backgroundColor: ['#9E9E9E'],
                    },
                    {
                        label: 'Overall',
                        data: attacks.map((attack) => 
                            round1[lowerCaseAttack(attack)].hasScored +
                            round2[lowerCaseAttack(attack)].hasScored +
                            round3[lowerCaseAttack(attack)].hasScored),
                        backgroundColor: ['#FBC02D'],
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: 'ATHLETE STRIKING DISTRIBUTION',
                    }
                }
            }            
        });
        
        // Cleanup function to properly destroy chart on component unmount
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
                chartInstanceRef.current = null;
            }
        };
    }, [data]); // Re-run when 'data' changes

    return (
        <div className='container' id='chart-container'>
            <canvas ref={chartRef}></canvas>
        </div>
    );
}

export default Chart;
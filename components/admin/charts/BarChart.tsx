'use client'
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

type ChartProps = {
  chartData: any[];
  chartOptions: any;
};

// Dynamic import of Chart component
const DynamicChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ColumnChart: React.FC<ChartProps> = ({ chartData, chartOptions }) => {
  const [state, setState] = useState({
    chartData: [],
    chartOptions: {},
  });

  useEffect(() => {
    setState({
      chartData: chartData,
      chartOptions: chartOptions,
    });
  }, [chartData, chartOptions]);

  return (
    <DynamicChart
      options={state.chartOptions}
      series={state.chartData}
      type='bar'
      width='100%'
      height='100%'
    />
  );
};

export default ColumnChart;

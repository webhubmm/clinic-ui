'use client'
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import dynamic from 'next/dynamic';

type ChartProps = {
  chartData: any[];
  chartOptions: any;
};
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const LineChart: React.FC<ChartProps> = ({ chartData, chartOptions }) => {
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
    <ReactApexChart
      options={state.chartOptions}
      series={state.chartData}
      type='area'
      width='100%'
      height='100%'
    />
  );
};

export default LineChart;

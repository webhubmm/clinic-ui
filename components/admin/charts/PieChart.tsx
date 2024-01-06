'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

type ChartProps = {
  chartData: any[];
  chartOptions: any;
};

const PieChart: React.FC<ChartProps> = ({ chartData, chartOptions }) => {
  const [state, setState] = useState({
    chartData: [],
    chartOptions: {},
  });

  useEffect(() => {
    setState({
      chartData,
      chartOptions,
    });
  }, [chartData, chartOptions]);

  return (
    <ReactApexChart
      options={state.chartOptions}
      series={state.chartData}
      type='pie'
      width='100%'
      height='55%'
    />
  );
};

export default PieChart;

'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

type ChartProps = {
  chartData: any[];
  chartOptions: any;
};

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const LineChart: React.FC<ChartProps> = ({ chartData: initialChartData, chartOptions: initialChartOptions }) => {
  const [chartData, setChartData] = useState<any[]>(initialChartData);
  const [chartOptions, setChartOptions] = useState<any>(initialChartOptions);

  useEffect(() => {
    setChartData(initialChartData);
    setChartOptions(initialChartOptions);
  }, [initialChartData, initialChartOptions]);

  return (
    <ReactApexChart
      options={chartOptions}
      series={chartData}
      type='line'
      width='100%'
      height='100%'
    />
  );
};

export default LineChart;

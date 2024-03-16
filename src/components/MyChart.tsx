'use client'
import { resolveStyleConfig } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const MyChart = () => {

    const option = {
        tooltip: {
            enabled: false,
        },
        dataLabels: {
          enabled: false,
        },
        chart: {
            id: 'apexchart-example',
        },
        xaxis: {
            categories: ["Q1", "Q2", "Q3", "Q4"]
        },
        fill: {
            colors: ['#D90429']
        },
        plotOptions: {
            bar: {
                columnWidth: "30%"
            },
            labels: {
              enabled: false,
            }
        },
        yaxis: {
            show: false,
        }
    }


    const series = [{
        data: [30, 40, 35, 50]
    }]
    return (
        <ApexChart type="bar" options={option} series={series} height={200}/>
    )
}

export default MyChart;
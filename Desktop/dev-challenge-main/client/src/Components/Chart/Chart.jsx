import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Pie } from '@ant-design/plots'
import axios from 'axios'
import { GET } from '../../utils/apis'
import ReactApexChart from 'react-apexcharts'

const DemoPie = () => {

    const [graphData, setGraphData] = useState({
        series: [],
        options: {
            noData: {
                text: "Loading....",
                align: 'center',
                verticalAlign: 'middle',
                offsetX: 0,
                offsetY: 0,
                style: {
                    color: '#000000',
                    fontSize: '19px',
                    fontFamily: 'Roboto'
                }
            },
            dataLabels: {
                enabled: false
            },
            legend: {
                show: false
            },
            chart: {
                width: 480,
                type: 'pie',
            },
            // dataLabels: {
            //     formatter(val, opts) {
            //         const name = opts?.w?.globals?.labels[opts?.seriesIndex]
            //         return [name, val?.toFixed(1) + '%']
            //     }
            // },
            labels: ['hoodie', 'blazer', 'raincoat', 'jumper', 'sweater', 'jacket'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        show: false
                    }
                }
            }]
        }
    })
    useEffect(() => {
        getClothes()
    }, [])

    const getClothes = () => {
        axios.get(GET?.GET_CLOTHES_DATA)
            .then(async (result) => {
                const { data } = result
                if (data?.success) {
                    let resultNormailized = data?.resultNormailized
                    let totalLength = data?.totalLength
                    let seriesArr = []
                    let arrTypes = []
                    resultNormailized = resultNormailized?.map((val, ind) => {
                        val.percentage = (100 * Number(val?.count)) / totalLength
                        let percent = val?.percentage
                        let type = val?.clothe
                        seriesArr.push(percent)
                        arrTypes.push(type)
                        const newGraphData = {
                            ...graphData,
                            series: [...seriesArr],
                        }
                        newGraphData.options.labels = [...arrTypes]
                        setGraphData(newGraphData)
                        return val
                    })
                }
            })
            .catch((error) => console.log('error', error?.message))
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ReactApexChart options={graphData?.options} series={graphData?.series} type="pie" width={400} height={190} />
        </div>
    )
};

export default DemoPie
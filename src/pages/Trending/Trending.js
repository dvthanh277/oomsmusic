import { useEffect, useState } from "react";
import { apiPath } from "../../ultis/apiPath";
import request from "../../ultis/axios";
import Loading from "../../components/Loading/Loading";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import './Trending.scss'
import ItemSong from "../../components/ItemSong/ItemSong";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);




function Trending() {
    const [loading, setLoading] = useState(true)
    const [dataChart, setDataChart] = useState([]);
    useEffect(() => {
        request.get(apiPath.trending).then((res) => {
            console.log(res);
            setLoading(false)
            setDataChart(res.data)
        })
    }, [])

    const labels = dataChart?.RTChart?.chart?.times.map(item => item.hour + 'h') || [];
    const infoSongs = dataChart?.RTChart?.items.filter((item, index) => index < 3) || []
    const dataChartSongs = dataChart?.RTChart?.chart?.items || {};
    var dataChartNew = [];
    Object.keys(dataChartSongs).forEach(key => {
        dataChartNew = [...dataChartNew, ...[{ encodeId: key, data: dataChartSongs[key] }]]
    });
    var colorChart = {
        color1: "#4343ef",
        color2: "#ef9643",
        color3: "#68CDE4"
    }
    var newData = infoSongs.map((item, i) => Object.assign({}, item, dataChartNew[i])).map((item, index) => {
        return {
            label: item.title,
            data: item.data.map((data) => data.counter),
            borderColor: index == 0 ? colorChart.color1 : index == 1 ? colorChart.color2 : colorChart.color3,
            borderWidth: 2,
            pointBackgroundColor: '#FFF',
            pointBorderColor: index == 0 ? colorChart.color1 : index == 1 ? colorChart.color2 : colorChart.color3,
            fill: false,
            hoverBorderWidth: 3,
            pointHoverBorderWidth: 1,

        }
    });

    const options = {
        tension: 0.4,
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                display: true,
                grid: {
                    display: false,
                },
            },
            y: {
                grid: {
                    display: false
                },
                ticks: {
                    display: false
                },
                min: 0,
                max: dataChart?.RTChart?.chart?.maxScore,
            }
        },
        hover: {
            mode: 'dataset',
        },
        tooltips: {

            custom: function (tooltipModel) {
                console.log(tooltipModel);
                tooltipModel.backgroundColor = "red";
            }
        },
        plugins: {
            legend: {
                position: 'bottom',
                align: 'center',
                labels: {
                    fontSize: 8,
                    usePointStyle: true,
                    padding: 30
                }
            },
        }
    };

    const data = {
        labels,
        datasets: newData,
    };
    const handleViewMore = () => {
        document.querySelector('.all-song-wrapper').classList.add("active")
        document.querySelector('.view-more').classList.add("hide")
    }
    if (loading) {
        return <Loading></Loading>;
    }
    else {
        const listSong = dataChart?.RTChart?.items.filter((item, index) => index < 100) || []
        console.log(listSong);
        return (
            <>
                <div className="ooms-chart">
                    <h2 className="ooms-title-head">#Trending</h2>
                    <div className="chart"><Line options={options} data={data} />
                    </div>
                </div>
                <div className="ooms-treding-song">
                    <div className="all-song-wrapper">
                        {listSong.map((item, index) => {
                            return <ItemSong no={index + 1} props={item} list={listSong} key={index}></ItemSong>
                        })}
                    </div>
                    <button className="view-more" onClick={handleViewMore}>Xem thêm</button>

                </div>
            </>
        )
    }

}

export default Trending;
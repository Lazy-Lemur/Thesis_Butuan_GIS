$(document).ready(function(){

    // Bar Chart
    var ctx1 = document.getElementById('mycanvas1').getContext('2d');
    var chart1 = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                title: {
                    display: true,
                    text: "Distribution of Votes on Color"
                }
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Color'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Votes'
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }
            }
        }
    });

    // Line Chart
    const ctx2 = document.getElementById('mycanvas2').getContext('2d');

    let delayed;

    // Gradient Fill
    let gradient = ctx2.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(58, 123, 213, 1)");
    gradient.addColorStop(1, "rgba(0, 210, 255, 0.3)");

    const labels = [
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
    ];

    const data = {
        labels,
        datasets: [
            {
                data: [211, 326, 165, 350, 420, 370, 500, 375, 415],
                label: "Minecraft Sales",
                fill: true,
                backgroundColor: gradient,
                borderColor: "#fff",
                pointBackgroundColor: "rgb(189, 195, 199)",
                tension: 0.2,
            },
        ],
    };

    const config = {
        type: "line",
        data: data,
        options: {
            radius: 5,
            hitRadius: 30,
            hoverRadius: 12,
            resposive: true,
            animation: {
                onComplete: () => {
                    delayed: true;
                },
                delay: (context) => {
                    let delay = 0;
                    if (context.type === "data" && context.mode === "default" && !delayed){
                        delay = context.dataIndex * 300 + context.datasetIndex * 100;
                    }
                    return delay;
                },
            },
            scales: {
                y: {
                    ticks: {
                        callback: function(value) {
                            return "$" + value + "m";
                        },
                    },
                },
            },
        }
    }

    const chart2 = new Chart(ctx2, config);
    // var ctx2 = document.getElementById('mycanvas2').getContext('2d');
    // var chart2 = new Chart(ctx2, {
    //     type: 'line',
    //     data: {
    //         labels: 
    //     }
    // });
});
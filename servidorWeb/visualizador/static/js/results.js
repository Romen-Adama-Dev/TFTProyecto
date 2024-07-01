document.addEventListener("DOMContentLoaded", function() {
    var labels = JSON.parse('{{ labels|safe }}');
    var values = JSON.parse('{{ values|safe }}');

    var modifiedValues = values.map(function(value) {
        return value === 0 ? 0.01 : value;
    });

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Sentimiento',
                data: modifiedValues,
                backgroundColor: modifiedValues.map(function(value) {
                    return value >= 0 ? 'rgba(75, 192, 192, 0.2)' : 'rgba(255, 99, 132, 0.2)';
                }),
                borderColor: modifiedValues.map(function(value) {
                    return value >= 0 ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)';
                }),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.6)'
                    },
                    ticks: {
                        color: 'white' 
                    }
                },
                y: {
                    ticks: {
                        color: 'white' 
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.6)' 
                    }
                }
            },
            plugins: {
                legend: {
                    display: false // Ocultar la leyenda por defecto de Chart.js
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let value = context.raw;
                            return value === 0.01 ? '0' : value;
                        }
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
});

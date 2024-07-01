document.addEventListener('DOMContentLoaded', function() {
    var data = JSON.parse('{{ data|safe }}');

    // Transformar los valores para que sean más manejables
    var transformedData = data.map(function(item) {
        return {
            text: item.text,
            size: Math.sqrt(item.size) // Usar la raíz cuadrada para reducir el tamaño
        };
    });

    var labels = transformedData.map(function(item) {
        return item.text;
    });

    var values = transformedData.map(function(item) {
        return item.size;
    });

    var originalValues = data.map(function(item) {
        return item.size;
    });

    var config = {
        type: 'wordCloud',
        data: {
            labels: labels,
            datasets: [{
                label: 'Frecuencia de Palabras',
                data: values
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false  // Deshabilitar el tooltip
                },
                wordcloud: {
                    font: 'Roboto, sans-serif',
                    fontSizeMin: 12,
                    fontSizeMax: 60,
                    rotation: {
                        min: 0,
                        max: 0
                    },
                    spiral: 'rectangular',
                    padding: 5,
                }
            }
        }
    };

    var ctx = document.getElementById('cloudMapChart').getContext('2d');
    var cloudMapChart = new Chart(ctx, config);
});

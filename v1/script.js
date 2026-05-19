document.addEventListener('DOMContentLoaded', function() {
    // Set the initial description
    document.getElementById('description').innerHTML = "This is an investment game to demonstrate the irrationality in the investment. The price of a single Tulip Bulb is $5 at the beginning. You can choose either Keep/Buy or Sell at each round. After 10 rounds, compare your final amount and chart with others.";

    // Initialize the line chart for actual money changes
    const ctx = document.getElementById('moneyChart').getContext('2d');
    const moneyChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: 10}, (_, i) => i + 1), // Rounds 1 to 10
            datasets: [
                {
                    label: 'Money Over Rounds',
                    data: [5], // Starting with the initial money
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                    pointRadius: 3 // Show points
                },
                {
                    label: 'Market Price',
                    data: [5], // Starting with the initial market price
                    fill: false,
                    borderColor: 'rgb(255, 99, 132)',
                    tension: 0.1,
                    pointRadius: 3 // Show points
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });

    let money = 5; // Starting money
    let marketPrice = 5; // Starting market price
    let roundsLeft = 10; // Total rounds
    const values = [5, 10, 90, 100, 160, 170, 180, 190, 200, 1, 1]; // Money values for each round
    const multipliers = values.slice(1).map((value, index) => value / values[index]);

    document.getElementById('keep').addEventListener('click', function() {
        if (roundsLeft > 0) {
            money *= multipliers[10 - roundsLeft]; // Apply the multiplier for the current round
            marketPrice *= multipliers[10 - roundsLeft]; // Update market price in the same way
            roundsLeft--;
            document.getElementById('money').textContent = `Current Money: $${money.toFixed(2)}`;
            document.getElementById('rounds-left').textContent = `Rounds Left: ${roundsLeft}`;
            document.getElementById('current-round').textContent = `Current Round: ${10 - roundsLeft}`;
            moneyChart.data.datasets[0].data.push(money); // Add the new money amount to the chart
            moneyChart.data.datasets[1].data.push(marketPrice); // Add the new market price to the chart
            moneyChart.update(); // Redraw the chart with the new data
            if (roundsLeft === 0) {
                document.getElementById('message').textContent = `Game Over. Your final amount is $${money.toFixed(2)}.`;
                document.getElementById('keep').disabled = true;
                document.getElementById('sell').disabled = true;
            }
        }
    });

    document.getElementById('sell').addEventListener('click', function() {
        if (roundsLeft > 0) {
            marketPrice *= multipliers[10 - roundsLeft]; // Update market price even if you sell
            roundsLeft--;
            document.getElementById('money').textContent = `Current Money: $${money.toFixed(2)}`;
            document.getElementById('rounds-left').textContent = `Rounds Left: ${roundsLeft}`;
            document.getElementById('current-round').textContent = `Current Round: ${10 - roundsLeft}`;
            moneyChart.data.datasets[0].data.push(money); // Add the current money amount to the chart
            moneyChart.data.datasets[1].data.push(marketPrice); // Add the new market price to the chart
            moneyChart.update(); // Redraw the chart with the new data
            if (roundsLeft === 0) {
                document.getElementById('message').textContent = `Game Over. Your final amount is $${money.toFixed(2)}.`;
                document.getElementById('keep').disabled = true;
                document.getElementById('sell').disabled = true;
            }
        }
    });
});

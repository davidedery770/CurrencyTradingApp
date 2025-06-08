// Function to format numbers with commas
function formatNumber(num) {
    return num.toLocaleString();
}

// SignalR connection setup
const connection = new signalR.HubConnectionBuilder()
    .withUrl("/tradehub") // Ensure this matches your SignalR Hub path in Program.cs
    .withAutomaticReconnect()
    .build();

// --- Event Listeners for SignalR Updates ---

// Listener for individual currency pair updates
connection.on("ReceiveTradeUpdate", (tradeData) => {
    // console.log("Received trade update:", tradeData);
    updateCurrencyPairCard(tradeData);
    updateCurrencyPairTableRow(tradeData);
});

// Listener for dashboard summary updates
connection.on("ReceiveSummaryUpdate", (summaryData) => {
    // console.log("Received summary update:", summaryData);
    updateDashboardSummary(summaryData);
});

// --- UI Update Functions ---

// Updates an individual currency pair card
function updateCurrencyPairCard(data) {
    const pairId = data.id;

    const rateElement = document.getElementById(`card-rate-${pairId}`);
    const changeElement = document.getElementById(`card-change-${pairId}`);
    const minElement = document.getElementById(`card-min-${pairId}`);
    const maxElement = document.getElementById(`card-max-${pairId}`);
    const volumeElement = document.getElementById(`card-volume-${pairId}`);
    const trendIconElement = document.getElementById(`card-trend-icon-${pairId}`); // Use the new ID for the icon

    if (rateElement) {
        rateElement.textContent = data.currentRate.toFixed(4);
    }
    if (changeElement) {
        changeElement.textContent = `${(data.changePercentage >= 0 ? "+" : "") + data.changePercentage.toFixed(2)}%`; // Add '+' for positive changes
        changeElement.classList.remove('up', 'down');
        if (data.trend === 0) { // Up = 0 (based on C# enum)
            changeElement.classList.add('up');
        } else if (data.trend === 1) { // Down = 1
            changeElement.classList.add('down');
        }
    }
    if (minElement) {
        minElement.textContent = data.minValue.toFixed(4);
    }
    if (maxElement) {
        maxElement.textContent = data.maxValue.toFixed(4);
    }
    if (volumeElement) {
        volumeElement.textContent = formatNumber(data.volume);
    }
    if (trendIconElement) {
        trendIconElement.classList.remove('fa-arrow-trend-up', 'fa-arrow-trend-down', 'fa-minus', 'up', 'down');
        if (data.trend === 0) {
            trendIconElement.classList.add('fa-arrow-trend-up', 'up');
        } else if (data.trend === 1) {
            trendIconElement.classList.add('fa-arrow-trend-down', 'down');
        } else {
            trendIconElement.classList.add('fa-minus');
        }
    }
}

// Updates a row in the "Live Currency Pairs" table
function updateCurrencyPairTableRow(data) {
    const rowElement = document.getElementById(`row-${data.id}`);
    if (rowElement) {
        rowElement.querySelector('.current-rate-col').textContent = data.currentRate.toFixed(4);

        const changeCell = rowElement.querySelector('.change-col'); // Use the new class 'change-col'
        changeCell.textContent = `${(data.changePercentage >= 0 ? "+" : "") + data.changePercentage.toFixed(2)}%`; // Add '+' for positive changes
        changeCell.classList.remove('up', 'down');
        if (data.trend === 0) {
            changeCell.classList.add('up');
        } else if (data.trend === 1) {
            changeCell.classList.add('down');
        }

        rowElement.querySelector('td:nth-child(4)').textContent = data.minValue.toFixed(4); // Min
        rowElement.querySelector('td:nth-child(5)').textContent = data.maxValue.toFixed(4); // Max
        rowElement.querySelector('td:nth-child(6)').textContent = formatNumber(data.volume); // Volume

        const trendIcon = rowElement.querySelector('.trend-icon');
        if (trendIcon) {
            trendIcon.classList.remove('fa-arrow-trend-up', 'fa-arrow-trend-down', 'fa-minus', 'up', 'down'); // Remove all previous
            if (data.trend === 0) { // Up
                trendIcon.classList.add('fa-arrow-trend-up', 'up');
            } else if (data.trend === 1) { // Down
                trendIcon.classList.add('fa-arrow-trend-down', 'down');
            } else { // Neutral
                trendIcon.classList.add('fa-minus');
            }
        }

        rowElement.querySelector('.last-update-col').textContent = new Date(data.lastUpdate).toLocaleTimeString();
    }
}

// Updates the top dashboard summary cards
function updateDashboardSummary(data) {
    document.getElementById('totalVolume').textContent = formatNumber(data.totalVolume);

    const avgChangeElement = document.getElementById('averageChange');
    avgChangeElement.textContent = `${data.averageChange.toFixed(2)}%`;
    avgChangeElement.classList.remove('up', 'down'); // Clear existing classes
    if (data.averageChange >= 0) {
        avgChangeElement.classList.add('up');
    } else {
        avgChangeElement.classList.add('down');
    }

    document.getElementById('risingPairs').textContent = data.risingPairs;
    document.getElementById('fallingPairs').textContent = data.fallingPairs;
}


// --- Button Event Handlers ---

document.getElementById('startSimulationBtn').addEventListener('click', () => {
    fetch('/api/simulation/start', { method: 'POST' })
        .then(response => {
            if (response.ok) {
                console.log('Simulation start request sent.');
            } else {
                console.error('Failed to send simulation start request.');
            }
        })
        .catch(error => console.error('Error sending simulation start request:', error));
});

document.getElementById('refreshBtn').addEventListener('click', () => {
    fetch('/api/data/current')
        .then(response => response.json())
        .then(data => {
            if (data.currencyPairs) {
                data.currencyPairs.forEach(pair => {
                    updateCurrencyPairCard(pair);
                    updateCurrencyPairTableRow(pair);
                });
            }
            if (data.summary) {
                updateDashboardSummary(data.summary);
            }
            console.log('Dashboard refreshed with current data.');
        })
        .catch(error => console.error('Error refreshing data:', error));
});


// --- Initial SignalR Connection ---
connection.start()
    .then(() => console.log("SignalR Connected!"))
    .catch(err => console.error("SignalR connection error: ", err));
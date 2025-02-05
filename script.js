let cryptoData = [];

// Fetch data from the API
async function fetchData() {
    try {
        const response = await fetch('API_ENDPOINT');  // Replace with the actual API endpoint
        const data = await response.json();
        cryptoData = data.map(item => ({
            name: item.name,
            id: item.id,
            image: item.image,
            symbol: item.symbol,
            current_price: item.current_price,
            total_volume: item.total_volume,
            market_cap: item.market_cap,
            percentage_change: item.percentage_change
        }));
        renderTable(cryptoData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Render data into the table
function renderTable(data) {
    const tableBody = document.querySelector('#cryptoTable tbody');
    tableBody.innerHTML = '';  // Clear previous rows
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.id}</td>
            <td><img src="${item.image}" alt="${item.name}"></td>
            <td>${item.symbol}</td>
            <td>${item.current_price}</td>
            <td>${item.total_volume}</td>
            <td>${item.market_cap}</td>
            <td>${item.percentage_change}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Search functionality
document.getElementById('searchInput').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const filteredData = cryptoData.filter(item => item.name.toLowerCase().includes(searchTerm));
    renderTable(filteredData);
});

// Sorting by Market Cap
document.getElementById('sortMarketCap').addEventListener('click', () => {
    const sortedData = cryptoData.sort((a, b) => b.market_cap - a.market_cap);
    renderTable(sortedData);
});

// Sorting by Percentage Change
document.getElementById('sortPercentageChange').addEventListener('click', () => {
    const sortedData = cryptoData.sort((a, b) => b.percentage_change - a.percentage_change);
    renderTable(sortedData);
});

// Initial data fetch
fetchData();

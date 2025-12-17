// Simulates fetching data from external APIs
const fetchPrices = async (query) => {
    // In a real app, this would call Puppeteer or multiple APIs
    // For now, we return realistic dummy data based on the query

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const vendors = ['Amazon', 'eBay', 'Walmart'];
    const results = [];

    vendors.forEach(vendor => {
        const basePrice = Math.floor(Math.random() * 500) + 50; // Random price between 50 and 550
        const variance = Math.floor(Math.random() * 20);

        results.push({
            title: `${query} - ${vendor} Edition`,
            price: basePrice + (Math.random() > 0.5 ? variance : -variance),
            currency: 'USD',
            image: `https://via.placeholder.com/300?text=${encodeURIComponent(query)}+${vendor}`, // Placeholder
            link: '#',
            vendor: vendor,
            rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 to 5.0
            reviews: Math.floor(Math.random() * 1000)
        });
    });

    return results.sort((a, b) => a.price - b.price); // Sort by lowest price
};

module.exports = { fetchPrices };

const { scrapePrices } = require('./services/realScraper');

console.log('Testing Scrapers for "Samsung Galaxy"...');
console.log('This may take 10-30 seconds...');

scrapePrices('Samsung Galaxy')
    .then(results => {
        console.log('Scraping Complete!');
        console.log(`Found ${results.length} items.`);
        console.log(JSON.stringify(results, null, 2));
    })
    .catch(err => {
        console.error('Test Failed:', err);
    });

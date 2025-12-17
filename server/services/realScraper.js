const puppeteer = require('puppeteer');

const scrapeDaraz = async (browser, query) => {
    const page = await browser.newPage();
    try {
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        // Filter by lowest price by adding &sort=priceasc
        await page.goto(`https://www.daraz.pk/catalog/?q=${encodeURIComponent(query)}&sort=priceasc`, { waitUntil: 'domcontentloaded', timeout: 30000 });

        const results = await page.evaluate(() => {
            const items = document.querySelectorAll('.gridItem--Yd0sa'); // Check current Daraz class names, this might need dynamic adjustment
            // Fallback if class names changed, look for generic structure or other common selectors
            // Often grid items have data-qa-locator="product-item"

            const data = [];
            items.forEach((item, index) => {
                if (index > 4) return; // Limit to top 5 items

                const titleEl = item.querySelector('.title--wFj93 a');
                const priceEl = item.querySelector('.price--NVBKu .currency--GVKjl');
                const priceValEl = item.querySelector('.price--NVBKu');
                const imgEl = item.querySelector('.mainPic--ehOdr img');

                if (titleEl && priceValEl) {
                    let priceText = priceValEl.innerText.replace('Rs.', '').replace(',', '').trim();
                    // Handle potential currency symbol duplication in text
                    priceText = priceText.replace(/[^\d]/g, '');

                    data.push({
                        vendor: 'Daraz',
                        title: titleEl.getAttribute('title') || titleEl.innerText,
                        price: parseInt(priceText) || 0,
                        currency: 'PKR',
                        link: titleEl.href,
                        image: imgEl ? imgEl.src : '',
                        rating: 0, // Harder to scrape reliably without deeper nav
                        reviews: 0
                    });
                }
            });
            return data;
        });
        return results;
    } catch (error) {
        console.error('Error scraping Daraz:', error);
        return [];
    } finally {
        await page.close();
    }
};

const scrapeTelemart = async (browser, query) => {
    const page = await browser.newPage();
    try {
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        await page.goto(`https://www.telemart.pk/search?q=${encodeURIComponent(query)}`, { waitUntil: 'domcontentloaded', timeout: 30000 });

        // Wait for results to load
        // Telemart might be SPA, waiting for a selector is safer
        try {
            await page.waitForSelector('.product-item', { timeout: 5000 });
        } catch (e) { }

        const results = await page.evaluate(() => {
            const items = document.querySelectorAll('.product-item');
            const data = [];
            items.forEach((item, index) => {
                if (index > 4) return;

                const titleEl = item.querySelector('.product-name a');
                const priceEl = item.querySelector('.price-box .price'); // Check selectors
                const imgEl = item.querySelector('.product-image-photo');

                if (titleEl && priceEl) {
                    let priceText = priceEl.innerText.replace('Rs.', '').replace(',', '').trim();
                    priceText = priceText.replace(/[^\d]/g, '');

                    data.push({
                        vendor: 'Telemart',
                        title: titleEl.innerText.trim(),
                        price: parseInt(priceText) || 0,
                        currency: 'PKR',
                        link: titleEl.href,
                        image: imgEl ? imgEl.src : '',
                        rating: 0,
                        reviews: 0
                    });
                }
            });
            return data;
        });
        return results;
    } catch (error) {
        console.error('Error scraping Telemart:', error);
        return [];
    } finally {
        await page.close();
    }
};

const scrapePrices = async (query) => {
    const browser = await puppeteer.launch({
        headless: true, // Set to false to see it happen (debug)
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-accelerated-2d-canvas', '--no-first-run', '--no-zygote', '--single-process', '--disable-gpu']
    });

    try {
        const [darazResults, telemartResults] = await Promise.all([
            scrapeDaraz(browser, query),
            scrapeTelemart(browser, query) // Add more here
        ]);

        const allResults = [...darazResults, ...telemartResults];
        return allResults.sort((a, b) => a.price - b.price);

    } catch (error) {
        console.error('Scraping failed:', error);
        return [];
    } finally {
        await browser.close();
    }
};

module.exports = { scrapePrices };

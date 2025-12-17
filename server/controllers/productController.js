const Product = require('../models/Product');
const { scrapePrices } = require('../services/realScraper');
const { Op } = require('sequelize');

exports.searchProducts = async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ msg: 'Query parameter is required' });
    }

    try {
        // 1. Check if we have recent cached results in DB (Optional optimization)
        // For this MVP, we will always "scrape" fresh data to demonstrate real-time comparison

        // 2. Fetch prices from "scrapers"
        const scrapedData = await scrapePrices(query);

        // 3. Save/Update these results to our DB (acting as a cache/history)
        // We'll just return them directly for the UI to be fast

        res.json(scrapedData);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getSavedProducts = async (req, res) => {
    // To be implemented for Watchlist
    res.json([]);
};

import React from 'react';

const ProductCard = ({ product }) => {
    const { title, price, currency, vendor, image, rating, reviews, link } = product;

    // Vendor specific colors (optional)
    const getVendorColor = (v) => {
        switch (v.toLowerCase()) {
            case 'amazon': return '#FF9900';
            case 'ebay': return '#E53238';
            case 'walmart': return '#0071DC';
            default: return 'var(--primary)';
        }
    };

    return (
        <div className="glass-panel" style={{
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            transition: 'transform 0.2s',
            cursor: 'default'
        }}>
            <div style={{
                position: 'relative',
                height: '200px',
                background: 'white',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <img src={image} alt={title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                <span style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: getVendorColor(vendor),
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                }}>
                    {vendor}
                </span>
            </div>

            <div style={{ flex: 1 }}>
                <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.1rem',
                    marginBottom: '0.5rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                    {title}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fbbf24', fontSize: '0.9rem' }}>
                    <span>★ {rating}</span>
                    <span style={{ color: 'var(--text-muted)' }}>({reviews} reviews)</span>
                </div>
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 'auto',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(255,255,255,0.1)'
            }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-main)' }}>
                    {currency === 'PKR' ? 'Rs.' : currency} {price.toLocaleString()}
                </div>
                <button
                    className="btn-primary"
                    onClick={() => window.open(link, '_blank')}
                    style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                >
                    View Deal
                </button>
            </div>
        </div>
    );
};

export default ProductCard;

import React, { useRef } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';

const MOCK_PRODUCTS = [
    {
        id: '1',
        title: 'HUION HS64 Graphics...',
        price: 2044.00,
        mrp: 4499.00,
        discountPercentage: 54,
        imageUrl: 'https://images-eu.ssl-images-amazon.com/images/I/51dAV1h36zL._AC_UL450_SR450,360_.jpg',
        isDeal: false,
        reviewCount: 4890,
        rating: 4.5
    },
    {
        id: '2',
        title: 'Digiroot Upgrade iPad Pencil for Apple, 2IN1...',
        price: 1286.00,
        mrp: 2699.00,
        discountPercentage: 54,
        imageUrl: 'https://images-eu.ssl-images-amazon.com/images/I/51dAV1h36zL._AC_UL450_SR450,360_.jpg',
        isDeal: true,
        dealLabel: "Republic Day Deal",
        reviewCount: 916,
        rating: 4
    },
    {
        id: '3',
        title: 'iClever Bluetooth Mouse MD172, Wireless Dual...',
        price: 2299.00,
        mrp: 3999.00,
        discountPercentage: 43,
        imageUrl: 'https://images-eu.ssl-images-amazon.com/images/I/51dAV1h36zL._AC_UL450_SR450,360_.jpg',
        isDeal: true,
        dealLabel: "Republic Day Deal",
        reviewCount: 2725,
        rating: 4
    },
    {
        id: '4',
        title: 'Portronics Power Shutter 20000mAh 15W...',
        price: 1849.00,
        mrp: 5999.00,
        discountPercentage: 69,
        imageUrl: 'https://images-eu.ssl-images-amazon.com/images/I/51dAV1h36zL._AC_UL450_SR450,360_.jpg',
        isDeal: false,
        reviewCount: 240,
        rating: 4.5
    },
    {
        id: '5',
        title: 'Spigen Rugged Armor Pro Hard Shell...',
        price: 2435.00,
        mrp: 3999.00,
        discountPercentage: 39,
        imageUrl: 'https://images-eu.ssl-images-amazon.com/images/I/51dAV1h36zL._AC_UL450_SR450,360_.jpg',
        isDeal: true,
        dealLabel: "Republic Day Deal",
        reviewCount: 1414,
        rating: 4.5
    },
    {
        id: '6',
        title: 'for MacBook Pro 16 inch Case M4 2025 2024...',
        price: 2240.00,
        mrp: 4718.00,
        discountPercentage: 53,
        imageUrl: 'https://images-eu.ssl-images-amazon.com/images/I/51dAV1h36zL._AC_UL450_SR450,360_.jpg',
        isDeal: true,
        dealLabel: "Republic Day Deal",
        reviewCount: 715,
        rating: 4.5
    },
    {
        id: '7',
        title: 'Camlin Kokuyo PB White Board Marker (Pack of...',
        price: 108.00,
        mrp: 125.00,
        discountPercentage: 14,
        imageUrl: 'https://images-eu.ssl-images-amazon.com/images/I/51dAV1h36zL._AC_UL450_SR450,360_.jpg',
        isDeal: false,
        reviewCount: 8008,
        rating: 4.5
    }
];

const Home: React.FC = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-[1500px] mx-auto bg-[#e3e6e6]">
            <div className="bg-white p-5 rounded-sm shadow-sm relative">
                {/* Header */}
                <div className="flex justify-between items-baseline mb-4">
                    <div className="flex items-baseline gap-2">
                        <h2 className="text-[21px] font-bold text-[#444]">Order from your Lists</h2>
                        <a href="#" className="text-[13px] text-[#007185] hover:text-[#c7511f] hover:underline">See All</a>
                    </div>
                    <span className="text-[13px] text-[#565959]">Page 1 of 3</span>
                </div>

                {/* Left Arrow */}
                <button
                    onClick={scrollLeft}
                    className="absolute left-2 top-[55%] -translate-y-1/2 z-10 bg-white border border-gray-300 shadow-md h-[40px] w-[30px] flex items-center justify-center rounded-[3px] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#007185]"
                >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>

                {/* Carousel Container */}
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory no-scrollbar scroll-smooth px-1"
                >
                    {MOCK_PRODUCTS.map(product => (
                        <div key={product.id} className="min-w-[220px] max-w-[220px] snap-start flex-shrink-0 h-full">
                            <ProductCard
                                {...product}
                            />
                        </div>
                    ))}
                </div>

                {/* Right Arrow */}
                <button
                    onClick={scrollRight}
                    className="absolute right-2 top-[55%] -translate-y-1/2 z-10 bg-white border border-gray-300 shadow-md h-[40px] w-[30px] flex items-center justify-center rounded-[3px] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#007185]"
                >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
            </div>
        </div>
    );
};

export default Home;
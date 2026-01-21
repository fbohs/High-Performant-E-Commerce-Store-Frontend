import React from 'react';

interface ProductCardProps {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    mrp?: number;
    discountPercentage?: number;
    isDeal?: boolean;
    dealLabel?: string;
    rating?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
    title,
    price,
    imageUrl,
    mrp,
    discountPercentage,
    isDeal,
    dealLabel = "Republic Day Deal"
}) => {
    // Format price to always show 2 decimal places
    const formattedPrice = price.toFixed(2);
    const formattedMrp = mrp?.toFixed(2);

    return (
        <div className="bg-white border border-gray-200 rounded-lg w-full h-full p-4 shadow-[0_2px_5px_rgba(0,0,0,0.05)] transition-all duration-300 ease-in-out flex flex-col cursor-pointer font-sans hover:shadow-[0_8px_15px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 group">
            <div className="w-full h-[200px] flex items-center justify-center mb-3 overflow-hidden bg-gray-50 rounded">
                <img src={imageUrl} alt={title} className="max-w-full max-h-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-105" />
            </div>

            <div className="flex flex-col gap-1">
                <h3 className="text-base font-semibold text-gray-800 m-0 leading-snug overflow-hidden line-clamp-2" title={title}>{title}</h3>

                <div className="flex items-baseline mt-2 text-black">
                    <span className="text-sm font-medium mr-0.5">₹</span>
                    <span className="text-xl font-bold">{formattedPrice}</span>
                </div>

                {mrp && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <span className="line-through">₹{formattedMrp}</span>
                        {discountPercentage && (
                            <span className="font-medium">({discountPercentage}% off)</span>
                        )}
                    </div>
                )}

                {isDeal && (
                    <div className="flex items-center gap-2 mt-2">
                        <span className="bg-[#cc0c39] text-white px-2 py-1 rounded text-xs font-bold">{discountPercentage}% off</span>
                        <span className="text-[#cc0c39] text-[13px] font-bold">{dealLabel}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCard;

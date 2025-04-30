import React from 'react'
import Alpha from './Alpha';
import Review from './Review';
import ProductCard from './ProductCard';
import Last from './Last';

const SetComp = () => {
    return (
        <div className="w-full lg:flex  gap-2 p-4">
            <div className="lg:w-[80%] w-full">
                <Alpha />
                <Review />
                <ProductCard />

            </div>
            <div className="lg:w-[30%] ">
                <Last />
            </div>

        </div>
    )
}

export default SetComp;
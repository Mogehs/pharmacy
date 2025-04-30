import React from 'react'
import SliderHome from './SliderHome'
import DropDownMenus from './DropDownMenus'
import Category from './Category'
import CapsuleImg from './CapsuleImg'
import PopularCategory from './PopularCategory'
import NewestProduct from './NewestProduct'
import FeatureProduct from './FeatureProduct'
import SpecialOffer from './SpecialOffer'

const Hero = () => {
    return (
        <div>
            <SliderHome/>
            <DropDownMenus/>
            <Category/>
            <CapsuleImg/>
            <PopularCategory/>
            <NewestProduct/>
            <FeatureProduct/>
            <SpecialOffer/>
        </div>
    )
}

export default Hero
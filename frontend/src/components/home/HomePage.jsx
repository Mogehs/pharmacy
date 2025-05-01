import React from 'react'
import SliderHome from './SliderHome'
import DropDownMenus from './DropDownMenus'
import Category from './Category'
import CapsuleImg from './CapsuleImg'
import PopularCategory from './PopularCategory'
import NewestProduct from './NewestProduct'
import FeatureProduct from './FeatureProduct'
import SpecialOffer from './SpecialOffer'
import MoreLove from './MoreLove'
import SuretyBox from './SuretyBox'

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
            <MoreLove/>
            <SuretyBox/>
            <PopularCategory/>
        </div>
    )
}

export default Hero
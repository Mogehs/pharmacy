import React from 'react'
import Hero from '../components/about/Hero'
import AboutIncrease from '../components/about/AboutIncrease'
import WhatMakes from '../components/about/WhatMakes'
import Whychoose from '../components/about/WhyChoose'
import AboutCrousel from '../components/about/AboutCrousel'
import AboutFollow from '../components/about/AboutFollow'
import AboutNewsletter from '../components/about/AboutNewsletter'

const About = () => {
    return (
        <div>
            <Hero />
            <AboutIncrease/>
            <WhatMakes/>
            <Whychoose/>
            <AboutCrousel/>
            <AboutFollow/>
            <AboutNewsletter/>
        </div>
    )
}

export default About
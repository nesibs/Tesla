import React from 'react'

const Footer = () => {
  return (
    <>
       <div className='flex justify-center items-start flex-col text-[12px] container lg:px-40 text-[#5C5E62]  '>
            <p className=' mt-20 lg:px-32'>
                <sup>1</sup>
                 Model S and Model X included only when purchased through <span className='border-b hover:border-b-2 transition'>inventory</span> and must be model year 2025.
                 Frost Blue Metallic excluded. New vehicles and U.S. only. Subject to availability. The cost of the color upgrade will be removed from the final price 
                 prior to delivery.
            </p>
              <p className=' mt-10 lg:px-32'>
                <sup>2</sup>
                 Model X All-Wheel Drive starts at $91,630. Price includes Destination and Order Fees but exclude taxes and other fees. Subject to change. Vehicle shown has upgrades that will increase the price.
            </p>
              <p className=' mt-10 lg:px-32'>
                <sup>3</sup>
                 Model S All-Wheel Drive starts at $86,630. Price includes Destination and Order Fees but exclude taxes and other fees. Subject to change. Vehicle shown has upgrades that will increase the price.
            </p>
       </div>
       <div className='text-[12px] text-[#5C5E62]  font-semibold container flex justify-center items-center'>
        <ul className='flex   items-center flex-col md:flex-row py-10 gap-5'>
            <li>Tesla © 2025</li>
            <li>Privacy & Legal</li>
            <li>Vehicle Recalls</li>
            <li className='hidden md:block'>Contact</li>
            <li>News</li>
            <li className='hidden md:block'>Get Updates</li>
            <li className='hidden md:block'>Locations</li>
            <li>Learn</li> 
        </ul>
       </div>
    </>
  )
}

export default Footer

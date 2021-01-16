import React from 'react'
import searchimage from '../assets/waiting.png'

const SearchNow = () => {

    return(
        <div className="text-center"> 
            <img src={searchimage} alt="Image_Search" className="imagesearch"/>
            <p>Waiting to search!</p>
        </div>
    )
}

export default SearchNow
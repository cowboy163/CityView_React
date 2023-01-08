import './css/App.css'
import SearchBar from "./SearchBar";
import {useEffect, useState} from "react";
import axios from "axios";
import {AccessKey, DefaultValue, Url} from "./const";
import Carousel from "./Carousel";

const App = () => {
    const [searchValue, setSearchValue] = useState(DefaultValue)
    const [images, setImages] = useState([])
    const [bgIndex, setBgIndex] =useState(0)
    const fetchData = (searchItem) => {
        axios.get(Url,{
            params: {
                query: searchItem,
                orientation: 'landscape',
            },
            headers: {
                Authorization: `Client-ID ${AccessKey}`
            }
        }).then(res => {
            const newData = res.data.results.map(item => ({
                description: item.alt_description,
                thumb: item.urls.thumb,
                regular: item.urls.regular,
            }))
            console.log("tidied data: ", newData)
            setImages(newData)
        })
    }
    useEffect(()=>{
        searchValue && fetchData(searchValue)
        setBgIndex(0)
    },[searchValue])

    return(
        <div className='app'
             style={{background: (images.length > 0) &&`url(${images[bgIndex].regular}) no-repeat center center/cover fixed`}}
        >
            <h3>{(images.length > 0) &&images[bgIndex].description}</h3>
            <SearchBar passedValue={setSearchValue}/>
            <Carousel passedValue={images} getIndex={setBgIndex}/>
        </div>
    )
}

export default App
import './css/Carousel.css'
import {createRef, useEffect, useState} from "react";


const Carousel = ({passedValue, getIndex}) => {
    const [active, setActive] = useState(0)
    const myRef = createRef()
    const handleClick = (index) => {
        getIndex(index)
        setActive(index)
    }
    useEffect(() => {
        const newArr = myRef.current.children
        if (newArr.length > 0) {
            for (let i = 0; i < newArr.length; i++) {
                newArr[i].className = ''
            }
            newArr[active].className = 'active'
        }

    }, [active, myRef])
    useEffect(() => {
        setActive(0)
    },[passedValue])
    return (
        <div className='carousel'
             ref={myRef}
        >
            {
                passedValue.map((item, index) => (
                    <div key={index}
                         style={{background: `url('${item.thumb}') no-repeat center center/cover`}}
                         onClick={() => handleClick(index)}
                         onMouseEnter={() => getIndex(index)}
                         onMouseLeave={() => getIndex(active)}
                         className = {index === 0 ? 'active' : ''}
                    ></div>
                ))
            }
        </div>
    )
}

export default Carousel
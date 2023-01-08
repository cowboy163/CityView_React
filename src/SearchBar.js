import './css/SearchBar.css'
import {createRef} from "react";



const SearchBar = ({passedValue}) => {
    const myRef = createRef()
    const handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            handleClick()
        }

    }
    const handleClick = () => {
        console.log('the input is:', myRef.current.value)
        passedValue(myRef.current.value.trim().toLowerCase())
        myRef.current.value = ''
    }
    return(
        <div className='searchBar'>
            <input type="text"
                   placeholder='Search Photos...'
                   onKeyDown={handleKeyDown}
                   ref={myRef}
            />
            <button onClick={handleClick} >Search</button>
        </div>
    )
}

export default SearchBar
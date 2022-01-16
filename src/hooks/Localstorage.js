import { useEffect, useState } from "react"

const Localstorage = (key, initialValue) => {
    let [value, setValue] = useState(()=> localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)): initialValue);

    useEffect(()=> {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key,value])

    return [value, setValue]
}

export default Localstorage
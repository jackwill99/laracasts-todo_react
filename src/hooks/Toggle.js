import { useState } from "react"

function Toggle(initialState = true) {
    let [visible,setVisible] = useState(initialState)  

    function toggle() {
        setVisible(previous => !previous)
    }
    // 🛠 setVisible use the functional style, because the updated value is based on the previous value

    return [visible, toggle]
}

export default Toggle
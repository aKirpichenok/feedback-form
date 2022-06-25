import { useState } from "react"
import useValidation from "./useValidation"


const useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue)
    const [dirty, setDirty] = useState(false)
    const valid = useValidation(value, validations)


    const onChange = e => {
        validations.type === 'name' ? setValue(e.target.value.toUpperCase()) : setValue(e.target.value)
    }

    const onBlur = e => {
        setDirty(true)
    }

    const clear = () => {
        setValue('')
        setDirty(false)
    }

    return {
        value,
        dirty,
        onChange,
        onBlur,
        clear,
        ...valid
    }
}

export default useInput
import { useState } from "react"
import useValidation from "./useValidation"
import { validationDescription } from "leaflet"
import { numbersPhone } from '../constants'



const useInput = (initialValue: string, validations: validationDescription) => {
    const [value, setValue] = useState(initialValue)
    const [dirty, setDirty] = useState(false)
    const valid = useValidation(value, validations)


    const onChange = (e: any) => {
        if(validations.phone) {
          return numbersPhone.includes(e.target.value[e.target.value.length-2]) ? setValue(e.target.value.replace(/[^\d|+]/g,'')) : null
        } else {
            validations.type === 'name' ? setValue(e.target.value.toUpperCase()) : setValue(e.target.value)
        }
    }

    const onBlur = (e: any) => {
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
        setValue,
        ...valid
    }
}

export default useInput
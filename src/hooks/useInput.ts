import { useState } from "react"
import useValidation from "./useValidation"
import { validationDescription } from "leaflet"
import { numbersPhone, testName } from '../constants'



const useInput = (initialValue: string, validations: validationDescription) => {
    const [value, setValue] = useState(initialValue)
    const [dirty, setDirty] = useState(false)
    const valid = useValidation(value, validations)


    const onChange = (e: any) => {
        if(validations.phone) {
          return numbersPhone.includes(e.target.value[e.target.value.length-2]) ? setValue(e.target.value.replace(/[^\d|+]/g,'')) : null
        } else if(validations.type === 'name') {
            if(e.target.value[0] === ' ') return null
            const name = e.target.value.split(' ')
            if (name.length < 2) return setValue(name.join(' ').toUpperCase())
            name.length = 2
            return testName.test(name.join(' ')) ? setValue(name.join(' ').toUpperCase()) : null
        }else {
            setValue(e.target.value)
        }
    }

    const onBlur = (e: any) => {
        setDirty(true)
    }

    const clear = () => {
        if(validations.phone){
            setValue('+7')
            setDirty(false)
        }else {
            setValue('')
            setDirty(false)
        }
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
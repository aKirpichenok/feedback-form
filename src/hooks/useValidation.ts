import { useEffect, useState } from "react"
import { validationDescription } from "leaflet"
import { mailValidConstant, phoneMaskConstant } from "../constants"

const useValidation = (value: string, validations: validationDescription) => {
    const [isEmpty, setIsEmpty] = useState<boolean>(true)
    const [minLength, setMinLength] = useState<boolean>(false)
    const [maxLength, setMaxLength] = useState<boolean>(false)
    const [wordsCount, setWordsCount] = useState<boolean>(false)
    const [spacesCount, setSpacesCount] = useState<boolean>(false)
    const [mailValid, setmailValid] = useState<boolean>(false)
    const [phoneValid, setPhoneValid] = useState<boolean>(false)
    const [inputValid, setInputValid] = useState<boolean>(false)
    const [dateValid, setDateValid] = useState<boolean>(false)

    const countSpaces = (str: string): number => {
        let a = 0
        for (let i = 0; i < str.length; i++) {
            if (str[i] === ' ') {
                a += 1
            }
        }
        return a
    }

    const phoneMask = (phone: string): boolean => {
        return phoneMaskConstant.test(phone);
    }

    const validMail = (mail: string): boolean => {
        return mailValidConstant.test(mail)
    }

    const validDate = (date: string): boolean => {
        const dateArr = date.split('-')
        const [year, ,]: string[] = dateArr
        return +year > 1950 && +year < 2023
    }

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'minLength':
                    value.split(' ')
                    .some((item: string) => item.length < validations[validation]!) ? 
                    setMinLength(true) : setMinLength(false)
                    break;
                case 'maxLength':
                    value.split(' ')
                    .some((item: string) => item.length > validations[validation]!) ? 
                    setMaxLength(true) : setMaxLength(false)
                    break;
                case 'isEmpty':
                    value ? setIsEmpty(false) : setIsEmpty(true)
                    break;
                case 'words':
                    value.split(' ').length === validations[validation] ? setWordsCount(false) : setWordsCount(true)
                    break;
                case 'spaces':
                    countSpaces(value) === 1 ? setSpacesCount(false) : setSpacesCount(true)
                    break;
                case 'mail':
                    validMail(value) ? setmailValid(false) : setmailValid(true)
                    break;
                case 'phone':
                    phoneMask(value) ? setPhoneValid(false) : setPhoneValid(true)
                    break;
                case 'date':
                    validDate(value) ? setDateValid(false) : setDateValid(true)
                    break;
                case 'minLengthMessage':
                    value.trim().length < validations[validation]! ? setMinLength(true) : setMinLength(false)
                    break;
                case 'maxLengthMessage':
                    value.trim().length > validations[validation]! ? setMaxLength(true) : setMaxLength(false)
                    break;
                default:
                    break;
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    useEffect(() => {
        if (isEmpty || minLength || maxLength || wordsCount || spacesCount || mailValid || phoneValid || dateValid) {
            setInputValid(false)
        } else {
            setInputValid(true)
        }

    }, [isEmpty, minLength, maxLength, wordsCount, spacesCount, mailValid, phoneValid, dateValid])

    return {
        isEmpty,
        minLength,
        maxLength,
        wordsCount,
        spacesCount,
        mailValid,
        phoneValid,
        dateValid,
        inputValid
    }
}

export default useValidation
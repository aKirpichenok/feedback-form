import { useEffect, useState } from "react"

const useValidation = (value, validations) => {
    const [isEmpty, setIsEmpty] = useState(true)
    const [minLength, setMinLength] = useState(false)
    const [maxLength, setMaxLength] = useState(false)
    const [wordsCount, setWordsCount] = useState(false)
    const [spacesCount, setSpacesCount] = useState(false)
    const [mailValid, setmailValid] = useState(false)
    const [phoneValid, setPhoneValid] = useState(false)
    const [inputValid, setInputValid] = useState(false)
    const [dateValid, setDateValid] = useState(false)

    const countSpaces = (str) => {
        let a = 0
        for (let i = 0; i < str.length; i++) {
            if (str[i] === ' ') {
                a += 1
            }
        }
        return a
    }

    const phoneMask = (phone) => {
        // return phone[0] === '+' && phone[1] === '7' && phone.length
        const re = /^((\+7|7|8)+(\s|-|\(|)+([0-9]){10})$/;
        return re.test(phone);
    }

    const validMail = (mail) => {
        const re = /^[\w-.]+@[\w-]+\.[a-z]{2,4}$/i;
        return re.test(mail)
    }

    const validDate = (date) => {
        const dateArr = date.split('-')
        const [year, ,] = dateArr
        return year > 1950 && year < 2022
    }

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'minLength':
                    value.split(' ').some(item => item.length < validations[validation]) ? setMinLength(true) : setMinLength(false)
                    break;
                case 'maxLength':
                    value.split(' ').some(item => item.length > validations[validation]) ? setMaxLength(true) : setMaxLength(false)
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
                    value.trim().length < validations[validation] ? setMinLength(true) : setMinLength(false)
                    break;
                case 'maxLengthMessage':
                    value.trim().length > validations[validation] ? setMaxLength(true) : setMaxLength(false)
                    break;
                default:
                    break;
            }
        }


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
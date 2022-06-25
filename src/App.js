import axios from "axios";
import { useState } from "react";
import useInput from "./hooks/useInput";

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input/input'


const App = () => {
  const name = useInput('', { type: 'name', isEmpty: true, minLength: 3, maxLength: 30, spaces: 1, words: 2 })
  const mail = useInput('', { mail: 'mail', minLength: 7, isEmpty: true })
  const phone = useInput('', { phone: 'phone', isEmpty: true, })
  const date = useInput('', { date: 'date', isEmpty: true })
  const message = useInput('', { isEmpty: true, minLengthMessage: 10, maxLengthMessage: 300 })
  const [fetching, setfetching] = useState(false)
  const [success, showSuccess] = useState(false)


  const submit = (e) => {
    e.preventDefault()
    setfetching(true)
    axios.post('http://localhost:5000/send-form', {
      name: name.value,
      mail: mail.value,
      phone: phone.value,
      date: date.value,
      message: message.value,
    }).then(res => {
      console.log(res)
      setfetching(false)
      showSuccess(true)
      setTimeout(() => showSuccess(false), 1500)
      name.clear(); mail.clear(); phone.clear(); date.clear(); message.clear()
    })
  }

  return (
    <div>
      <form onSubmit={submit} noValidate>
        <label htmlFor="name">Name:</label>
        <input type="text" value={name.value} onChange={e => name.onChange(e)} onBlur={e => name.onBlur(e)} name="name" placeholder="ANDREY KIRPICHONAK" />
        {(name.dirty && !name.inputValid) && <p>Wrong name</p>}

        <label htmlFor="mail">Mail:</label>
        <input type="email" value={mail.value} onChange={e => mail.onChange(e)} onBlur={e => mail.onBlur(e)} name="mail" placeholder="a.kirpichenok@gmail.com" />
        {(mail.dirty && !mail.inputValid) && <p>Wrong mail</p>}

        <label htmlFor="phone">Phone:
          <span className="fp fp-rounded  ru"></span></label>
        <PhoneInput country="RU" international withCountryCallingCode value={phone.value} onChange={phone.setValue} onBlur={e => phone.onBlur(e)} name="phone" placeholder="+7 923332123" />
        {(phone.dirty && !phone.inputValid) && <p>Wrong phone</p>}

        <label htmlFor="date">Date:</label>
        <input type="date" value={date.value} onChange={e => date.onChange(e)} onBlur={e => date.onBlur(e)} name="date" />
        {(date.dirty && !date.inputValid) && <p>Wrong date</p>}

        <label htmlFor="message">Message:</label>
        <textarea placeholder="some message" value={message.value} onChange={e => message.onChange(e)} onBlur={e => message.onBlur(e)} name="message" />
        {(message.dirty && !message.inputValid) && <p>Wrong message</p>}

        <button type="submit" className="red" disabled={!name.inputValid || !mail.inputValid || !phone.inputValid || !date.inputValid || !message.inputValid || fetching}>Send</button>
      </form>
      {success && <h1>Form sent</h1>}
    </div >
  )
}

export default App;

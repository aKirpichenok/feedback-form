import { useState } from "react";
import useInput from "./hooks/useInput";

const App = () => {
  const name = useInput('', { type: 'name', isEmpty: true, minLength: 3, maxLength: 30, spaces: 1, words: 2 })
  const mail = useInput('', { mail: 'mail', minLength: 7, isEmpty: true })
  const phone = useInput('+7', { phone: 'phone', isEmpty: true, })
  const date = useInput('', { date: 'date', isEmpty: true })
  const message = useInput('', { isEmpty: true, minLengthMessage: 10, maxLengthMessage: 300 })


  const submit = (e) => {
    e.preventDefault()
    console.log(name.value, mail.value, phone.value, date.value, message)
  }


  return (
    <div>
      <form onSubmit={submit} noValidate>
        <label htmlFor="name">Name:</label>
        <input type="text" value={name.value} onChange={e => name.onChange(e)} onBlur={e => name.onBlur(e)} name="name" />
        {name.inputValid ? <p>OK</p> : <p>NOT OK</p>}

        <label htmlFor="mail">Mail:</label>
        <input type="email" value={mail.value} onChange={e => mail.onChange(e)} onBlur={e => mail.onBlur(e)} name="mail" />
        {mail.inputValid ? <p>OK</p> : <p>NOT OK</p>}

        <label htmlFor="phone">Phone:</label>
        <input type="tel" value={phone.value} onChange={e => phone.onChange(e)} onBlur={e => phone.onBlur(e)} name="phone" />
        {phone.inputValid ? <p>OK</p> : <p>NOT OK </p>}

        <label htmlFor="date">Date:</label>
        <input type="date" value={date.value} onChange={e => date.onChange(e)} onBlur={e => date.onBlur(e)} name="date" />
        {date.inputValid ? <p>OK</p> : <p>NOT OK</p>}

        <label htmlFor="message">Message:</label>
        <textarea placeholder="Text" value={message.value} onChange={e => message.onChange(e)} onBlur={e => message.onBlur(e)} name="message" />
        {message.inputValid ? <p>OK</p> : <p>NOT OK</p>}

        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default App;

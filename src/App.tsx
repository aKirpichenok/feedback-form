import { SyntheticEvent, useState } from "react";
import { URL } from "./constants";
import useInput from "./hooks/useInput";

const App = () => {
  const name = useInput('', { type: 'name', isEmpty: true, minLength: 3, maxLength: 30, spaces: 1, words: 2 })
  const mail = useInput('', { mail: 'mail', minLength: 7, isEmpty: true })
  const phone = useInput('+7', { phone: 'phone', isEmpty: true, })
  const date = useInput('', { date: 'date', isEmpty: true })
  const message = useInput('', { isEmpty: true, minLengthMessage: 10, maxLengthMessage: 300 })
  const [fetching, setfetching] = useState<boolean>(false)
  const [result, showResult] = useState<{status: string, message: string}>({
    status: 'pending',
    message: ''
  })


  const submit = async(e: SyntheticEvent) => {
    e.preventDefault()
    setfetching(true)
    let response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name.value,
        mail: mail.value,
        phone: phone.value,
        date: date.value,
        message: message.value,
      })
    })
    let result = await response.json()
    showResult({
      status: result.status,
      message: result.message
    })
    setfetching(false)
    setTimeout(() => showResult({ status: 'pending', message: '' }), 2500)
  }

  return (
    <div>
      {fetching && <div className="loader"></div>}

      <form onSubmit={submit} noValidate>
        
        <label htmlFor="name">Name:</label>
        <input type="text" value={name.value} onChange={e => name.onChange(e)} onBlur={e => name.onBlur(e)} name="name" placeholder="ANDREY KIRPICHONAK" />
        {(name.dirty && !name.inputValid) && <p>each word 3-30 characters</p>}

        <label htmlFor="mail">Mail:</label>
        <input type="email" value={mail.value} onChange={e => mail.onChange(e)} onBlur={e => mail.onBlur(e)} name="mail" placeholder="a.kirpichenok@gmail.com" />
        {(mail.dirty && !mail.inputValid) && <p>Wrong mail</p>}

        <label htmlFor="phone">Phone:</label>
        <input value={phone.value} onChange={e => phone.onChange(e)} onBlur={(e: any) => phone.onBlur(e)} name="phone" placeholder="+7 923332123" />
        {(phone.dirty && !phone.inputValid) && <p>Wrong phone(10numbers)</p>}

        <label htmlFor="date">Date:</label>
        <input id="date" type="date" value={date.value} onChange={e => date.onChange(e)} onBlur={e => date.onBlur(e)} name="date" />
        <p className="date-output">{date.value}</p>
        {(date.dirty && !date.inputValid) && <p>Wrong date</p>} 

        <label htmlFor="message">Message:</label>
        <textarea placeholder="Hello world!" value={message.value} onChange={e => message.onChange(e)} onBlur={e => message.onBlur(e)} name="message" />
        {(message.dirty && !message.inputValid) && <p className="wrong-message">min 10 characters</p>}

        <button type="submit" className="red" disabled={!name.inputValid || !mail.inputValid || !phone.inputValid || !date.inputValid || !message.inputValid || fetching}>Send</button>
      </form>
      {result.status === 'success' && <h1 className="success">{result.message}</h1>}
      {result.status === 'error' && <h1 className="error">{result.message}</h1>}
    </div >
  )
}

export default App;

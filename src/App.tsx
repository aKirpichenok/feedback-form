import axios from "axios";
import { SyntheticEvent, useState } from "react";
import useInput from "./hooks/useInput";

const App = () => {
  const name = useInput('', { type: 'name', isEmpty: true, minLength: 3, maxLength: 30, spaces: 1, words: 2 })
  const mail = useInput('', { mail: 'mail', minLength: 7, isEmpty: true })
  const phone = useInput('+7', { phone: 'phone', isEmpty: true, })
  const date = useInput('', { date: 'date', isEmpty: true })
  const message = useInput('', { isEmpty: true, minLengthMessage: 10, maxLengthMessage: 300 })
  const [fetching, setfetching] = useState(false)
  const [result, showResult] = useState({
    status: 'pending',
    message: ''
  })


  const submit = (e: SyntheticEvent) => {
    e.preventDefault()
    setfetching(true)
    axios.post('http://localhost:5000/send-form', {
      name: name.value,
      mail: mail.value,
      phone: phone.value,
      date: date.value,
      message: message.value,
    }).then(res => {
      showResult({
        status: res.data.status,
        message: res.data.message
      })
      name.clear(); mail.clear(); phone.clear(); date.clear(); message.clear()
    }).catch(res => {
      console.log(res)
      showResult({
        status: res.response.data.status,
        message: res.response.data.message
      })
    }).finally(() => {
      setfetching(false)
      setTimeout(() => showResult({ status: 'pending', message: '' }), 2500)
    })
  }

  return (
    <div>
      {fetching && <div className="loader"></div>}
      <form onSubmit={submit} noValidate>
        <label htmlFor="name">Name:</label>
        <input type="text" value={name.value} onChange={e => name.onChange(e)} onBlur={e => name.onBlur(e)} name="name" placeholder="ANDREY KIRPICHONAK" />
        {(name.dirty && !name.inputValid) && <p>Wrong name</p>}

        <label htmlFor="mail">Mail:</label>
        <input type="email" value={mail.value} onChange={e => mail.onChange(e)} onBlur={e => mail.onBlur(e)} name="mail" placeholder="a.kirpichenok@gmail.com" />
        {(mail.dirty && !mail.inputValid) && <p>Wrong mail</p>}

        <label htmlFor="phone">Phone:</label>
        <input value={phone.value} onChange={e => phone.onChange(e)} onBlur={(e: any) => phone.onBlur(e)} name="phone" placeholder="+7 923332123" />
        {(phone.dirty && !phone.inputValid) && <p>Wrong phone</p>}

        <label htmlFor="date">Date:</label>
        <input type="date" value={date.value} onChange={e => date.onChange(e)} onBlur={e => date.onBlur(e)} name="date" />
        {(date.dirty && !date.inputValid) && <p>Wrong date</p>} 

        <label htmlFor="message">Message:</label>
        <textarea placeholder="input a x12 for succes result" value={message.value} onChange={e => message.onChange(e)} onBlur={e => message.onBlur(e)} name="message" />
        {(message.dirty && !message.inputValid) && <p>Wrong message</p>}

        <button type="submit" className="red" disabled={!name.inputValid || !mail.inputValid || !phone.inputValid || !date.inputValid || !message.inputValid || fetching}>Send</button>
      </form>
      {result.status === 'success' && <h1 className="success">{result.message}</h1>}
      {result.status === 'error' && <h1 className="error">{result.message}</h1>}
    </div >
  )
}

export default App;

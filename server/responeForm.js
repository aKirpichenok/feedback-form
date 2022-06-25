const express = require('express');
const cors = require('cors')

const PORT = 5000;

let a = null
const app = express()

app.use(cors())
app.use(express.json())

app.post('/send-form', (req, res) => {
    a = req.body
    setTimeout(() => res.status(200).json({
        status: 'success',
        message: 'sending was successful',
        a
    }), 1500)
})



app.listen(PORT, () => console.log('server started on port 5000'))
const express = require('express');
const cors = require('cors')

const PORT = 5000;

const app = express()

app.use(cors())
app.use(express.json())

app.post('/send-form', (req, res) => {
    if (req.body.message === 'aaaaaaaaaaaa') {
        setTimeout(() => res.status(200).json(({
            status: 'success',
            message: 'sending was successful',
        })
        ), 1500)
    } else {
        setTimeout(() => res.status(400).json({
            status: 'error',
            message: 'sending was denied',
        }
        ), 1500)
    }
})



app.listen(PORT, () => console.log('server started on port 5000'))
import express from 'express'
import { Client } from 'debox-open-sdk'

const app = express()
const port = 3000
const data = new Client({
	endpoint: 'https://open.debox.pro',
	apiKey: 'your-api-key',
})

app.get('/', async (req, res) => {
  res.send('Hello World!')
})

// example url http://localhost:3000/msg?msg=helloworld&inviteUrl=https://debox.site/group/00021pru
app.get('/msg', async (req, res) => {
  const { msg, inviteUrl } = req.query
  // get group id
  const groupRes = await data.getGroupId({
    inviteUrl,
  })
  if (groupRes.success) {
    // send message
    const msgRes = await data.sendChatMsg({
      toUserId: '',
      groupId: groupRes.data.group_id.toString(),
      message: msg,
    })
    res.send(msgRes)
  } else {
    res.send('Get groupId error')
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
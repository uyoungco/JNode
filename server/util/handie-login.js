const router = require('express').Router()
const axios = require('axios')

const baseUrl = 'http://condejs.org/api/v1'

router.post('/login', function (req, res) {
  axios.post(`${baseUrl}/accesstoken/`, {
    accesstoken: req.body.accesToken
  })
    .then(resp => {
      if (resp.status === 200 && resp.data.success) {
        req.session.user = {
          accesToken: req.body.accesToken,
          liginName: resp.data.loginname,
          id: resp.data.id,
          avatarUrl: resp.data.avatar_url
        }
        res.json({
          success: true,
          data: resp.data
        })
      }
    })
    .catch(err => {
      if (err.response) {
        res.json({
          success: true,
          data: err.response
        })
      }
    })
})


// import express from 'express'
// import axios from 'axios'

// const app = express()
// const PORT = 3000
// const CLIENT_ID = 'ab5015bf26389b450bd6'
// const CLIENT_SECRET = 'd2ae6cb8ff2596e786e36a920372629d5cfc6b4c'
// const REDIRECT_URI = 'https://link-it-project.vercel.app/'

// app.get('/auth', (req, res) => {
//   const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`
//   res.redirect(githubAuthUrl)
// })

// // eslint-disable-next-line @typescript-eslint/no-misused-promises
// app.get('/auth/callback', async (req, res) => {
//   const code = req.query.code as string

//   const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
//     client_id: CLIENT_ID,
//     client_secret: CLIENT_SECRET,
//     code
//   }, {
//     headers: {
//       Accept: 'application/json'
//     }
//   })

//   const accessToken = tokenResponse.data.access_token

//   // Utiliza el accessToken para realizar acciones en nombre del usuario

//   res.send('Autenticación exitosa. Puedes cerrar esta ventana.')
// })

// app.listen(PORT, () => {
//   console.log(`Servidor escuchando en http://localhost:${PORT}`)
// })

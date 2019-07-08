function auth () {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(['token'], (result) => {
      const token = result.token

      if (!token) {
        console.log('hi')
        axios.post('http://localhost:3000/users/login', {
          email: 'heun334211142@gmail.com',
          password: 'd8t44m5b'
        }).then(res => {
          chrome.storage.sync.set({
            'name': res.data.user.name,
            'email': res.data.user.email,
            'token': res.data.token
          })

          token = res.data.token
        })
      }

      resolve(token)
    })
  })
}
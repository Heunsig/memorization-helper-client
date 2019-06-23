(function () {
  console.log('popup!!!')

  const background = chrome.extension.getBackgroundPage()
  const ul = document.getElementById('word_list')
  const title = document.getElementById('title')


  function Foo () {
    let q = null

    this.go = (callback) => {
      q = setTimeout(() => {
        callback()
        console.log('working!!!')
        this.go(callback)
      }, 300);
    }

    this.detact = () => {
      console.log('Finishied')
      clearTimeout(q)
    }
  }


  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    const current_tab_id = tabs[0].id
    var port = chrome.extension.connect({ name: "popup" });
    const foo = new Foo()

    foo.go(() => {
      port.postMessage({ 
        msg: "get_words", 
        data: {
          tab_id: current_tab_id
        }
      })
    })

    port.onMessage.addListener(function(request) {
      if (request) {
        if (request.msg === 'found') {
          foo.detact()
          if (request.data.words) {
            const loading = document.getElementById('loading')
            loading.style['display'] = 'none'

            title.innerText = request.data.title
            ul.innerHTML = ''
            for (list of request.data.words) {
              const li = document.createElement('li')
              li.innerText = list[0] + `(${list.length})`
              ul.appendChild(li)
            }    
          } else {
              const loading = document.getElementById('loading')
              loading.style['display'] = 'none'

              title.innerText = 'Nothing'
              ul.innerHTML = ''
              const li = document.createElement('li')
              li.innerText = 'No words found'
              ul.appendChild(li)
          }

        } else {
          const loading = document.getElementById('loading')
          loading.style['display'] = 'block'
        }
      }
    });
  })
})()
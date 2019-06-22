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
      }, 500);
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

    port.onMessage.addListener(function(msg) {
      if (msg) {
        foo.detact()
        if (msg.words) {
          title.innerText = msg.title
          ul.innerHTML = ''
          for (list of msg.words) {
            const li = document.createElement('li')
            li.innerText = list[0] + `(${list.length})`
            ul.appendChild(li)
          }    
        } else {
            title.innerText = 'Nothing'
            ul.innerHTML = ''
            const li = document.createElement('li')
            li.innerText = 'No words found'
            ul.appendChild(li)
        }
      }
    });
  })
})()

// if (background.word_lists_map[current_tab_id]) {
//   title.innerText = background.word_lists_map[current_tab_id].title
//   ul.innerHTML = ''
//   for (list of background.word_lists_map[current_tab_id].words) {
//     const li = document.createElement('li')
//     li.innerText = list[0] + `(${list.length})`
//     ul.appendChild(li)
//   }    
// } else {
//     title.innerText = 'Nothing'
//     ul.innerHTML = ''
//     const li = document.createElement('li')
//     li.innerText = 'No words found'
//     ul.appendChild(li)
// }
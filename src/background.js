// Background script

(function () {
  // window.word_lists_map = {}
  const words = new Words().get_words()

  function find_words (content, words) {
    let words_found = []
    for (word of words) {
      let r = new RegExp(`[\\W](${word})[\\W]`, 'gm')
      let words_matched = content.match(r)
      if (words_matched) {
        words_found.push(content.match(r).map(word => {
          return word.trim().replace(/\W/g, '')
        }))
      }
    }

    return words_found
  }


  let queue = {}
  // chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  //   if (request.msg === 'send_content') {
  //     if (queue[sender.tab.id]) {
  //       clearTimeout(queue[sender.tab.id])
  //     }

  //     queue[sender.tab.id] = setTimeout(() => {
  //       window.word_lists_map[sender.tab.id] = {
  //         title: request.data.title,
  //         words: find_words(request.data.text, words)
  //       }

  //       console.log(window.word_lists_map)
  //     }, 1000);
  //   }
  // })
  const word_lists_map = {}

  chrome.tabs.onRemoved.addListener((tab_id, remove_info) => {
    delete word_lists_map[tab_id]
    console.log('deleted', word_lists_map)
  })

  chrome.extension.onConnect.addListener(function(port) {

  if (port.name === 'content') {
    port.onMessage.addListener(function(request, sender, sendResponse) {
      const tab_id = sender.sender.tab.id
      if (request.msg === 'send_content') {
        if (queue[tab_id]) {
          clearTimeout(queue[tab_id])
        }

        queue[tab_id] = setTimeout(() => {
          word_lists_map[tab_id] = {
            title: request.data.title,
            words: find_words(request.data.text, words)
          }

        }, 1000);
      }
    })
  } else if (port.name === 'popup') {
    port.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.msg === 'get_words') {
        if (word_lists_map[request.data.tab_id]) {
          port.postMessage(word_lists_map[request.data.tab_id])
        }
      }
    })
  }

    
      // console.log('sender', sender)
      // console.log('in background', msg)
      // if (request.msg === 'send_content') {
      //   if (queue[sender.tab.id]) {
      //     clearTimeout(queue[sender.tab.id])
      //   }

      //   queue[sender.tab.id] = setTimeout(() => {
      //     window.word_lists_map[sender.tab.id] = {
      //       title: request.data.title,
      //       words: find_words(request.data.text, words)
      //     }

      //     console.log(window.word_lists_map)
      //   }, 1000);
      // }
     // console.log("message recieved" + msg);
      // setTimeout(() => {
      //   port.postMessage("Hi Popup.js");
      //   setTimeout(() => {
      //     port.postMessage("Hi Popup.js2");
      //     setTimeout(() => {
      //       port.postMessage("Hi Popup.js3");
      //     }, 1000);
      //   }, 7000);
      // }, 5000);
   })

})()
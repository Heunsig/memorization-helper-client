// Background script

(async function () {
  const queue = {}
  const word_lists_map = {}
  const token = await auth()
  const {data: words} = await load_words(token)

  chrome.tabs.onRemoved.addListener((tab_id, remove_info) => {
    delete word_lists_map[tab_id]
    console.log('deleted', word_lists_map)
  })

  chrome.tabs.onUpdated.addListener((tab_id, change_info, tab) => {
    if (change_info.url) {
      delete word_lists_map[tab_id]
    }
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

            // console.log(request.data.text)
          }, 1000);
        }
      })
    } else if (port.name === 'popup') {
      port.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.msg === 'get_words') {
          if (word_lists_map[request.data.tab_id]) {
            port.postMessage({
              msg: 'found',
              data: word_lists_map[request.data.tab_id]
            })
          } else {
            port.postMessage({
              msg: 'matching'
            })
          }
        }
      })
    }
  })

})()
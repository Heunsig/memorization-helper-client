// Background script

(function () {
  const words = new Words().get_words()
  let queue = {}
  const word_lists_map = {}

  function find_words (content, words) {
    let words_found = []
    content = content.toLowerCase()
    for (word of words) {
      let formula = ''

      if (word.pos === 'verb') {
        let tenses = nlp(word.word).verbs().conjugate()

        if (tenses.length) {
          formula += tenses[0].PresentTense
          formula += '|'
          formula += tenses[0].Infinitive
          formula += '|'
          formula += tenses[0].PastTense
          formula += '|'
          formula += tenses[0].Gerund  
        }

      } else if (word.pos === 'noun') {
        let plural_form = nlp(word.word).nouns().toPlural().out()
        if (plural_form) {
          formula += plural_form
          formula += '|'
          formula += word.word  
        }
      } else {
        formula = word.word
      }

      // console.log(formula)

      if (formula) {
        let r = new RegExp(`\\W(${formula})\\W`, 'gm')
        let words_matched = content.match(r)
        if (words_matched) {
          words_found.push(content.match(r).map(word => {
            return word.trim().replace(/\W/g, '')
          }))
        }  
      }
    }

    console.log(words_found)

    return words_found
  }

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
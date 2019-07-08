function load_words (token) {
  const options = {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + token},
    url: 'http://localhost:3000/users/me/words'
  }

  return axios(options)
}

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
(function () {
  // const flip = function(t, tense) {
  //   if (tense === 'present') {
  //     t.to_present();
  //   } else if (tense === 'past') {
  //     t.to_past();
  //   } else if (tense === 'future') {
  //     t.to_future();
  //   }
  //   return t;
  // }

  // console.log(flip('think', 'past'))
    let doc = nlp('plot')
    console.log(doc.nouns().toPlural().out())
    // 'she will sell seashells...'

    console.log(doc.verbs().conjugate())
    // [{ PastTense: 'sold',
    //    Infinitive: 'sell',
    //    Gerund: 'selling', ...
    // }]

    // let doc = window.nlp('five-hundred and twenty')

    // doc.values().toNumber()
    // document.body.innerHTML = doc.out('text')
})()

// (function() {
//   console.time()

//   // const list  = ['wind', 'rumble', 'stretches']
//   const content = text.toLowerCase()
//   const words_found = []
//   const w = `wind|rumble|stretches|dissemble|spangle|refectory|subside|ebb|dispassionate|malcontent|flail|parochial|prognosticate|canto|expostulation|confer|enamor|dais|stock|clarion|paraphernalia|accentuate|ratify|vintner|didactic|sybarite|consider|conscientious|doggerel|cupidity|prattle|devolve|emolument|knight|mode|justify|rampart|forsake|inflammatory|scrupulous|obloquy|blanch|convince|esteem|fraught`

//   // for (w of list) {
//     let r = new RegExp(`[\\W](${w})[\\W]`, 'gm')
//     let words_matched = content.match(r)
//     // if (words_matched) {
//     //   words_found.push(content.match(r).map(word => {
//     //     return word.trim().replace(/\W/g, '')
//     //   }))
//     // }
//   // }
  
//   // let b = content.match(/\swind\s/g)

//   console.log(words_matched)

//   console.timeEnd()  
// })()

// (function() {
//   console.time()

//   const list  = [
//     'wind', 
//     'rumble', 
//     'stretches',
//     'dissemble',
//     'spangle',
//     'refectory',
//     'subside',
//     'ebb',
//     'dispassionate',
//     'malcontent',
//     'flail',
//     'parochial',
//     'prognosticate',
//     'canto',
//     'expostulation',
//     'confer',
//     'enamor',
//     'dais',
//     'stock',
//     'clarion',
//     'paraphernalia',
//     'accentuate',
//     'ratify',
//     "vintner",
//     'didactic',
//     'sybarite',
//     'consider',
//     'conscientious',
//     'doggerel',
//     'cupidity',
//     'prattle',
//     'devolve',
//     'emolument',
//     'knight',
//     'mode',
//     'justify',
//     'rampart',
//     'forsake',
//     'inflammatory',
//     'scrupulous',
//     'obloquy',
//     'blanch',
//     'convince',
//     'esteem',
//     'fraught'
//   ]
//   const content = text.toLowerCase()
//   const words_found = []

//   for (w of list) {
//     let r = new RegExp(`[\\W](${w})[\\W]`, 'gm')
//     let words_matched = content.match(r)
//     if (words_matched) {
//       words_found.push(content.match(r).map(word => {
//         return word.trim().replace(/\W/g, '')
//       }))
//     }
//   }

//   // let b = content.match(/\swind\s/g)

//   console.log(words_found)

//   console.timeEnd()  
// })()

// (function(){
//   console.time()
//   const a  = 'wind'
//   const content = text.toLowerCase()
//   let b = content.match(/\swind\s/g)
//   console.log(b)
//   console.timeEnd()
// })()

// (function(){
//   console.time()
//   const a  = 'wind'
//   const words = text.toLowerCase().split(' ')
//   let arr = []
  
//   for (word of words) {
//     if (word === a) {
//       arr.push(word)
//     }
//   }
//   console.log(arr)
//   console.timeEnd()
// })()
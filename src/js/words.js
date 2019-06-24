function Words () {
  const words = [
    {
      word: 'computer',
      pos: 'noun'
    },
    {
      word: 'recognize',
      pos: 'verb'
    },
    {
      word: 'plot',
      pos: 'noun'
    }
  ]

  this.get_words = () => {
    return words
  }
}
(function(){
    var evt = new Event("look", {"bubbles":true, "cancelable":false});

    function Foo () {
        let a = null

        this.set = (value) => {
            a = value
            dispatchEvent(evt);
        }

        this.get = () => {
            return a
        }
    }

    const a = new Foo()
    a.set('hello')

    document.addEventListener('look', () => {
        console.log('Hello World')
    })
    

    // event can be dispatched from any element, not only the document
    // myDiv.dispatchEvent(evt);
  
})()
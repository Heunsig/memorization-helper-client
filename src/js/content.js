// Content srcipt

(function () {
  console.log('Memorization helper started!')

  const port = chrome.extension.connect({
    name: "content"
  });

  let queue = null
  var targetNode = document.getElementsByTagName('body');
  var config = { childList: true, subtree: true };

  var send_content = function(mutationsList, observer) {
    clearTimeout(queue)
    queue = setTimeout(() => {
      port.postMessage({
        msg: 'send_content',
        data: {
          title: document.title,
          text: document.body.innerText
        }
      })

    }, 700);
  }

  if (targetNode.length) { 
    send_content()
    var observer = new MutationObserver(send_content)
    observer.observe(targetNode[0], config)
  }
  

})()
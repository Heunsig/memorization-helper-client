// Content srcipt

(function () {
  console.log('Memorization helper started!')

  const port = chrome.extension.connect({
    name: "content"
  });

  port.onMessage.addListener(function(msg) {
    console.log("message recieved" + msg);
  });

  let queue = null
  // Select the node that will be observed for mutations
  var targetNode = document.getElementsByTagName('body');

  // Options for the observer (which mutations to observe)
  var config = { childList: true, subtree: true };

  // Callback function to execute when mutations are observed
  var send_content = function(mutationsList, observer) {
    clearTimeout(queue)
    queue = setTimeout(() => {
      port.postMessage({
      // chrome.runtime.sendMessage({
        msg: 'send_content',
        data: {
          title: document.title,
          text: document.body.innerText
        }
      })
    }, 700);
  };

  send_content()
  var observer = new MutationObserver(send_content)
  observer.observe(targetNode[0], config)

})()
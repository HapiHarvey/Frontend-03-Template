let iframe = document.createElement("iframe");
document.body.innerHTML = "";
document.body.appendChild(iframe);

function happen(element, event) {
  return new Promise(function(resolve){
    let hanlder = () => {
      resolve();
      element.removeEventListener(event, hanlder);
    }
    element.addEventListener(event, hanlder);
  })
}

void async function() {
  for (let standard of standards) {
    iframe.src = standard.url;
    console.log(standard.url);
    await happen(iframe, "load");
    console.log(iframe.contentDocument.querySelectorAll('.propdef'));
  }
}
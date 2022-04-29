let script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://cdn.rawgit.com/caldwell/renderjson/master/renderjson.js';
document.head.appendChild(script);
let box = document.createElement('div');
box.appendChild(renderjson(JSON.parse(document.getElementsByTagName('pre')[0].innerText)));
document.getElementsByTagName('pre')[0].style.display = 'none';
document.body.appendChild(box);
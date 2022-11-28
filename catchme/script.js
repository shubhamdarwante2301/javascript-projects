"use strict"
let player = document.getElementById('player');
let container = document.getElementById('container');

player.addEventListener('mouseenter', ()=> {
    let t = (Math.random() * (container.offsetHeight-50));
    let l = (Math.random() * (container.offsetWidth-50));
    console.log(t +" "+ l);
    player.style.left = l + "px";
    player.style.top = t + "px";
})

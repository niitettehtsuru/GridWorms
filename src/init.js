'use strict'; 
/*
 *Animates connected nodes about a grid
 *-------------------------------------
 *init.js sets everything up 
 *@author:    Caleb Nii Tetteh Tsuru Addy 
 *@date:      19th April, 2020 
 *@email:     calebniitettehaddy@gmail.com 
 *@twitter:   @cnttaddy
 *@github :   https://github.com/niitettehtsuru/GridWorms
 *@codepen:   https://codepen.io/niitettehtsuru/pen/MWajjbQ
 *@license:   GNU General Public License v3.0
 */   
function getBrowserWindowSize() 
{
    let win = window,
    doc     = document,
    offset  = 20,//
    docElem = doc.documentElement,
    body    = doc.getElementsByTagName('body')[0],
    browserWindowWidth  = win.innerWidth || docElem.clientWidth || body.clientWidth,
    browserWindowHeight = win.innerHeight|| docElem.clientHeight|| body.clientHeight; 
    return {x:browserWindowWidth-offset,y:browserWindowHeight-offset}; 
} 
let browserWindowSize   = getBrowserWindowSize(),
c   = document.getElementById("gridwormCanvas"),
ctx = c.getContext("2d"); 
//set size of canvas
c.width          = browserWindowSize.x; 
c.height         = browserWindowSize.y; 
let SCREEN_WIDTH = browserWindowSize.x,
    SCREEN_HEIGHT= browserWindowSize.y,   
    painter      = new Painter(SCREEN_WIDTH,SCREEN_HEIGHT),  
    lastTime     = 100,  
    windowSize;   
function onWindowResize()//called every time the window gets resized. 
{  
    windowSize     = getBrowserWindowSize();
    c.width        = windowSize.x; 
    c.height       = windowSize.y; 
    SCREEN_WIDTH   = windowSize.x;
    SCREEN_HEIGHT  = windowSize.y;  
}
window.addEventListener('resize',onWindowResize); 
function updateCanvas()
{
    ctx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);    
    ctx.fillStyle   = 'white';  
    ctx.fillRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
}
function doAnimationLoop(timestamp)
{           
    updateCanvas();
    painter.refreshScreenSize(SCREEN_HEIGHT,SCREEN_WIDTH);//let canvas respond to window resizing  
    let deltaTime  = timestamp - lastTime; 
        lastTime   = timestamp;
    painter.update(deltaTime);   
    painter.draw(ctx);  
    requestAnimationFrame(doAnimationLoop); 
} 
requestAnimationFrame(doAnimationLoop); 

 
 
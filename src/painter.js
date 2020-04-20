'use strict';
/*
 *Animates connected nodes about a grid
 *-------------------------------------
 *painter.js sets up and controls all points and gridworms on the canvas 
 *@author:    Caleb Nii Tetteh Tsuru Addy 
 *@date:      19th April, 2020 
 *@email:     calebniitettehaddy@gmail.com 
 *@twitter:   @cnttaddy
 *@github :   https://github.com/niitettehtsuru/GridWorms
 *@codepen:   https://codepen.io/niitettehtsuru/pen/MWajjbQ
 *@license:   GNU General Public License v3.0
 */  
class Painter
{
    constructor(screenWidth,screenHeight)
    {      
        this.screenWidth    = screenWidth;
        this.screenHeight   = screenHeight;   
        this.interval       = 40;//interval from one point to the next 
        this.points         = this.createPoints(); //coordinates of the vertices of all squares when the canvas is partitioned
        this.gridWorms      = this.createGridWorms(); 
        this.color          = this.getRandomColor(0.1);
        document.addEventListener('click',(event)=>//when user clicks on the canvas
        {   
            this.points     = this.createPoints();
            this.gridWorms  = this.createGridWorms();//spawn new gridworms
            this.color          = this.getRandomColor(0.1);
        });
    } 
    createGridWorms() 
    {
        let gridworms = [],
            numOfGridWorms = 30;//Math.floor(this.getRandomNumber(5, 30));//30; 
        for(var i = 0; i < numOfGridWorms; i++)
        { 
            let point = this.points[Math.floor(this.getRandomNumber(0,this.points.length-1))];//randomly select a point
            gridworms.push(new GridWorm(point,this.interval,this.points,this.screenWidth,this.screenHeight));
        }
        return gridworms; 
    }
    createPoints()//divide the canvas into squares 
    {
        let points = [], 
            interval = this.interval;//interval from one point to the next 
        for(var y = interval; y < this.screenHeight; y+=interval)//get all points in the grid, starting from the top to the bottom
        { 
            if(y+interval > this.screenHeight)//if the next point is beyond the right edge of the canvas
            {
                continue; //skip
            } 
            for(var x = interval; x < this.screenWidth; x+=interval)//all the while, getting all the horizontal points at each level 
            { 
                if(x+interval > this.screenWidth)//if the next point is beyond the bottom edge of the canvas
                { 
                    continue; //skip
                } 
                points.push({x:x,y:y}); 
            } 
        }
        return points;  
    }  
    getRandomColor(opacity)
    {
        var colors = [
            `rgba(255,0,0,      ${opacity})`,//red
            `rgba(255, 242,0,   ${opacity})`,//yellow, 
            `rgba(0,0,255,      ${opacity})`,//blue
            `rgba(255,255,0,    ${opacity})`,//yellow
            `rgba(0,255,255,    ${opacity})`,//cyan
            `rgba(255,0,255,    ${opacity})`,//magenta/fuchsia
            `rgba(192,192,192,  ${opacity})`,//silver
            `rgba(128,128,128,  ${opacity})`,//gray 
            `rgba(128,0,0,      ${opacity})`,//maroon
            `rgba(128,128,0,    ${opacity})`,//olive
            `rgba(0,128,0,      ${opacity})`,//green
            `rgba(128,0,128,    ${opacity})`,//purple 
            `rgba(0,128,128,    ${opacity})`,//teal
            `rgba(0,0,128,      ${opacity})`,//navy 
            `rgba(0, 255, 0,    ${opacity})`,//green
            `rgba(77, 0, 255,   ${opacity})`,//blue
            `rgba(255, 0, 140,  ${opacity})`,//purple
            `rgba(0,255,0,      ${opacity})`//lime
        ];
        return colors[parseInt(this.getRandomNumber(0, colors.length))];
    }
    /**
    * Returns a random number between min (inclusive) and max (exclusive)
    * @param  {number} min The lesser of the two numbers. 
    * @param  {number} max The greater of the two numbers.  
    * @return {number} A random number between min (inclusive) and max (exclusive)
    */
    getRandomNumber(min, max) 
    {
        return Math.random() * (max - min) + min;
    } 
    /**
    * Let canvas respond to window resizing.
    * @param  {number} screenHeight The height of the screen. 
    * @param  {number} screenWidth  The width of the screen.  
    */
    refreshScreenSize(screenHeight,screenWidth)
    {   
        if(this.screenHeight !== screenHeight || this.screenWidth !== screenWidth)//if the screen size has changed
        {  
            this.screenHeight   = screenHeight;  
            this.screenWidth    = screenWidth;   
            this.points         = this.createPoints(); //coordinates of the vertices of all squares when the canvas is partitioned
            this.gridWorms      = this.createGridWorms();  
        } 
    }  
    update(deltaTime)
    {     
       this.gridWorms.forEach(function(gridworm)
        {
            gridworm.update(deltaTime); 
        }); 
    }  
    draw(ctx)
    {    
        /*
        for(var i = 0; i < this.points.length; i++)
        {
            let point = this.points[i];
            ctx.fillStyle   = Math.random() > 0.5? this.color:'white';//creates a disco effect 
            ctx.fillRect(point.x,point.y,this.interval,this.interval);
        }
        */
        this.gridWorms.forEach(function(gridworm)
        {
            gridworm.draw(ctx); 
        }); 
    }   
}

var background = function (window) {
    var tree;
    var buildings = [];
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        if(!app) {
            throw new Error("Invaid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }

        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        
        
        // add objects for display inb ackground
        // called at the start of game and whenever the page is resized
        function render() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;

            background.removeAllChildren();

            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.bitmap('img/backgroundfill.png');
            background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield
            var circle;
            for(var i=0;i<150;i++) {
            circle = draw.circle(3,'white','LightGray',2);
            circle.x = canvasWidth*Math.random();
            circle.y = groundY*Math.random();
            background.addChild(circle);
            }
            
            var moon = draw.bitmap('img/moon.png');
            moon.x = 800;
            moon.y = 25;
            moon.scaleX = 0.7;
            moon.scaleY = 0.7;
            background.addChild(moon);
            
            
            // TODO: 5 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            var building;
            for(var i=0;i<7;++i) {
                var buildingHeight = Math.floor(Math.max(150, Math.random() * 300));
                building = draw.rect(75,buildingHeight,'darkblue','grey',2);
                building.x = 200*i;
                building.y = groundY-buildingHeight;
                background.addChild(building);
                buildings.push(building);
            }
            
            // TODO 4: Part 1 - Add a tree
            tree = draw.bitmap('img/tree.png');
            tree.x = 150;
            tree.y = groundY - 235;
            background.addChild(tree);
        }
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            tree.x = tree.x - 20;
            if(tree.x < -200) {
                tree.x = canvasWidth;
            }
            // TODO 5: Part 2 - Parallax
            for (var i = 0; i < buildings.length; i++) {
                var building = buildings[i];
                building.x = building.x - 5;
                if(building.x < -200) {
                    building.x = canvasWidth;
                }
            }
        }

        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        app.addResizeable(background);
        app.addUpdateable(background);
        
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}

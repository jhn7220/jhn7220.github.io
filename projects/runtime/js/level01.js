var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1, 
            speed: -3,
            gameItems: [
                {type: 'sawblade',x:1000,y:groundY},
                {type: 'sawblade',x:2000,y:groundY - 125},
                {type: 'sawblade',x:3000,y:groundY},
                {type: 'sawblade',x:4000,y:groundY - 125},
                {type: 'sawblade',x:5000,y:groundY},
                {type: 'sawblade',x:6000,y:groundY - 125},
                {type: 'sawblade',x:7000,y:groundY},
                {type: 'sawblade',x:8000,y:groundY - 125},
                {type: 'sawblade',x:9000,y:groundY},
                {type: 'sawblade',x:10000,y:groundY - 125},
                {type: 'sawblade',x:11000,y:groundY},
                {type: 'sawblade',x:12000,y:groundY - 125},                 
                {type: 'enemy',x:2000,y:groundY - 50},
                {type: 'enemy',x:5000,y:groundY - 50},
                {type: 'enemy',x:8000,y:groundY - 50},
                {type: 'enemy',x:11000,y:groundY - 50},
                {type: 'enemy',x:14000,y:groundY - 50},
                {type: 'enemy',x:17000,y:groundY - 50},
                {type: 'bossenemy',x:99999,y:groundY - 50},
                {type: 'reward',x:600,y:groundY - 150},
                {type: 'reward',x:1000,y:groundY - 150},
                {type: 'reward',x:1400,y:groundY - 150},
                {type: 'reward',x:1800,y:groundY - 150},
                {type: 'reward',x:2200,y:groundY - 150},
                {type: 'reward',x:2600,y:groundY - 150},                
                {type: 'health',x:3000,y:groundY - 150},
                {type: 'health',x:1500,y:groundY - 150}
            ]
        };
        
        
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // BEGIN EDITING YOUR CODE HERE
        function createSawBlade(x,y){
            var hitZoneSize = 25;
            var damageFromObstacle = 30;
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle);
            myObstacle.rotationalVelocity = -10;
            myObstacle.velocityX = -20;
            var obstacleImage = draw.bitmap('img/sawblade.png');
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
            if(myObstacle.x < -200) {
                myObstacle.x = 1250;
            }            
        }
        
        for (var i = 0; i < levelData.gameItems.length; i++) {
            var gameItem  = levelData.gameItems[i];
            if (gameItem.type === 'sawblade') {
                createSawBlade(gameItem.x, gameItem.y)
            }
            else if (gameItem.type === 'enemy') {
                createEnemy(gameItem.x, gameItem.y)
            }
            else if (gameItem.type === 'reward') {
                createReward(gameItem.x, gameItem.y)
            }            
            else if (gameItem.type === 'health') {
                createHealth(gameItem.x, gameItem.y)
            }
            else {
                createBossEnemy(gameItem.x, gameItem.y)
            }
        }
        
        
        function createEnemy(x, y) {
            var enemy =  game.createGameItem('enemy',25);
            var enemyImage = draw.bitmap('img/enemy.png');
            enemy.addChild(enemyImage);
            enemyImage.x = -25;
            enemyImage.y = -25; 
            enemy.x = x;
            enemy.y = y;
            game.addGameItem(enemy);
            enemy.velocityX = -25;
            enemy.velocityY = 0;
            enemy.rotationalVelocity = 0;
            enemy.onPlayerCollision = function() {
                console.log('The enemy has hit Halle');
                game.changeIntegrity(-20);
            };
            enemy.onProjectileCollision = function() {
                console.log('Halle has hit the enemy');
                game.increaseScore(1000);
                enemy.fadeOut();
            };
        }
        
        function createBossEnemy(x, y) {
            var enemy =  game.createGameItem('enemy',25);
            var enemyImage = draw.bitmap('img/bossenemy.png');
            enemy.addChild(enemyImage);
            enemyImage.x = -25;
            enemyImage.y = -25; 
            enemy.x = x;
            enemy.y = y;
            game.addGameItem(enemy);
            enemy.velocityX = -75;
            enemy.velocityY = 0;
            enemy.rotationalVelocity = 0;
            enemy.onPlayerCollision = function() {
                console.log('The enemy has hit Halle');
                game.changeIntegrity(-1001000);
            };
            enemy.onProjectileCollision = function() {
                console.log('Halle has hit the enemy');
                game.increaseScore(10000000000);
                enemy.fadeOut();
            };
        }        
        
        
        function createReward(x, y) {
            var reward =  game.createGameItem('reward',25);
            var rewardImage = draw.bitmap('img/reward.png');
            reward.addChild(rewardImage);
            rewardImage.x = -25;
            rewardImage.y = -25; 
            reward.x = x;
            reward.y = y;
            game.addGameItem(reward);
            reward.velocityX = -5;
            reward.velocityY = 0;
            reward.rotationalVelocity = 0;
            reward.onPlayerCollision = function() {
                console.log('The reward has hit Halle');
                game.increaseScore(1500);
                reward.fadeOut();
            };
        }
        
        function createHealth(x, y) {
            var health =  game.createGameItem('health',25);
            var healthImage = draw.bitmap('img/health.png');
            health.addChild(healthImage);
            healthImage.x = -25;
            healthImage.y = -25; 
            health.x = x;
            health.y = y;
            game.addGameItem(health);
            health.velocityX = -5;
            health.velocityY = 0;
            health.rotationalVelocity = 0;
            health.onPlayerCollision = function() {
                console.log('The health has hit Halle');
                game.changeIntegrity(30);
                health.fadeOut();
            };
        }
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
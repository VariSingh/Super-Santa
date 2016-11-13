var SideScroller = SideScroller || {};

SideScroller.Game = function(){};

SideScroller.Game.prototype = {
  preload: function() {
      this.game.time.advancedTiming = true;
      this.score=0;
	  this.lifevar=3;
    },
  create: function() {
      
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.starfield =  this.game.add.sprite(0, 0, 'sky');
    this.starfield.fixedToCamera = true;  
   
    this.music = this.game.add.audio('squit');  
    this.backgroundmusic = this.game.add.audio('squits',1,true);
    this.backgroundmusic.play('',0,1,true); 
    this.game.physics.arcade.checkCollision.down = false;
    this.game.physics.arcade.checkCollision.up = true;
    this.bird = this.game.add.group();
    this.bird.enableBody = true;

    this.emitter = this.game.add.emitter(this.game.world.centerX, 0, 400);

	this.emitter.width = 1000;
	// emitter.angle = 30; // uncomment to set an angle for the rain.

	this.emitter.makeParticles('rain');

	this.emitter.minParticleScale = 0.1;
	this.emitter.maxParticleScale = 0.5;

	this.emitter.setYSpeed(300, 500);
	this.emitter.setXSpeed(-5, 5);

	this.emitter.minRotation = 0;
	this.emitter.maxRotation = 0;

	this.emitter.start(false, 1600, 5, 0);




        this.map = this.game.add.tilemap('level1');
 
  
  //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
  this.map.addTilesetImage('download3', 'gameTiles');
  
  //create layers
  this.ghar = this.map.createLayer('ghar');
 // star = map.createLayer('star');
  this.badal = this.map.createLayer('badal');
  //this.badal.scrollFactorX = .3;

     //collision on star
    //map.setCollisionBetween(24,25, true, 'star');
   this.map.setCollisionBetween(1,4, true, 'badal');

    //resizes the game world to match the layer dimensions
    //star.resizeWorld();
    //star.wrap = true;
    
    this.badal.resizeWorld();
    this.badal.wrap = true;
    
	this.stars = this.game.add.group();
	this.stars.enableBody = true;
    this.map.createFromObjects('starLayer', 25, 'star', 0, true, false, this.stars);
	
	this.stars.setAll('body.allowGravity', false);
	
	
	
    //create player
   this. player = this.game.add.sprite(100, 100, 'dude');


    //enable physics on the player
    this.game.physics.arcade.enable(this.player);
    this.game.physics.arcade.enable(this.bird);
    this.game.physics.arcade.gravity.y = 250;
    this.player.body.bounce.y = 0.5;
    this.player.body.linearDamping = 1;
    this.player.body.collideWorldBounds = true;
	
	
	
   
    
    //  Our two animations, walking left and right.
    this.player.animations.add('left', [0, 1, 2, 3,4,5,6,7,8,9,10,11,12], 13, true);
    this.player.animations.add('right', [0, 1, 2, 3,4,5,6,7,8,9,10,11,12], 13, true);
    this.player.checkWorldBounds = true;
    this.game.camera.follow(this.player);
this.player.events.onOutOfBounds.add(this.pankaj, this);


for (var i = 0; i <150 ; i++)
    {
        //  Create a star inside of the 'stars' group
        this.groundss = this.bird.create(i * 700, 0, 'groundss');

        //  Let gravity do its thing
       
		this.groundss.body.gravity.y = 30;
  this.groundss.body.velocity.y =-50;
        //  This just gives each star a slightly random bounce value
        this.groundss.body.bounce.y = 1 + 0.1 * 0.1;
    }
	

    //create coins
    //createCoins();

    //create player
    //player = this.game.add.sprite(100, 300, 'player');

    //enable physics on the player
    //game.physics.arcade.enable(this.player);

    //player gravity
  //  player.body.gravity.y = 1000;
  //  The score
    this.scoreText = this.game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });
	this.scoreText.fixedToCamera = true;
	
	this.life = this.game.add.text(16, 50, 'life: 3', { fontSize: '32px', fill: '#fff' });
	this.life.fixedToCamera = true;
	
	this.logo = this.game.add.image(0, 0, 'logo');
	
    this.logo.fixedToCamera = true;
    this.logo.anchor.setTo(0, 0);
	
    this.game.input.onDown.add(this.removeLogo, this);
    this.cursors = this.game.input.keyboard.createCursorKeys();
  },
  update: function() {
      
    this.game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);
    this.game.physics.arcade.collide(this.player, this.badal);
    this.game.physics.arcade.collide(this.bird, this.badal);
    this.game.physics.arcade.collide(this.bird,this.ghar);
    this.game.physics.arcade.overlap(this.player, this.bird, this.lesslife, null, this);
    
    //  Reset the players velocity (movement)
    this.player.body.velocity.x = 0;
   if (this.cursors.left.isDown)
    {
       //  Move to the left
        this.player.body.velocity.x = -150;
		
		

        this.player.animations.play('left');
    }
    else if (this.cursors.right.isDown)
    {
         //  Move to the right
        this.player.body.velocity.x = 150;

        this.player.animations.play('right');
    }
    else{
        
         //  Stand still
        this.player.animations.stop();

        this.player.frame = 4;
    }
    if (this.cursors.up.isDown )
    {
       this.player.body.velocity.y = -200;
    }
      
  },
  removeLogo: function() {
    this.logo.kill();
},
collectStar: function(player, star){
    star.kill();
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);
    this.music.play();
	
},
pankaj: function()
{
if(this.lifevar!=0)
	{
		this.lifevar--;
		this.life.text = 'Life: ' + this.lifevar;
		this.player.reset(116,200);
	}
	else {this.player.kill();
	this.gameOver = this.game.add.bitmapText(45, 150, 'kenpixelblocks', 'Game Over', 70);
	this.gameOver.x = this.game.width / 2 - this.gameOver.textWidth / 2;
	this.gameOver.fixedToCamera = true;  
	
	this.finalScore = this.game.add.text(360, 300, 'score: '+this.score, { fontSize: '32px', fill: '#fff' });
	this.finalScore.fixedToCamera = true;  
	//this.finalScore.x = this.game.width / 2 - this.finalScore.textWidth / 2;
	
	this.backgroundmusic.stop();
	}
},
lesslife: function(player, bird)
{
if(this.lifevar!=0)
	{
		this.lifevar--;
		this.life.text = 'Life: ' + this.lifevar;
		this.player.reset(116,200);
	}
	else {this.player.kill();
	alert("game over u strike with bird");
	this.backgroundmusic.stop();
	}
}

};














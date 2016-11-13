var SideScroller = SideScroller || {};

//loading the game assets
SideScroller.Preload = function(){};

SideScroller.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(.5);
    this.preloadBar.scale.setTo(3);
	this.gametitle = this.game.add.bitmapText(45, 150, 'kenpixelblocks', 'loading santa...', 40);
	this.gametitle.x = this.game.width / 2 - this.gametitle.textWidth / 2;

    this.load.setPreloadSprite(this.preloadBar);

    //load game assets
    this.game.load.tilemap('level1', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('gameTiles', 'assets/download3.png'); 
	this.game.load.image('logo','assets/coverImage');	
    this.game.load.image('tiles', 'assets/download3.png');
    this.game.load.spritesheet('dude', 'assets/santa.png', 88, 112);
    this.game.load.image('sky', 'assets/sky.png');
    this.game.load.spritesheet('rain', 'assets/rain.png', 17, 17);
    this.game.load.image('star', 'assets/star.png');
    this.game.load.audio('squit', 'assets/key.wav');
    this.game.load.audio('squits', 'assets/santasound.wav');
    this.game.load.image('groundss', 'assets/bullrt.png');
	
	
  },
  create: function() {
    this.state.start('Game');
  }
};
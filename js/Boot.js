var SideScroller = SideScroller || {};

SideScroller.Boot = function(){};

//setting game configuration and loading the assets for the loading screen
SideScroller.Boot.prototype = {
  preload: function() {
    //assets we'll use in the loading screen
    this.load.image('preloadbar', 'assets/preloader-bar.png');
	this.load.bitmapFont('kenpixelblocks', 'assets/fonts/kenpixelblocks/kenpixelblocks.png', 'assets/fonts/kenpixelblocks/kenpixelblocks.fnt');
	
  },
  create: function() {
    //loading screen will have a white background
    this.game.stage.backgroundColor = '#996eec';
	//this.gametitle.anchor.setTo(.5);
    //this.gametitle.scale.setTo(3);

    //scaling options
   // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    
    //have the game centered horizontally
    //this.scale.pageAlignHorizontally = true;
    //this.scale.pageAlignVertically = true;

    //screen size will be set automatically
    //this.scale.setScreenSize(true);

    //physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
  
    this.state.start('Preload');
  }
};
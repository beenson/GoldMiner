var Oldman = Framework.exClass({
    __construct:function(parent, scene){
        this.load(parent);

        this.baseScene = scene;
        
        var photoLink = [
            define.imagePath + 'OldMan/1.png',
            define.imagePath + 'OldMan/2.png',
            define.imagePath + 'OldMan/3.png',
            define.imagePath + 'OldMan/4.png',
            define.imagePath + 'OldMan/5.png',
            define.imagePath + 'OldMan/6.png',
            define.imagePath + 'OldMan/7.png',
            define.imagePath + 'OldMan/8.png',
            define.imagePath + 'OldMan/9.png',
            define.imagePath + 'OldMan/10.png',
            define.imagePath + 'OldMan/11.png',
            define.imagePath + 'OldMan/12.png',
            define.imagePath + 'OldMan/13.png',
            define.imagePath + 'OldMan/14.png'
        ];
        this.position = {
            x: Framework.Game.getCanvasWidth() / 2 + 10,
            y: 56
        };
        this.scale = 1

        this.default = new Framework.Sprite(define.imagePath + 'OldMan/align.png');
        this.shoot = new Framework.Sprite(define.imagePath + 'OldMan/shooting.png');
        this.pull = new Framework.AnimationSprite({url: photoLink, loop: true,  speed: 5});
        
        this.default.scale = this.scale;
        this.shoot.scale = this.scale;
        this.pull.scale = this.scale;

        this.default.position = this.position;
        this.shoot.position = this.position;
        this.pull.position = this.position;
    },

	load: function(parent){
        //this.parent = parent;
	},

	update: function() {
        
    },
    
    draw: function(parentCtx) {
        
    },

	status_load:function(){
        this.baseScene.attach(this.pull);
        this.pull.start();
    },

    status_default:function(){
        this.baseScene.attach(this.default);
        this.baseScene.detach(this.pull);
    },

    status_shoot:function(){
        this.baseScene.attach(this.shoot);
        this.baseScene.detach(this.default);
    },

    status_pull:function(){
        this.baseScene.attach(this.pull);
        this.pull.start();
        this.baseScene.detach(this.shoot);
    },
});
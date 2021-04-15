var Oldman = Framework.exClass({
    __construct:function(parent, scene, audio){
        this.load(parent);

        this.baseScene = scene;
        this.audio = audio;

        this.status = "default";
        this.grabbing = undefined;
        this.pullSpeed = 10;
        
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
        this.scale = 1;

        this.defaultSprite = new Framework.Sprite(define.imagePath + 'OldMan/align.png');
        this.shootSprite = new Framework.Sprite(define.imagePath + 'OldMan/shooting.png');
        this.pullSprite = new Framework.AnimationSprite({url: photoLink, loop: true,  speed: 5});
        
        this.defaultSprite.scale = this.scale;
        this.shootSprite.scale = this.scale;
        this.pullSprite.scale = this.scale;

        this.defaultSprite.position = this.position;
        this.shootSprite.position = this.position;
        this.pullSprite.position = this.position;
    },

	load: function(parent){
        //this.parent = parent;
	},

	update: function() {
        
    },
    
    draw: function(parentCtx) {
        
    },

	status_load:function(){
        this.baseScene.attach(this.pullSprite);
        this.pullSprite.start();
    },

    default:function(stop){
        this.status = "default";
        this.baseScene.attach(this.defaultSprite);
        this.baseScene.detach(this.pullSprite);
        if(stop)
            this.audio.stopAll();
        if(this.grabbing) {
            this.value = this.grabbing.value;
            this.grabbing.detach();
            this.grabbing = undefined;
            return this.value;
        }
        return 0;
    },

    shoot:function(){
        this.status = "shooting";
        this.audio.play({name: "catch"});
        this.baseScene.attach(this.shootSprite);
        this.baseScene.detach(this.defaultSprite);
    },

    pull:function(weight, obj){
        this.status = "pulling";
        this.audio.stopAll();
        this.audio.play({name: "pull", loop: true});
        this.baseScene.attach(this.pullSprite);
        this.pullSprite.start();
        this.baseScene.detach(this.shootSprite);
        this.pullSpeed = 15 - weight;
        this.grabbing = obj;
    },
});
var Oldman = Framework.exClass({
    __construct:function(parent, scene, audio){
        this.load(parent);
        
        this.baseScene = scene;
        this.audio = audio;

        this.status = "default";
        this.grabbing = undefined;
        this.pullSpeed = 15;
        

        this.position = {
            x: Framework.Game.getCanvasWidth() / 2 + 10,
            y: 56
        };
        this.scale = 1;

        this.defaultSprite = new Framework.Sprite(define.imagePath + 'OldMan/align.png');
        this.shootSprite = new Framework.Sprite(define.imagePath + 'OldMan/shooting.png');
        this.pullSprite = new Framework.AnimationSprite({url: Anime.oldmanPull, loop: true,  speed: 5});
        
        this.defaultSprite.scale = this.scale;
        this.shootSprite.scale = this.scale;
        this.pullSprite.scale = this.scale;

        this.defaultSprite.position = this.position;
        this.shootSprite.position = this.position;
        this.pullSprite.position = this.position;

        //----------item effect----------
        this.effect = localStorage.getItem("buyItem");
        if(this.effect.indexOf("potion") != -1){
            this.powerAdd = 1.2;
        }
        else{
            this.powerAdd = 1;
        }
        if(this.effect.indexOf("bomb") != -1){
            this.hasBomb = true;
            this.bomb = new Framework.Sprite(shopItems.bomb.image);
            this.bomb.position = {
                x: Framework.Game.getCanvasWidth() / 2 + 140,
                y: 100     
            }
            this.bomb.scale = 0.3;
            this.baseScene.attach(this.bomb);
        }

        this.hasBook = this.effect.indexOf("book") != -1;
        this.hasBottle = this.effect.indexOf("bottle") != -1;
        this.hasClover = this.effect.indexOf("clover") != -1;
        //----------item effect end----------
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
            this.audio.stop('pull');
        if(this.grabbing) {
            var value = this.grabbing.value;
            if(value == -1) {       //mystery bag
                value = Math.floor(Math.random() * 900) + 1;
                if(this.hasClover){ //clover lucky boost
                    value = value + 200;
                }
            }
            this.grabbing.detach();
            if(value > 800) {
                if(Math.random() <= 0.5) {
                    if(!this.hasBomb){  //firecracker
                        console.log("Bomb-Mystery")
                        this.hasBomb = true;
                        this.baseScene.attach(this.bomb);
                    }
                } else {                 //potion effect
                    console.log("Potion-Mystery")
                    this.powerAdd = 1.2;
                }
                this.grabbing = undefined;
                this.audio.play({name: 'good'});
            }else {
                if((this.grabbing.family === "stone") && this.hasBook){
                    console.log(this.effect.indexOf("book"));
                    value = value * 3;
                }
                else if((this.grabbing.family === "diamond") && this.hasBottle) {
                    value = value + 300;
                }
                this.grabbing = undefined;
                this.audio.play({name: 'earnMoney'});
                return value;
            }
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
        this.audio.stop('catch');
        this.audio.play({name: "pull", loop: true});
        this.baseScene.attach(this.pullSprite);
        this.pullSprite.start();
        this.baseScene.detach(this.shootSprite);
        if(weight == -1) {
            weight = Math.floor(Math.random() * 13) + 2; //2 ~ 14
        }
        if(obj) {
            this.pullSpeed = (15*this.powerAdd) - weight;
        } else {
            this.pullSpeed = 15;
        }
        this.grabbing = obj;
    },

    useBomb: function(){
        if(this.status === "pulling" && this.hasBomb && this.grabbing){
            this.grabbing.detach();
            this.baseScene.detach(this.bomb)
            this.pullSpeed = 15;
            this.hasBomb = false;
            this.grabbing = undefined;
        }
    },
});
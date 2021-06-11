var Oldman = Framework.exClass({
    __construct:function(parent, scene, audio, money){
        this.load(parent);
        
        this.baseScene = scene;
        this.audio = audio;

        this.status = "default";
        this.grabbing = undefined;
        this.pullSpeed = 15;
        
        this.money = money;

        this.position = {
            x: Framework.Game.getCanvasWidth() / 2 + 10,
            y: 56
        };
        this.scale = 1;

        this.defaultSprite = new Framework.Sprite(define.imagePath + 'OldMan/align.png');
        this.shootSprite = new Framework.Sprite(define.imagePath + 'OldMan/shooting.png');
        this.pullSprite = new Framework.AnimationSprite({url: Anime.oldmanPull, loop: true,  speed: 5});
        this.throwBombSprite = new Framework.AnimationSprite({url: Anime.oldmanThrowBomb, loop: false,  speed: 15});
        
        this.defaultSprite.scale = this.scale;
        this.shootSprite.scale = this.scale;
        this.pullSprite.scale = this.scale;
        this.throwBombSprite.scale = this.scale;

        this.defaultSprite.position = this.position;
        this.shootSprite.position = this.position;
        this.pullSprite.position = this.position;
        this.throwBombSprite.position = this.position;

        //----------item effect----------
        this.effect = localStorage.getItem("buyItem");
        if(this.effect.indexOf("potion") != -1){
            this.powerAdd = 1.2;
        }
        else{
            this.powerAdd = 1;
        }
        this.bomb = [];
        for(i = 0; i < parseInt(localStorage.getItem("bomb")); i++) {
            this.addBomb();
        }

        this.hasBook = this.effect.indexOf("book") != -1;
        this.hasBottle = this.effect.indexOf("bottle") != -1;
        this.hasClover = this.effect.indexOf("clover") != -1;
        //----------賺錢動畫----------
        this.AnimationTxt = new Text(this, (Framework.Game.getCanvasWidth()/2)-350, -100, 100, 40,
            {text: '本關目標金錢:', font: 'bold 64px 標楷體', color: 'yellow', textAlign: 'left'});
    },

	load: function(parent){
        //this.parent = parent;
	},

	update: function() {
        
    },
    
    draw: function(parentCtx) {
        
    },

	status_load: function(){
        this.baseScene.attach(this.pullSprite);
        this.pullSprite.start();
    },

    default: function(){
        this.status = "default";
        this.baseScene.attach(this.defaultSprite);
        this.baseScene.detach(this.pullSprite);
        return 0;
    },

    shoot: function(){
        this.status = "shooting";
        this.audio.play({name: "catch"});
        this.baseScene.attach(this.shootSprite);
        this.baseScene.detach(this.defaultSprite);
    },

    pull: function(weight, obj){
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

    waiting: function(){
        this.status = "waiting";
        this.audio.stop('pull');
        let value;
        if(this.grabbing) {
            value = this.grabbing.value;
            if(value == -1) {       //mystery bag
                value = Math.floor(Math.random() * 900) + 1;
                if(this.hasClover){ //clover lucky boost
                    value = value + 200;
                }
            }
            this.grabbing.detach();
            if(value > 800) {
                if(Math.random() <= 0.5) {
                    console.log("Bomb-Mystery")
                    this.addBomb();
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
            }
            this.earnMoneyAnime(value);
        } else {
            this.default();
        }
        let self = this;
        setTimeout(function(){
            self.money += value;
            self.default();
        }, 1000);
    },

    useBomb: function(){
        if(this.status === "pulling" && this.bomb.length > 0 && this.grabbing){
            this.grabbing.detach();
            this.audio.play({name: 'boom'});
            this.baseScene.detach(this.bomb[this.bomb.length - 1]);
            this.bomb.splice(this.bomb.length - 1, 1);
            this.pullSpeed = 15;
            this.grabbing = undefined;
        }
    },

    addBomb: function(){
        this.bomb.push(new Framework.Sprite(shopItems.bomb.image));
        this.bomb[this.bomb.length - 1].position = {
            x: Framework.Game.getCanvasWidth() / 2 + 140 + (this.bomb.length - 1) * 10,
            y: 100     
        }
        this.bomb[this.bomb.length - 1].scale = 0.3;
        this.baseScene.attach(this.bomb[this.bomb.length - 1]);
    },

    earnMoneyAnime: function(){

    }
});
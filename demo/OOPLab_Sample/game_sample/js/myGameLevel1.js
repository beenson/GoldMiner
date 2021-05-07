﻿var MyGame = Framework.Class(Framework.Level , {
	load: function(){
        this.Level = parseInt(localStorage.getItem("currentLevel"));
        this.target = 650;
        if(this.Level > 1){
            let i;
            for(i = 2;i<=this.Level;i++){
                this.target += 270*i+5;
            }
        }
        this.time = 60;
        this.money = parseInt(localStorage.getItem("myMoney"));
        this.oldman_status = "default";
        
        //load sound
        //載入要被播放的音樂清單
        //資料夾內只提供mp3檔案, 其餘的音樂檔案, 請自行轉檔測試
        this.audio = new Framework.Audio({
            start: {
                mp3: define.soundPath + 'GameStart.mp3'
            },
            pull: {
                mp3: define.soundPath + 'PullingString.mp3'
            },
            catch: {
                mp3: define.soundPath + 'Catch.mp3'
            },
            boom: {
                mp3: define.soundPath + 'Boom.mp3'
            },
            stone: {
                mp3: define.soundPath + 'GetStone.mp3'
            },
            bigPrice: {
                mp3: define.soundPath + 'BigPrice.mp3'
            },
            mysteryBag: {
                mp3: define.soundPath + 'MysteryBag.mp3'
            }
        });
        //播放時, 需要給name, 其餘參數可參考W3C
        this.audio.play({name: 'start'});
        //----------------------------------------------
        this.oldmanScene = new Framework.Scene();
        this.oldmanScene.position = {
            x: 0,
            y: 0
        };
        this.Oldman = new Oldman(this, this.oldmanScene, this.audio);
        //----------------------------------------------
	    this.loadingPic = new Framework.Sprite(define.imagePath+'/background/Gold.jpg');
        this.loadingPic.position = {
            x: Framework.Game.getCanvasWidth() / 2,
            y: Framework.Game.getCanvasHeight() / 2
        };
        this.loadingPic.scale = 1.5;
        this.rootScene.attach(this.oldmanScene);
        this.Oldman.status_load();
        this.rootScene.attach(this.loadingPic);
        this.haveLoaded = 0;
        //----------------------------------------------
        this.gameMap = new GameMap();
        this.gameMap.load();
        

        //爪子爪子
        this.catcherPos = { x:-1, y:-1};
        this.circle = new Framework.Scene();
        this.circle.position = {
            x: Framework.Game.getCanvasWidth() / 2,
            y: 80
        };

        this.length = 50;
        this.catcher = new Framework.Sprite(define.imagePath + 'Catcher2.png');
        this.catcher.position = {
            x: 0,
            y: this.length
        };
        this.catcher.scale = 1.1;

        this.circleSpeed = 0.7;

        //---------------------按鈕或文字物件---------------------
        var self = this;

        this.bomb = new Framework.Sprite(shopItems.bomb.image);
        this.bomb.scale = 0.6;
        this.bomb.position = {x:0, y:0}
        this.bombAnime = new Framework.AnimationSprite({url: Anime.explode, loop: false,  speed: 7});
        this.pressUp = false;

        //object area init
        this.objectScene = new Framework.Scene();
        this.objectScene.position = {x: 150, y:0};

        //objects
        this.objs = [];
        this.objs.push(new Object(Items.mouseWithDiamond, {x:10, y:200}, this.audio, this.objectScene,{start: 0, end:200}));
        this.objs.push(new Object(Items.mouseWithDiamond, {x:200, y:200}, this.audio, this.objectScene, {start: 200, end:400}));
        this.objs.push(new Object(Items.mouseWithDiamond, {x:400, y:200}, this.audio, this.objectScene, {start: 400, end:600}));
        this.objs.push(new Object(Items.mouse, {x:600, y:200}, this.audio, this.objectScene, {start: 600, end:900}));
        this.objs.push(new Object(Items.mouse, {x:800, y:200}, this.audio, this.objectScene, {start: 800, end:1000}));
        
        this.objs.push(new Object(Items.bigStone, {x:100, y:400}, this.audio, this.objectScene));
        this.objs.push(new Object(Items.bone, {x:200, y:400}, this.audio, this.objectScene));
        //this.objs.push(new Object(Items.boom, {x:300, y:400}, this.audio, this.objectScene));
        this.objs.push(new Object(Items.smaStone, {x:400, y:400}, this.audio, this.objectScene));
        this.objs.push(new Object(Items.head, {x:500, y:400}, this.audio, this.objectScene));
        this.objs.push(new Object(Items.mysteryBag, {x:600, y:400}, this.audio, this.objectScene));
        this.objs.push(new Object(Items.diamond, {x:700, y:400}, this.audio, this.objectScene));

        //button
        this.backBtn1 = new Button(this, (Framework.Game.getCanvasWidth() / 2) - 250, 20, 70, 50,
        {text: '略過', font: 'bold 32px 標楷體', color: 'white', background: 'brown', textOffset: 8, click: function(){
            self.toNextLevel();
        }});
        this.backBtn2 = new Button(this, (Framework.Game.getCanvasWidth() / 2) - 250, 20+50, 70, 50,
        {text: '關卡', font: 'bold 32px 標楷體', color: 'white', background: 'brown', textOffset: 8, click: function(){
            self.toNextLevel();
        }});

        //text
        this.currentMoney = new Text(this, 160, 20, 100, 40,
            {text: '金錢:', font: 'bold 32px 標楷體', color: 'brown', textAlign: 'left'});
        this.moneyTxt = new Text(this, 250, 20, 100, 40,
            {text: '0', font: 'bold 32px 標楷體', color: 'brown', textAlign: 'left'});
        this.targetMoney = new Text(this, 160, 70, 200, 40,
            {text: '目標金錢:' + this.target, font: 'bold 32px 標楷體', color: 'brown', textAlign: 'left'});
        this.remainTimeText = new Text(this, Framework.Game.getCanvasWidth()-350, 20, 80, 40,
            {text: '時間:', font: 'bold 32px 標楷體', color: 'brown', textAlign: 'left'});
        this.remainTime = new Text(this, Framework.Game.getCanvasWidth()-250, 20, 35, 40,
            {text: '60', font: 'bold 32px 標楷體', color: 'brown', textAlign: 'left'});
        this.stageInfo = new Text(this, Framework.Game.getCanvasWidth()-275, 70, 30, 40,
            {text: '第1關', font: 'bold 32px 標楷體', color: 'brown', textAlign: 'left'});
        //-----------loading完後再繪製物件--------------
        setTimeout(function(){
            self.rootScene.attach(self.gameMap);
            self.oldmanScene.layer = 1;
            self.rootScene.detach(self.loadingPic);
            self.Oldman.default();
            self.rootScene.attach(self.circle);
            self.circle.attach(self.catcher);
            self.rootScene.attach(self.objectScene);
            
            self.timer = setInterval(function(){
                self.time--;
            }, 1000);
            self.haveLoaded = 1;
        }, 2000);
	},

    toNextLevel: function(){
        clearInterval(this.timer);
        this.audio.stopAll();
        if(this.money >= this.target){
            localStorage.setItem('myMoney', this.money);
            localStorage.setItem('currentLevel', this.Level+1);
            Framework.Game.goToLevel('shop');
        }
        else{
            Framework.Game.goToLevel('menu');   //return to menu
        }
    },

    initialize: function() {
        
    },

    update: function() {
        //update
        this.backBtn1.update();
        this.backBtn2.update();

        //object update
        this.objs.forEach(element => {
            element.update();
        });

        //text update
        this.moneyTxt.text = this.money;
        this.remainTime.text = this.time;

        //timeout
        if(this.time <= 0){
            this.toNextLevel();
        }

        //rotate direction
        if(Math.abs(this.circle.rotation) >= 70) {
            this.circleSpeed *= -1;
        }

        //Oldman status
        switch(this.Oldman.status) {
            case "shooting":
                this.length += 5;
                if(this.catcher.position.y >= Framework.Game.getCanvasHeight()) {
                    this.Oldman.pull(0);
                }

                //object detect
                this.objs.forEach(element => {
                    if(element.catch(this.catcher, this.circle, this.objs)){
                        element.setPos(this.catcher.position, {x: 0, y: -14});

                        //remove from objs
                        index = this.objs.indexOf(element);
                        if(index >= 0)
                            this.objs.splice(index, 1);

                        console.log(this.objs);
                        console.log(element.weight);
                        this.Oldman.pull(element.weight, element);
                    }
                });

                break;
            case "pulling":
                if(this.pressUp == true){
                    if(! this.isBombAttached){
                        this.circle.attach(this.bomb);
                        this.isBombAttached = true;
                    }
                    this.bomb.position.y += 20;
                    if(this.bomb.position.y >= this.catcher.position.y){
                        let self = this;
                        this.pressUp = false;
                        this.isBombAttached = false;
                        this.circle.detach(this.bomb);
                        this.bombAnime.position = this.catcher.position;
                        this.circle.attach(this.bombAnime);
                        this.bombAnime.start()
                        this.Oldman.useBomb();
                        setTimeout(function(){
                            self.circle.detach(self.bombAnime);
                        }, 600);
                    }
                }
                this.length -= this.Oldman.pullSpeed;
                if(this.Oldman.grabbing) {
                    this.Oldman.grabbing.setPos(this.catcher.position, {x: 0, y: -14});
                }

                if(this.length <= 50) {
                    this.length = 50;
                    this.money += this.Oldman.default(true);
                }
                break;
            case "default":
                this.circle.rotation += this.circleSpeed;
                break;
            default:
                console.log("unknown status " + this.Oldman.status);
                break;
        }
        
        this.catcher.position = {
            x: 0,
            y: this.length
        };
    },

    draw:function(parentCtx){
        this.rootScene.draw();

        if(this.haveLoaded === 1){
            //buttons
            this.backBtn1.draw(parentCtx);
            this.backBtn2.draw(parentCtx);

            //texts
            this.currentMoney.draw(parentCtx);
            this.moneyTxt.draw(parentCtx);
            this.targetMoney.draw(parentCtx);
            this.remainTimeText.draw(parentCtx);
            this.remainTime.draw(parentCtx);
            this.stageInfo.draw(parentCtx);
            
            //draw blue circle
            parentCtx.fillStyle = '#2A3B95';
            parentCtx.strokeStyle = '#2A3B95'; 
            parentCtx.lineWidth = 1;
            parentCtx.beginPath();
            parentCtx.arc(this.circle.position.x + 10, this.circle.position.y + 30, 110, Math.PI * 98 / 100, Math.PI * 202 / 100);
            parentCtx.closePath();
            parentCtx.fill();
            parentCtx.stroke();

            this.oldmanScene.draw();

            //catcher
            this.catcherPos = {
                x: this.circle.position.x + (this.length - this.catcher.height / 2) * Math.cos((this.circle.rotation + 90) / 180 * Math.PI),
                y: this.circle.position.y + (this.length - this.catcher.height / 2) * Math.sin((this.circle.rotation + 90) / 180 * Math.PI)
            }
            parentCtx.strokeStyle = 'black'; 
            parentCtx.lineWidth = 5;
            parentCtx.beginPath();
            parentCtx.moveTo(this.circle.position.x, this.circle.position.y);
            parentCtx.lineTo(this.catcherPos.x, this.catcherPos.y);
            parentCtx.stroke();
            this.circle.draw();
            
            
            this.objs.forEach(element => {
                element.draw(parentCtx);
            });
            //debug
            //this.object.draw(parentCtx);
        }
    },

    keydown:function(e, list){
        Framework.DebugInfo.Log.warning(e.key);
        console.log(e.key);
        if(e.key === 'Numpad +' || e.key === '=') {
            this.circleSpeed += 0.05;
        }

        if(e.key === 'Numpad -' || e.key === '-') {
            this.circleSpeed -= 0.05;
        }

        if(e.key === 'Space') {
            if(this.Oldman.status === "default"){
                this.Oldman.shoot();
            }
        }

        if(e.key === 'Pause/Break') {
            //AnimationSprite支援停止正在播放的圖片
        }

        if(e.key === 'F5') {
            //AnimationSprite可以恢復暫停正在播放的圖片
        }

        if(e.key === 'Enter') {
            if(!this.isFullScreen) {
                Framework.Game.fullScreen();
                this.isFullScreen = true;
            } else {
                Framework.Game.exitFullScreen();
                this.isFullScreen = false;
            }
            
        }
        
        if(e.key === 'Up'){
            if(this.Oldman.hasBomb){
                this.pressUp = true;            //是否按上
                this.isBombAttached = false;    //是否attach
            }
            console.log(this.Oldman.hasBomb);
            //this.Oldman.useBomb();
        }

    },

    
    touchstart: function (e) {
        //為了要讓Mouse和Touch都有一樣的事件
        //又要減少Duplicated code, 故在Touch事件被觸發時, 去Trigger Mouse事件
        this.click({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    },
    
    mousemove: function(e) {
        
    },

    click: function (e) {  
        //console.log(e.x, e.y);
        //console.log(this.circle.rotation);
        this.objs.forEach(element => {
            element.click(e);
        });
        
        //button
        this.backBtn1.click(e);
        if(this.backBtn1.isHovered)
            return;
        this.backBtn2.click(e);
    },
});
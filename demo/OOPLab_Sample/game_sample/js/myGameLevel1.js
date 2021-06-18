var MyGame = Framework.Class(Framework.Level , {
	load: function(){
        this.startTime = new Date();
        this.level = parseInt(localStorage.getItem("currentLevel"));
        this.target = 650;
        if(this.level > 1){
            let i;
            for(i = 2;i<=this.level;i++){
                this.target += 270*i+5;
            }
        }
        this.time = 60;
        this.money = parseInt(localStorage.getItem("myMoney"));
        this.earnPlaying = 0;
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
            earnMoney: {
                mp3: define.soundPath + 'EarnMoney.mp3'
            },
            earnMoney2: {
                mp3: define.soundPath + 'Shopping.mp3'
            },
            earnMoney2_0: {
                mp3: define.soundPath + 'Shopping.mp3'
            },
            earnMoney2_1: {
                mp3: define.soundPath + 'Shopping.mp3'
            },
            earnMoney2_2: {
                mp3: define.soundPath + 'Shopping.mp3'
            },
            bad: {
                mp3: define.soundPath + 'Bad.mp3'
            },
            normal: {
                mp3: define.soundPath + 'Normal.mp3'
            },
            good: {
                mp3: define.soundPath + 'Good.mp3'
            },
            end: {
                mp3: define.soundPath + 'EndGame.mp3'
            },
        });
        //播放時, 需要給name, 其餘參數可參考W3C
        this.audio.play({name: 'start'});
        //----------------------------------------------
        this.oldmanScene = new Framework.Scene();
        this.oldmanScene.position = {
            x: 0,
            y: 0
        };
        this.Oldman = new Oldman(this, this.oldmanScene, this.audio, this.money);
        //-----------------------Loading-----------------------
	    this.loadingPic = new Framework.Sprite(define.imagePath+'/background/Gold.jpg');
        this.loadingPic.position = {
            x: Framework.Game.getCanvasWidth() / 2,
            y: Framework.Game.getCanvasHeight() / 2
        };
        this.loadingPic.scale = 1.15;

        this.goal = new Framework.Sprite(define.imagePath+'/background/goal.png');
        this.goal.position = {x: Framework.Game.getCanvasWidth() / 2, y:0};
        this.goal.scale = 1.2;
        this.goalTxt = new Text(this, (Framework.Game.getCanvasWidth()/2)-350, -100, 100, 40,
            {text: '本關目標金錢:', font: 'bold 64px 標楷體', color: 'yellow', textAlign: 'left'});
        this.goalMoneyTxt = new Text(this, (Framework.Game.getCanvasWidth()/2)-350, 0, 100, 40,
            {text: '$'+this.target, font: 'bold 64px 標楷體', color: 'lime', textAlign: 'left'});

        this.rootScene.attach(this.oldmanScene);
        this.Oldman.status_load();
        this.rootScene.attach(this.loadingPic);
        this.rootScene.attach(this.goal);
        this.blackAttach();
        this.haveLoaded = 0;    //1:Loading done
                                //2:Game clear
                                //3:Game fail
                                //4:Final result
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

        this.initLen = 35;
        this.length = this.initLen;
        this.catcher = new Framework.Sprite(define.imagePath + 'Catcher.png');
        this.catcher.position = {
            x: 0,
            y: this.length
        };
        this.catcher.scale = 1.1;

        //---------------------按鈕或文字物件---------------------
        var self = this;

        this.bomb = new Framework.Sprite(shopItems.bomb.image);
        this.bomb.scale = 0.5;
        this.bombAnime = new Framework.AnimationSprite({url: Anime.explode, loop: false,  speed: 7});
        this.pressUp = false;

        //object area init
        this.objectScene = new Framework.Scene();
        this.objectScene.position = {x: 151, y:136};

        //objects
        this.objs = [];
        let random = Math.random();
        let levelInfo = LevelMap[this.level > 10 ? (this.level - 4) % 7 + 3 : this.level - 1];
        for(let i = 0; i < levelInfo.length; i++){
            let level = levelInfo[i];
            if(random <= level.chance || i == levelInfo.length - 1) {
                level.objs.forEach(info => {
                    this.objs.push(new Object(info, this.audio, this.objectScene));
                });
                break;
            }
            random -= level.chance;
        }
        

        //button
        this.backBtn1 = new Button(this, (Framework.Game.getCanvasWidth() / 2) - 350, 20, 70, 45,
        {text: '略過', font: 'bold 32px 標楷體', color: 'white', background: 'brown', textOffset: 8, click: function(){
            self.toNextLevel();
        }});
        this.backBtn2 = new Button(this, (Framework.Game.getCanvasWidth() / 2) - 350, 20+45, 70, 45,
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
            {text: '第' + this.level + '關', font: 'bold 32px 標楷體', color: 'brown', textAlign: 'left'});
        //-----------loading完後再繪製物件--------------
        setTimeout(function(){
            self.rootScene.attach(self.gameMap);
            self.blackdetach();
            self.oldmanScene.layer = 1;
            self.rootScene.detach(self.loadingPic);
            self.rootScene.detach(self.goal);
            self.Oldman.default();
            self.rootScene.attach(self.circle);
            self.circle.attach(self.catcher);
            self.rootScene.attach(self.objectScene);
            self.blackAttach();
            
            self.timer = setInterval(function(){
                self.time--;
            }, 1000);
            self.haveLoaded = 1; 
        }, 2000);
        //-----------結算畫面--------------
        this.goalClear = new Framework.Sprite(define.imagePath+'/background/goal_clear.png');
        this.goalFail = new Framework.Sprite(define.imagePath+'/background/goal_fail.png');
        this.goalAttached = false;
        //-----------Game Over畫面--------------
        this.resultBackground = new Framework.Sprite(define.backgroundPath + 'Gold_result.png');
        this.resultBackground.scale = 1.15;
        this.resultBackground.position = {
            x: Framework.Game.getCanvasWidth() / 2,
            y: Framework.Game.getCanvasHeight() / 2
        };
        this.result = new Framework.Sprite(define.backgroundPath + 'result.png');
        this.result.scale = 0.8;
        this.result.position = {
            x: Framework.Game.getCanvasWidth()/2,
            y:Framework.Game.getCanvasHeight()/2
        };
	},

    toNextLevel: function(){
        clearInterval(this.timer);
        this.audio.stopAll();
        this.Oldman.default();
        if(this.Oldman.money >= this.target){
            this.goalAttached = false;
            this.haveLoaded = 2;
            localStorage.setItem('myMoney', this.Oldman.money);
            localStorage.setItem('currentLevel', this.level + 1);
            localStorage.setItem('bomb', this.Oldman.bomb.length);
            this.goalClear.position = {x: Framework.Game.getCanvasWidth() / 2, y: (Framework.Game.getCanvasHeight()/2)-100};
            this.goalClear.scale = 0.1;
            this.audio.play({name: 'end'});
            setTimeout(function(){
                Framework.Game.goToLevel('shop');
            },3000)
        } else {
            this.goalAttached = false;
            this.haveLoaded = 3;
            this.goalFail.position = {x: Framework.Game.getCanvasWidth() / 2, y: 0};
            this.goalFail.scale = 1.2;
            this.resultTxt = new Text(this, (Framework.Game.getCanvasWidth()/2)-400, (Framework.Game.getCanvasHeight()/2)-50, 100, 40,
                {text: '你共獲得'+this.Oldman.money+"金錢!", font: 'italic bold 32px 標楷體', color: 'red', textAlign: 'left'});
            
            var self = this;
            setTimeout(function(){
                self.goalAttached = false;
                self.haveLoaded = 4;
            },2000)
        }
    },

    initialize: function() {
        
    },

    update: function() {
        if((this.haveLoaded === 0) && (this.goal.position.y <= (Framework.Game.getCanvasHeight()/2)-100)){
            this.goal.position.y += 10;
            this.goalTxt.position.y += 10;
            this.goalMoneyTxt.position.y += 10;
        }
        else if((this.haveLoaded === 2) && (this.goalClear.scale <= 1.2)){
            this.goalClear.scale += 0.05
        }
        else if((this.haveLoaded === 3) && (this.goalFail.position.y <= (Framework.Game.getCanvasHeight()/2)-100)){
            this.goalFail.position.y += 10;
        }

        //update
        this.backBtn1.update();
        this.backBtn2.update();
        this.Oldman.update();

        //object update
        this.objs.forEach(element => {
            element.update();
        });

        //text update
        this.moneyTxt.text = this.Oldman.money;
        this.remainTime.text = this.time;

        //timeout
        if(this.time <= 0){
            this.time = 999;
            this.toNextLevel();
        }

        //Oldman status
        switch(this.Oldman.status) {
            case "shooting":
                this.length += 5;
                if( this.catcher.upperLeft.x <= this.objectScene.position.x ||
                    this.catcher.lowerRight.x >= this.objectScene.position.x + 1300 ||
                    this.catcher.lowerRight.y >= Framework.Game.getCanvasHeight()) {
                    this.Oldman.pull(0);
                }
                
                //object detect
                for(i = 0; i < this.objs.length; i++) {
                    let element = this.objs[i];
                    if(element.catch(this.catcher, this.circle, this.objs)){
                        element.setPos(this.catcher.position, {x: 0, y: -14});

                        //remove from objs
                        index = this.objs.indexOf(element);
                        if(index >= 0)
                            this.objs.splice(index, 1);

                        console.log(element.weight);
                        this.Oldman.pull(element.weight, element);
                        break;
                    }
                }

                break;
            case "pulling":
                if(this.pressUp == true){
                    if(! this.isBombAttached){
                        this.bomb.position = {x:0, y:-9999};
                        this.bomb.layer = 100;
                        this.circle.attach(this.bomb);
                        this.isBombAttached = true;
                        //丟炸彈動畫
                        this.oldmanScene.attach(this.Oldman.throwBombSprite);
                        this.Oldman.throwBombSprite.start();
                        let self = this;
                        setTimeout(function(){
                            self.oldmanScene.detach(self.Oldman.throwBombSprite);
                            self.bomb.position = {x:0, y:0};
                        },100)
                    }
                    this.bomb.position.y += 20;
                    if(this.bomb.position.y >= this.catcher.position.y){
                        let self = this;
                        this.pressUp = false;
                        this.isBombAttached = false;
                        this.circle.detach(this.bomb);
                        this.bombAnime.position = this.catcher.upperLeft;
                        this.rootScene.attach(this.bombAnime);
                        this.bombAnime.start()
                        this.Oldman.useBomb();
                        setTimeout(function(){
                            self.rootScene.detach(self.bombAnime);
                        }, 600);
                    }
                }
                this.length -= this.Oldman.pullSpeed;
                if(this.Oldman.grabbing) {
                    this.Oldman.grabbing.setPos(this.catcher.position, {x: 0, y: -14});
                }

                if(this.length <= this.initLen) {
                    this.length = this.initLen;
                    this.Oldman.waiting();
                }
                break;
            case "default":
                this.circle.rotation = Math.sin(((new Date() - this.startTime) / 3000) * Math.PI) * 65;
                break;
            case "waiting":
                if(this.Oldman.AnimationTxt.position.y > 10){
                    this.Oldman.AnimationTxt.position.y -= 2;
                }
                this.draw(Framework.Game._context);
                break;
            default:
                console.log("unknown status " + this.Oldman.status);
                break;
        }
        
        this.catcher.position = {
            x: 0,
            y: this.length
        };

        if(this.m_pressed){
            if(this.Oldman.AnimationTxt.position.y > 10){
                this.Oldman.AnimationTxt.position.y -= 2;
            }
            else{
                this.m_pressed = false;
            }
        }
    },

    playEarn:function() {
        this.earnPlaying = (this.earnPlaying + 1) % 3;
        this.audio.play({name: 'earnMoney2_' + this.earnPlaying});
    },

    draw:function(parentCtx){
        this.rootScene.draw();
        if(this.haveLoaded === 0){
            this.goalTxt.draw(parentCtx);
            this.goalMoneyTxt.draw(parentCtx);
        }
        else if(this.haveLoaded === 1){
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
            parentCtx.lineWidth = 3;
            parentCtx.beginPath();
            parentCtx.moveTo(this.circle.position.x, this.circle.position.y);
            parentCtx.lineTo(this.catcherPos.x, this.catcherPos.y);
            parentCtx.stroke();
            this.circle.draw();
            
            if(this.Oldman.status === 'waiting' || this.m_pressed){
                this.Oldman.AnimationTxt.draw(parentCtx);
            }
            
            this.objs.forEach(element => {
                element.draw(parentCtx);
            });
        } else if(this.haveLoaded === 2 && (!this.goalAttached)){
            this.rootScene.attach(this.loadingPic);
            this.rootScene.attach(this.goalClear);
            this.goalAttached = true;
        } else if(this.haveLoaded === 3 && (!this.goalAttached)){
            this.rootScene.attach(this.loadingPic);
            this.rootScene.attach(this.goalFail);
            this.goalAttached = true;
        } else if(this.haveLoaded === 4){
            if(!this.goalAttached){
                this.rootScene.attach(this.resultBackground);
                this.rootScene.attach(this.result);
                this.rootScene.detach(this.loadingPic);
                this.rootScene.detach(this.goalFail);
            } 
            this.resultTxt.draw(parentCtx)
        }
    },

    keydown:function(e, list){
        Framework.DebugInfo.Log.warning(e.key);
        console.log(e.key);
        switch(e.key) {
            case 'M':
                this.Oldman.money += 3000;
                this.Oldman.earnMoneyAnime(3000, 'money');
                this.m_pressed = true;
                this.playEarn();
                break;
            case 'Q':
                if(this.Oldman.status == 'pulling') {
                    this.length = this.initLen;
                }
                break;
            case 'Space':
                if(this.Oldman.status === "default"){
                    this.Oldman.shoot();
                }
                break;
            case 'Up':
                if(this.Oldman.bomb.length > 0 && this.Oldman.grabbing && !this.pressUp){
                    this.pressUp = true;            //是否按上
                    this.isBombAttached = false;    //是否attach
                }
                break;
            case 'Enter':
                if(!this.isFullScreen) {
                    //Framework.Game.fullScreen();
                    document.documentElement.requestFullscreen()
                    this.isFullScreen = true;
                } else {
                    //Framework.Game.exitFullScreen();
                    document.exitFullscreen()
                    this.isFullScreen = false;
                }
                break;
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
        console.log(e.x, e.y);
        //console.log(this.circle.rotation);
        /*this.objs.forEach(element => {
            element.click(e);
        });*/
        
        //button
        this.backBtn1.click(e);
        if(this.backBtn1.isHovered)
            return;
        this.backBtn2.click(e);

        //最後的結算畫面
        if(this.haveLoaded === 4 && (e.x >= 1020 && e.x <= 1205) && (e.y >= 735 && e.y <= 790)){
            Framework.Game.goToLevel('menu');
        }
    },

    blackAttach: function(){
        //Right side black
        this.blackPic1 = new Framework.Sprite(define.imagePath + 'black.png');
        this.blackPic1.scale = 1;
        this.blackPic1.position = {x: 0, y: 475};
        this.rootScene.attach(this.blackPic1);
        //Left side black
        this.blackPic2 = new Framework.Sprite(define.imagePath + 'black.png');
        this.blackPic2.scale = 1;
        this.blackPic2.position = {x: Framework.Game.getCanvasWidth(), y: 475};
        this.rootScene.attach(this.blackPic2);
    },

    blackdetach: function(){
        //Right side black
        this.rootScene.detach(this.blackPic1);
        //Left side black
        this.rootScene.detach(this.blackPic2);
    },
});
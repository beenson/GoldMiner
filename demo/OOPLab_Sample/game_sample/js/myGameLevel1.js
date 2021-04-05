var MyGame = Framework.Class(Framework.Level , {
	load: function(){
        this.target = 650;
        this.time = 60;
        this.money = 0;

        this.isStop = false;
        this.oldman_status = "default";
        this.shooting = false;
        this.isPullback = false;
        
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
        

        /*this.oldman = new Framework.Sprite(define.imagePath + '/Oldman/normal.jpg');
        this.oldman.position = {
            x: Framework.Game.getCanvasWidth() / 2,
            y: 65
        }
        this.oldman.scale = 1.15;
        this.rootScene.attach(this.oldman);*/

        //爪子爪子
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
        
        //WTF is this?
        /*this.rectPosition = { 
            x: Framework.Game.getCanvasWidth() / 2 - 130,
            y: Framework.Game.getCanvasHeight() / 2 - 90
        };
		
		this.position = {
			x: 100,
			y: 100
		}
        this.rotation = 0;*/

        //---------------------按鈕或文字物件---------------------
        var self = this;

        //object area init
        this.objectScene = new Framework.Scene();
        this.objectScene.position = {x: 150, y:0};

        //objects
        this.object = new Object(Items.larGold , {x:0, y:0}, this.audio, this.objectScene);

        //button
        this.backBtn1 = new Button(this, (Framework.Game.getCanvasWidth() / 2) - 250, 20, 70, 50,
        {text: '退出', font: 'bold 32px 標楷體', color: 'white', background: 'brown', textOffset: 8, click: function(){
            clearInterval(self.timer);
            Framework.Game.goToPreviousLevel();
        }});

        //text
        this.backBtn2 = new Button(this, (Framework.Game.getCanvasWidth() / 2) - 250, 20+50, 70, 50,
        {text: '關卡', font: 'bold 32px 標楷體', color: 'white', background: 'brown', textOffset: 8, click: function(){
            clearInterval(self.timer);
            Framework.Game.goToPreviousLevel();
        }});
        this.currentMoney = new Text(this, 160, 20, 100, 40,
            {text: '金錢:', font: 'bold 32px 標楷體', color: 'brown', textAlign: 'left'});
        this.moneyTxt = new Text(this, 250, 20, 100, 40,
            {text: '金錢:', font: 'bold 32px 標楷體', color: 'brown', textAlign: 'left'});
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
            self.rootScene.attach(self.objectScene);
            self.rootScene.attach(self.circle);
            self.circle.attach(self.catcher);
            
            self.timer = setInterval(function(){
                self.time--;
            }, 1000);
            self.haveLoaded = 1;
        }, 2000);
	},

    initialize: function() {
        /*this.audio = new Framework.Audio({
            start: {
                mp3: define.soundPath + 'GameStart.mp3'
            },
            pull: {
                mp3: define.soundPath + 'PullingString.mp3'
            },
            catch: {
                mp3: define.soundPath + 'Catch.mp3'
            }
        });*/
    },

    update: function() {
        //update
        this.backBtn1.update();
        this.backBtn2.update();

        //text update
        this.moneyTxt.text = this.money;
        this.remainTime.text = this.time;

        //timeout
        if(this.time <= 0){
            clearInterval(this.timer);
            Framework.Game.goToNextLevel();
        }

        //rotate direction
        if(Math.abs(this.circle.rotation) >= 70) {
            this.circleSpeed *= -1;
        }

        switch(this.Oldman.status) {
            case "shooting":
                this.length += 5;
                if(this.catcher.position.y >= Framework.Game.getCanvasHeight()) {
                    this.Oldman.pull();
                }
                break;
            case "pulling":
                this.length -= 10;
                if(this.length <= 50) {
                    this.length = 50;
                    this.Oldman.default(true);
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
            
            //debug
            //this.object.draw(parentCtx);
        }
        //可支援畫各種單純的圖形和字
        /*parentCtx.fillStyle = (this.secondHandRotationRate > 0)?'green':'red'; 
        parentCtx.fillRect(this.rectPosition.x , this.rectPosition.y, 260, 90);  
        parentCtx.font = '65pt bold';
        parentCtx.fillStyle = 'white';
        parentCtx.textBaseline = 'top';
        parentCtx.textAlign = 'center';
        parentCtx.fillText('Click Me', this.rectPosition.x + 130, this.rectPosition.y, 260);*/
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
        this.object.click(e);
        
        //button
        this.backBtn1.click(e);
        this.backBtn2.click(e);
        
        //WTF??
        /*if (!this.rectPosition) {
            return;
        } */
        /*if(e.x >= this.rectPosition.x && e.x <= this.rectPosition.x + 260 && e.y >= this.rectPosition.y && e.y <= this.rectPosition.y + 90) {
            if(!this.isStop) {
                this.secondHandRotationRate = 0;
                this.isStop = true;
                //Audio可以一次暫停所有的音樂
                //this.audio.pauseAll();
                clearInterval(this.timer);
                Framework.Game.goToNextLevel();
            }
            else {
                this.isStop = false;
                this.secondHandRotationRate = 0.3;
                //Audio也可以針對一首歌進行操作(繼續播放)
                //this.audio.resume('song2');
            }
        }*/
        /*else if(e.x >= this.clock.upperLeft.x && e.x <= this.clock.lowerRight.x && e.y >= this.clock.upperLeft.y && e.y <= this.clock.lowerRight.y) {
            //由於Click Me在太小的螢幕的情況下會蓋到Clock, 導致點擊Click Me時, 會回到前一個Level,
            //故使用else if, 並優先選擇Click Me會觸發的條件
            this.audio.stopAll();
            Framework.Game.goToPreviousLevel();            
            return;
        }*/
    },
});
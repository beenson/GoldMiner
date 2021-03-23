var MyGame = Framework.Class(Framework.Level , {
	load: function(){
	    this.loadingPic = new Framework.Sprite(define.imagePath+'/background/Gold.jpg');
        this.loadingPic.position = {
            x: Framework.Game.getCanvasWidth() / 2,
            y: Framework.Game.getCanvasHeight() / 2
        };
        this.loadingPic.scale = 1.5;
        this.rootScene.attach(this.loadingPic);
        this.haveLoaded = 0;

        this.isStop = false;
        this.oldman_isPlayed = false;
        this.shooting = false;
        //----------------------------------------------
        this.gameMap = new GameMap();
        this.gameMap.load();
        //----------------------------------------------
        this.OldmanDefault = new Framework.Sprite(define.imagePath + '/Oldman/align.jpg');
        var photoLink = [
            define.imagePath + '/Oldman/1.png',
            define.imagePath + '/Oldman/2.png',
            define.imagePath + '/Oldman/3.png',
            define.imagePath + '/Oldman/4.png',
            define.imagePath + '/Oldman/5.png',
            define.imagePath + '/Oldman/6.png',
            define.imagePath + '/Oldman/7.png',
            define.imagePath + '/Oldman/8.png',
            define.imagePath + '/Oldman/9.png',
            define.imagePath + '/Oldman/10.png',
            define.imagePath + '/Oldman/11.png',
            define.imagePath + '/Oldman/12.png',
            define.imagePath + '/Oldman/13.png',
            define.imagePath + '/Oldman/14.png'
        ];
        this.Oldman = new Framework.AnimationSprite({url: photoLink, loop: true,  speed: 5});
        this.Oldman.scale = 1.2;
        this.Oldman.position = {
            x: Framework.Game.getCanvasWidth() / 2 + 10,
            y: 50
        };
        this.OldmanDefault.scale = this.Oldman.scale;
        this.OldmanDefault.position = this.Oldman.position;
        //----------------------------------------------

        /*this.oldman = new Framework.Sprite(define.imagePath + '/Oldman/normal.jpg');
        this.oldman.position = {
            x: Framework.Game.getCanvasWidth() / 2,
            y: 65
        }
        this.oldman.scale = 1.15;
        this.rootScene.attach(this.oldman);*/

        this.timer = setInterval(function(){
            console.log('ya');
        }, 1000);
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
        //爪子爪子end

        //載入要被播放的音樂清單
        //資料夾內只提供mp3檔案, 其餘的音樂檔案, 請自行轉檔測試
        
        this.audio = new Framework.Audio({
            start: {
                mp3: define.soundPath + 'GameStart.mp3'
            },
            pull: {
                mp3: define.soundPath + 'PullingString.mp3'
            }
        });
        //播放時, 需要給name, 其餘參數可參考W3C
        this.audio.play({name: 'start'});

        this.rectPosition = { 
            x: Framework.Game.getCanvasWidth() / 2 - 130,
            y: Framework.Game.getCanvasHeight() / 2 - 90
        };
		
		this.position = {
			x: 100,
			y: 100
		}
        this.rotation = 0;

        var self = this;
        this.backBtn1 = new Button(this, (Framework.Game.getCanvasWidth() / 2) - 250, 20, 70, 50,
        {text: '退出', font: 'bold 32px 標楷體', color: 'white', background: 'brown', textOffset: 8, click: function(){
            clearInterval(self.timer);
            Framework.Game.goToPreviousLevel();
        }});

        this.backBtn2 = new Button(this, (Framework.Game.getCanvasWidth() / 2) - 250, 20+50, 70, 50,
        {text: '關卡', font: 'bold 32px 標楷體', color: 'white', background: 'brown', textOffset: 8, click: function(){
            clearInterval(self.timer);
            Framework.Game.goToPreviousLevel();
        }});
        //-----------loading完後再繪製物件--------------
        setTimeout(function(){
            self.rootScene.attach(self.gameMap);
            self.rootScene.detach(self.loadingPic);
            self.rootScene.attach(self.OldmanDefault);
            self.rootScene.attach(self.circle);
            self.circle.attach(self.catcher);
            //self.Oldman.start();
            self.haveLoaded = 1;
        }, 2000);
	},

    initialize: function() {
        
    },

    update: function() {
        this.backBtn1.update();
        this.backBtn2.update();
        if(Math.abs(this.circle.rotation) >= 70) {
            this.circleSpeed *= -1;
        }

        this.catcher.position = {
            x: 0,
            y: this.length
        };

        if(this.shooting) {
            this.length += 5;
            if(!this.oldman_isPlayed){
                this.oldman_isPlayed = true;
                this.rootScene.detach(this.OldmanDefault);
                this.rootScene.attach(this.Oldman);
                this.Oldman.start();
            }
            if(this.catcher.position.y >= Framework.Game.getCanvasHeight()) {
                this.shooting = false;
                this.length = 50;
                this.rootScene.detach(this.Oldman);
                this.rootScene.attach(this.OldmanDefault);
                this.oldman_isPlayed = false;
            }
        }else {
            this.circle.rotation += this.circleSpeed;
        }
    },

    draw:function(parentCtx){
        this.rootScene.draw();


        if(this.haveLoaded === 1){
            this.backBtn1.draw(parentCtx);
            this.backBtn2.draw(parentCtx);

            this.catcherPos = {
                x: this.circle.position.x + (this.length - this.catcher.height / 2) * Math.cos((this.circle.rotation + 90) / 180 * Math.PI),
                y: this.circle.position.y + (this.length - this.catcher.height / 2) * Math.sin((this.circle.rotation + 90) / 180 * Math.PI)
            }
            parentCtx.fillStyle = 'black'; 
            parentCtx.lineWidth = 5;
            parentCtx.moveTo(this.circle.position.x, this.circle.position.y);
            parentCtx.lineTo(this.catcherPos.x, this.catcherPos.y);
            parentCtx.stroke();
            this.circle.draw();
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
            this.shooting = true;
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
        this.backBtn1.mousemove(e);
        this.backBtn2.mousemove(e);
    },

    click: function (e) {  
        console.log(e.x, e.y);
        console.log(this.circle.rotation);
        if (!this.rectPosition) {
            return;
        } 

        this.backBtn1.click(e);
        this.backBtn2.click(e);
        
        if(e.x >= this.rectPosition.x && e.x <= this.rectPosition.x + 260 && e.y >= this.rectPosition.y && e.y <= this.rectPosition.y + 90) {
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
                this.audio.resume('song2');
            }
        }
        /*else if(e.x >= this.clock.upperLeft.x && e.x <= this.clock.lowerRight.x && e.y >= this.clock.upperLeft.y && e.y <= this.clock.lowerRight.y) {
            //由於Click Me在太小的螢幕的情況下會蓋到Clock, 導致點擊Click Me時, 會回到前一個Level,
            //故使用else if, 並優先選擇Click Me會觸發的條件
            this.audio.stopAll();
            Framework.Game.goToPreviousLevel();            
            return;
        }*/
    },
});
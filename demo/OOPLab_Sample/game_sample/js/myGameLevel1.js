var MyGame = Framework.Class(Framework.Level , {
	load: function(){
	    var characterPosition;

        this.isStop = false;
        this.isPlayed = false;
        //----------------------------------------------
        this.gameMap = new GameMap();
        this.gameMap.load();
        this.rootScene.attach(this.gameMap);
        //----------------------------------------------

        this.oldman = new Framework.Sprite(define.imagePath + '/Oldman/normal.jpg');
        this.oldman.position = {
            x: Framework.Game.getCanvasWidth() / 2,
            y: 65
        }
        this.oldman.scale = 1.15;
        this.rootScene.attach(this.oldman);


        //爪子爪子
        this.circle = new Framework.Scene();
        this.circle.position = {
            x: Framework.Game.getCanvasWidth() / 2,
            y: 70
        };
        this.rootScene.attach(this.circle);

        this.catcher = new Framework.Sprite(define.imagePath + 'Catcher2.png');
        this.catcher.position = {
            x: 0,
            y: 50
        };
        this.catcher.scale = 1.1;
        this.circle.attach(this.catcher);

        this.circleSpeed = 0.7;
        //爪子爪子end

        this.backBtn1 = new Button(this, (Framework.Game.getCanvasWidth() / 2) - 250, 35, 70, 50,
        {text: '退出', font: 'bold 32px 標楷體', color: 'white', background: 'brown', textOffset: 8, click: function(){
<<<<<<< HEAD
            clearInterval(this.timer);
=======
            console.log('ggg');
>>>>>>> 30ee830405baa8c15e6ca292fdfe2b5479aa30c0
            Framework.Game.goToPreviousLevel();
        }});
        this.backBtn2 = new Button(this, (Framework.Game.getCanvasWidth() / 2) - 250, 35+50, 70, 50,
        {text: '關卡', font: 'bold 32px 標楷體', color: 'white', background: 'brown', textOffset: 8, click: function(){
<<<<<<< HEAD
            clearInterval(this.timer);
=======
>>>>>>> 30ee830405baa8c15e6ca292fdfe2b5479aa30c0
            Framework.Game.goToPreviousLevel();
        }});

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
        
        this.timer = setInterval(function(){
            console.log('ya');
        }, 1000);
	},

    initialize: function() {
        
    },

    update: function() {
        if(Math.abs(this.circle.rotation) >= 50) {
            this.circleSpeed *= -1;
        }
        this.circle.rotation += this.circleSpeed;
        this.backBtn1.update();
        this.backBtn2.update();
    },

    draw:function(parentCtx){
        this.rootScene.draw();
        this.backBtn1.draw(parentCtx);
        this.backBtn2.draw(parentCtx);
        //可支援畫各種單純的圖形和字
        parentCtx.fillStyle = (this.secondHandRotationRate > 0)?'green':'red'; 
        parentCtx.fillRect(this.rectPosition.x , this.rectPosition.y, 260, 90);  
        parentCtx.font = '65pt bold';
        parentCtx.fillStyle = 'white';
        parentCtx.textBaseline = 'top';
        parentCtx.textAlign = 'center';
        parentCtx.fillText('Click Me', this.rectPosition.x + 130, this.rectPosition.y, 260);
    },

    keydown:function(e, list){
        Framework.DebugInfo.Log.warning(e.key);
        if(e.key === 'Numpad +' || e.key === '=') {
            this.circleSpeed += 0.05;
        }

        if(e.key === 'Numpad -' || e.key === '-') {
            this.circleSpeed -= 0.05;
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
<<<<<<< HEAD
        this.backBtn2.click(e);
=======
        this.backBtn2.clicked(e);
>>>>>>> 30ee830405baa8c15e6ca292fdfe2b5479aa30c0
        
        if(e.x >= this.rectPosition.x && e.x <= this.rectPosition.x + 260 && e.y >= this.rectPosition.y && e.y <= this.rectPosition.y + 90) {
            if(!this.isStop) {
                this.secondHandRotationRate = 0;
                this.isStop = true;
                //Audio可以一次暫停所有的音樂
                //this.audio.pauseAll();
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
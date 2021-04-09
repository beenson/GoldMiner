var Shop = Framework.Class(Framework.Level , {
	load: function(){
        //----------background----------
        this.blackPic1 = new Framework.Sprite(define.imagePath + 'black.png');
        this.blackPic1.scale = 5;
        this.blackPic1.position = {x: 0 , y: Framework.Game.getCanvasHeight() / 2};
        this.rootScene.attach(this.blackPic1);
        this.blackPic2 = new Framework.Sprite(define.imagePath + 'black.png');
        this.blackPic2.scale = 5;
        this.blackPic2.position = {x: 1413 , y: Framework.Game.getCanvasHeight() / 2};
        this.rootScene.attach(this.blackPic2);

        this.mapPic = new Framework.Sprite(define.backgroundPath + 'shop/background.jpg');
        this.mapPic.scale = 1.15;
        this.mapPic.position = {x: Framework.Game.getCanvasWidth() / 2 , y: Framework.Game.getCanvasHeight() / 2};
        this.rootScene.attach(this.mapPic);
        //----------items----------
        this.itemPosition = [
            {x:(Framework.Game.getCanvasWidth() / 2) - 500 , y:(Framework.Game.getCanvasHeight() / 2) + 100},
            {x:(Framework.Game.getCanvasWidth() / 2) - 250 , y:(Framework.Game.getCanvasHeight() / 2) + 100},
            {x:Framework.Game.getCanvasWidth() / 2, y:(Framework.Game.getCanvasHeight() / 2) + 100},
        ];

        this.clover = new Framework.Sprite(define.imagePath + 'shop/luckyFlower.png');
        this.bomb = new Framework.Sprite(define.imagePath + 'shop/firecracker.png');
        this.potion = new Framework.Sprite(define.imagePath + 'shop/magicPotion.png');
        this.book = new Framework.Sprite(define.imagePath + 'shop/stoneBook_.png');
        this.bottle = new Framework.Sprite(define.imagePath + 'shop/IDK.png');  //make diamond price higher

        this.clover.position = this.itemPosition[0];
        this.bomb.position = this.itemPosition[1];
        this.book.position = this.itemPosition[2];

        this.rootScene.attach(this.clover);
        this.rootScene.attach(this.bomb);
        this.rootScene.attach(this.book);
        //----------price text----------
        this.price1 = new Text(this, (this.itemPosition[0].x) - 30, (this.itemPosition[0].y) + 75, 100, 40,
            {text: '$ 30', font: 'bold 32px 標楷體', color: 'lime', textAlign: 'left'});
        this.price2 = new Text(this, (this.itemPosition[1].x) - 30, (this.itemPosition[1].y) + 75, 100, 40,
            {text: '$ 100', font: 'bold 32px 標楷體', color: 'lime', textAlign: 'left'});
        this.price3 = new Text(this, (this.itemPosition[2].x) - 30, (this.itemPosition[2].y) + 75, 100, 40,
            {text: '$ 50', font: 'bold 32px 標楷體', color: 'lime', textAlign: 'left'});
	},

    initialize: function() {
        
    },

    update: function() {
        
    },

    draw:function(parentCtx){
        this.rootScene.draw();
        this.price1.draw(parentCtx);
        this.price2.draw(parentCtx);
        this.price3.draw(parentCtx);
    },

    /*keydown:function(e, list){
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
        
    },*/

    click: function (e) {  
        //console.log(e.x, e.y);
        /*if(e.x>=(this.itemPosition[0].x)-37 && e.x<=(this.itemPosition[0].x)+37 &&  e.y>=this.itemPosition[0].y-65 && e.y<=(this.itemPosition[0].y)+65){
            console.log('clover');
        }
        if(e.x>=(this.itemPosition[1].x)-25 && e.x<=(this.itemPosition[1].x)+25 &&  e.y>=this.itemPosition[1].y-51 && e.y<=(this.itemPosition[1].y)+51){
            console.log('bomb');
        }
        if(e.x>=(this.itemPosition[2].x)-69 && e.x<=(this.itemPosition[2].x)+69 &&  e.y>=this.itemPosition[2].y-65 && e.y<=(this.itemPosition[2].y)+65){
            console.log('book');
        }*/
        if(e.x>=this.clover.upperLeft.x && e.x<=this.clover.lowerRight.x && e.y>=this.clover.upperLeft.y &&  e.y<=this.clover.lowerRight.y){
            console.log('clover');
        }
        if(e.x>=this.bomb.upperLeft.x && e.x<=this.bomb.lowerRight.x && e.y>=this.bomb.upperLeft.y &&  e.y<=this.bomb.lowerRight.y){
            console.log('bomb');
        }
        if(e.x>=this.book.upperLeft.x && e.x<=this.book.lowerRight.x && e.y>=this.book.upperLeft.y &&  e.y<=this.book.lowerRight.y){
            console.log('book');
        }
        /*this.object.click(e);
        
        //button
        this.backBtn1.click(e);
        this.backBtn2.click(e);
        
        //WTF??
        if (!this.rectPosition) {
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
var MyAbout = Framework.Class(Framework.Level , {
	load: function(){
        this.background = new Framework.Sprite(define.imagePath + 'black_big.png');
        this.background.scale = 1;
        this.background.position = {x: Framework.Game.getCanvasWidth() / 2, y: Framework.Game.getCanvasHeight() / 2};
        this.rootScene.attach(this.background);
        this.isFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) || (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) || (document.mozFullScreenElement && document.mozFullScreenElement !== null) || (document.msFullscreenElement && document.msFullscreenElement !== null);

        //製作名單等文字
        this.backBtn = new Framework.Sprite(define.imagePath + 'arrow.png');
        this.backBtn.position = {x: 150, y: 200};
        
        this.texts = []
        this.texts.push(new Text(this, 90, 185, 0, 0,{text: 'Go back', font: 'bold 36px Arial', color: 'white', textAlign: 'left'}));
        this.texts.push(new Text(this, 100, 350, 0, 0,{text: '作者:', font: 'bold 36px 標楷體', color: 'white', textAlign: 'left'}));
        this.texts.push(new Text(this, 255+72, 400, 0, 0,{text: '第13組', font: 'bold 36px 標楷體', color: 'white', textAlign: 'left'}));
        this.texts.push(new Text(this, 172, 450, 0, 0,{text: '資工二 108590005 何秉育', font: 'bold 36px 標楷體', color: 'white', textAlign: 'left'}));
        this.texts.push(new Text(this, 172, 500, 0, 0,{text: '資工二 108590027 劉程耀', font: 'bold 36px 標楷體', color: 'white', textAlign: 'left'}));
        this.texts.push(new Text(this, Framework.Game.getCanvasWidth() / 2, 350, 0, 0,{text: '指導教授:', font: 'bold 36px 標楷體', color: 'white', textAlign: 'left'}));
        this.texts.push(new Text(this, (Framework.Game.getCanvasWidth() / 2)+72, 400, 0, 0,{text: '陳碩漢 教授', font: 'bold 36px 標楷體', color: 'white', textAlign: 'left'}));
        this.rootScene.attach(this.backBtn);
	},

    initialize: function() {
                           
    },

    update: function() {
        this.rootScene.update();                        
    },

    draw:function(parentCtx){
        this.rootScene.draw();
        this.texts.forEach(element => {
            element.draw(parentCtx);
        });
    },

    keydown:function(e, list){
        if(e.key === 'Enter') {
            if(!this.isFullScreen) {
                document.documentElement.requestFullscreen()
                this.isFullScreen = true;
            } else {
                document.exitFullscreen()
                this.isFullScreen = false;
            }
        }
    },

    touchstart: function (e) {
        //為了要讓Mouse和Touch都有一樣的事件
        //又要減少Duplicated code, 故在Touch事件被觸發時, 去Trigger Mouse事件
        this.click({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    },
    
    click: function (e) {  
        if(e.x>=this.backBtn.upperLeft.x && e.x<=this.backBtn.lowerRight.x && e.y>=this.backBtn.upperLeft.y &&  e.y<=this.backBtn.lowerRight.y){
            Framework.Game.goToLevel('menu');
        }
    },

    mousemove: function(e) {
        
    },
});
var MyAbout = Framework.Class(Framework.Level , {
	load: function(){
        this.backBtn = new Button(this, 100, 100, 410, 85,
        { text: 'Go back to menu', font: 'bold 48px sans-serif', color: 'white', background: 'gray', textOffset: 20, click: function() {
            Framework.Game.goToLevel('menu');
        }});

        this.background = new Framework.Sprite(define.imagePath + 'black_big.png');
        this.background.scale = 1;
        this.background.position = {x: Framework.Game.getCanvasWidth() / 2, y: Framework.Game.getCanvasHeight() / 2};
        this.rootScene.attach(this.background);
        //製作名單等文字
        this.texts = []
        this.texts.push(new Text(this, 100, 350, 0, 0,{text: '作者:', font: 'bold 36px 標楷體', color: 'white', textAlign: 'left'}));
        this.texts.push(new Text(this, 255+72, 400, 0, 0,{text: '第13組', font: 'bold 36px 標楷體', color: 'white', textAlign: 'left'}));
        this.texts.push(new Text(this, 172, 450, 0, 0,{text: '資工二 108590005 何秉育', font: 'bold 36px 標楷體', color: 'white', textAlign: 'left'}));
        this.texts.push(new Text(this, 172, 500, 0, 0,{text: '資工二 108590027 劉程耀', font: 'bold 36px 標楷體', color: 'white', textAlign: 'left'}));
        this.texts.push(new Text(this, Framework.Game.getCanvasWidth() / 2, 350, 0, 0,{text: '指導教授:', font: 'bold 36px 標楷體', color: 'white', textAlign: 'left'}));
        this.texts.push(new Text(this, (Framework.Game.getCanvasWidth() / 2)+72, 400, 0, 0,{text: '陳碩漢 教授', font: 'bold 36px 標楷體', color: 'white', textAlign: 'left'}));
	},

    initialize: function() {
                           
    },

    update: function() {
        this.rootScene.update();
        this.backBtn.update();                             
    },

    draw:function(parentCtx){
        this.rootScene.draw();
        this.backBtn.draw(parentCtx);
        this.texts.forEach(element => {
            element.draw(parentCtx)
        });
    },

    keydown:function(e, list){
        
    },

    touchstart: function (e) {
        //為了要讓Mouse和Touch都有一樣的事件
        //又要減少Duplicated code, 故在Touch事件被觸發時, 去Trigger Mouse事件
        this.click({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    },

    mousemove: function(e) {   
        this.backBtn.mousemove(e);
    },
    
    click: function (e) {  
        this.backBtn.click(e);
    },
});
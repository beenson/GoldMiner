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
        //製作名單
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
        console.log('draw');
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
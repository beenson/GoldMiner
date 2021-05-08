var MyMenu = Framework.exClass(Framework.GameMainMenu , {
	//初始化loadingProgress需要用到的圖片
    initializeProgressResource: function() {
        this.loading = new Framework.Sprite(define.imagePath + 'loading.jpg');
        this.loading.position = {x: Framework.Game.getCanvasWidth() / 2 , y: Framework.Game.getCanvasHeight() / 2};

        //為了或得到this.loading這個Sprite的絕對位置, 故需要先計算一次(在Game Loop執行時, 則會自動計算, 但因為loadingProgress只支援draw故需要自行計算)                  
    },

    //在initialize時會觸發的事件
    loadingProgress: function(ctx, requestInfo) {
        //console.log(Framework.ResourceManager.getFinishedRequestPercent())
        this.loading.draw(ctx);
        ctx.font ='90px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.fillText(Math.round(requestInfo.percent) + '%' , ctx.canvas.width / 2 , ctx.canvas.height / 2 + 300);
    },

	load: function(){
        localStorage.clear();
        localStorage.setItem('currentLevel', 1);
        localStorage.setItem('myMoney', 100000);
        localStorage.setItem('buyItem', ["bomb"])
        this.menu = new Framework.Sprite(define.backgroundPath + 'Menu.jpg');

        this.start = {
            x:430,
            y:345
        };
        this.button = new Button(this, 430, 345, 230, 85, { text: 'Start', font: 'bold 85px sans-serif', color: 'brown', click: function() {
            Framework.Game.goToNextLevel();
        }});
        
        //為了讓之後的位置較好操控, new出一個位於中心點且可以黏貼任何東西的容器
        //注意, Position都是用中心點
        this.center = new Framework.Scene();
        this.center.position = {
            x: Framework.Game.getCanvasWidth() / 2,
            y: Framework.Game.getCanvasHeight() / 2
        };

        this.menu.position = {
            x:0,
            y:0
        };

        //Framework支援scale, rotation等功能
        
        this.center.attach(this.menu);

        //rootScene為系統預設的容器, 由於其他東西都被attach到center上
        //將物件attach到center上, 順序是會影響繪製出來的效果的
        this.rootScene.attach(this.center);
	},
	
    initialize: function() {
		
    },

    update:function(){     
        this.rootScene.update();
        this.button.update();
        //this.rootScene.update(); 

        //目前的Framework, 當任何一個GameObject不做attach時, 則必須要自行update
        // this.center.update();        
        //this.scrollBar.update();
    },

    draw:function(parentCtx){
        this.rootScene.draw();
        this.button.draw(parentCtx);
    },

    mousemove: function(e) {      
        this.button.mousemove(e);
    },

    click: function(e) {
        console.log(e);

        this.button.click(e);
    },

    touchstart: function (e) {
        //為了要讓Mouse和Touch都有一樣的事件
        //又要減少Duplicated code, 故在Touch事件被觸發時, 去Trigger Mouse事件
        this.mousedown({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    },

    touchend: function (e) {
        this.mouseup();
    },
    
    touchmove: function (e) {
        this.mousemove({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
});
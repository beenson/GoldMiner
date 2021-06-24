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
        localStorage.setItem('myMoney', 0);
        localStorage.setItem('buyItem', []);
        localStorage.setItem('bomb', 0);
        this.menu = new Framework.Sprite(define.backgroundPath + 'Menu.jpg');

        this.start = {
            x:430,
            y:345
        };

        this.hint = []
        this.hint.push(new Text(this, 110, 600, 0, 0,{text: '玩法說明:', font: 'bold 36px Arial', color: 'white', textAlign: 'left'}));
        this.hint.push(new Text(this, 145, 650, 0, 0,{text: 'Space 射出爪子', font: 'bold 36px Arial', color: 'white', textAlign: 'left'}));
        this.hint.push(new Text(this, 145, 700, 0, 0,{text: '↑ 使用炸藥', font: 'bold 36px Arial', color: 'white', textAlign: 'left'}));
        this.hint.push(new Text(this, 145, 750, 0, 0,{text: 'M 立即獲得3000金幣', font: 'bold 36px Arial', color: 'white', textAlign: 'left'}));
        this.hint.push(new Text(this, 145, 800, 0, 0,{text: 'Q 立即收回抓取物品', font: 'bold 36px Arial', color: 'white', textAlign: 'left'}));
        this.hint.push(new Text(this, 145, 850, 0, 0,{text: 'B 增加一個炸藥', font: 'bold 36px Arial', color: 'white', textAlign: 'left'}));

        this.startBtn = new Button(this, 430, 345, 230, 85, { text: 'Start', font: 'bold 85px sans-serif', color: 'brown', click: function() {
            Framework.Game.goToLevel('level');
        }});

        this.aboutBtn = new Framework.Sprite(define.imagePath + 'button.png');
        this.aboutBtn.position = {x:(Framework.Game.getCanvasWidth() / 2)-100, y: Framework.Game.getCanvasHeight()-125};

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
        this.rootScene.attach(this.aboutBtn);
	},
	
    initialize: function() {
		
    },

    update:function(){     
        this.rootScene.update();
        this.startBtn.update();
        //目前的Framework, 當任何一個GameObject不做attach時, 則必須要自行update
        // this.center.update();        
        //this.scrollBar.update();
    },

    draw:function(parentCtx){
        this.rootScene.draw();
        this.startBtn.draw(parentCtx);
        this.hint.forEach(element => {
            element.draw(parentCtx);
        });
    },

    mousemove: function(e) {      
        this.startBtn.mousemove(e);
    },

    click: function(e) {
        console.log(e.x, e.y);
        this.startBtn.click(e);
        if(e.x>=this.aboutBtn.upperLeft.x && e.x<=this.aboutBtn.lowerRight.x && e.y>=this.aboutBtn.upperLeft.y &&  e.y<=this.aboutBtn.lowerRight.y){
            Framework.Game.goToLevel('about');
        }
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
});
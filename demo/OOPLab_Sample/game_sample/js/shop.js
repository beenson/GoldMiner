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
        this.buy = [];

        this.bomb = new Framework.Sprite(shopItems.bomb.image);
        this.potion = new Framework.Sprite(shopItems.potion.image);
        this.clover = new Framework.Sprite(shopItems.clover.image);
        this.book = new Framework.Sprite(shopItems.book.image);
        this.bottle = new Framework.Sprite(shopItems.bottle.image);  //make diamond price higher

        this.bomb.position = shopItems.bomb.position;
        this.potion.position = shopItems.potion.position;
        this.clover.position = shopItems.clover.position;
        this.book.position = shopItems.book.position;
        this.bottle.position = shopItems.bottle.position;

        this.rootScene.attach(this.bomb);
        this.rootScene.attach(this.potion);
        this.rootScene.attach(this.clover);
        this.rootScene.attach(this.book);
        this.rootScene.attach(this.bottle);
        //----------price text----------
        this.price1 = new Text(this, (this.bomb.position.x) - 30, (this.bomb.position.y) + 80, 100, 40,
            {text: '$' + shopItems.bomb.value, font: 'bold 32px 標楷體', color: 'green', textAlign: 'center'});
        this.price2 = new Text(this, (this.potion.position.x) - 30, (this.potion.position.y) + 80, 100, 40,
            {text: '$' + shopItems.potion.value, font: 'bold 32px 標楷體', color: 'green', textAlign: 'center'});
        this.price3 = new Text(this, (this.clover.position.x) - 30, (this.clover.position.y) + 80, 100, 40,
            {text: '$' + shopItems.clover.value, font: 'bold 32px 標楷體', color: 'green', textAlign: 'center'});
        this.price4 = new Text(this, (this.book.position.x) - 30, (this.book.position.y) + 80, 100, 40,
            {text: '$' + shopItems.book.value, font: 'bold 32px 標楷體', color: 'green', textAlign: 'center'});
        this.price5 = new Text(this, (this.bottle.position.x) - 30, (this.bottle.position.y) + 80, 100, 40,
            {text: '$' + shopItems.bottle.value, font: 'bold 32px 標楷體', color: 'green', textAlign: 'center'});

        //----------other setting----------
        localStorage.setItem('buyItem', [])
        this.money = parseInt(localStorage.getItem("myMoney"));
        this.moneyTxt = new Text(this, Framework.Game.getCanvasWidth() - 500, 50, 100, 40,
            {text: "金錢: " + this.money, font: 'bold 32px 標楷體', color: 'white', textAlign: 'center'});
	},

    initialize: function() {
        
    },

    update: function() {
        this.moneyTxt.text = "金錢: " + this.money;
        this.draw(this.Ctx);
    },

    draw:function(parentCtx){
        this.rootScene.draw();
        this.price1.draw(parentCtx);
        this.price2.draw(parentCtx);
        this.price3.draw(parentCtx);
        this.price4.draw(parentCtx);
        this.price5.draw(parentCtx);
        this.moneyTxt.draw(parentCtx);
        this.Ctx = parentCtx;
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
    },*/
    
    mousemove: function(e) {
        
    },

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
        if(e.x>=this.bomb.upperLeft.x && e.x<=this.bomb.lowerRight.x && e.y>=this.bomb.upperLeft.y &&  e.y<=this.bomb.lowerRight.y){
            console.log('bomb');
            this.rootScene.detach(this.bomb);
            if(this.buy.indexOf('bomb') === -1){
                this.buy.push('bomb');
                this.money -= shopItems.bomb.value;
            }
            this.price1.remove();
        }
        if(e.x>=this.potion.upperLeft.x && e.x<=this.potion.lowerRight.x && e.y>=this.potion.upperLeft.y &&  e.y<=this.potion.lowerRight.y){
            console.log('potion');
            this.rootScene.detach(this.potion);
            if(this.buy.indexOf('potion') === -1){
                this.buy.push('potion');
                this.money -= shopItems.potion.value;
            }
            this.price2.remove();
        }
        if(e.x>=this.clover.upperLeft.x && e.x<=this.clover.lowerRight.x && e.y>=this.clover.upperLeft.y &&  e.y<=this.clover.lowerRight.y){
            console.log('clover');
            this.rootScene.detach(this.clover);
            if(this.buy.indexOf('clover') === -1){
                this.buy.push('clover');
                this.money -= shopItems.clover.value;
            }
            this.price3.remove();
        }
        if(e.x>=this.book.upperLeft.x && e.x<=this.book.lowerRight.x && e.y>=this.book.upperLeft.y &&  e.y<=this.book.lowerRight.y){
            console.log('book');
            this.rootScene.detach(this.book);
            if(this.buy.indexOf('book') === -1){
                this.buy.push('book');
                this.money -= shopItems.book.value;
            }
            this.price4.remove();
        }
        if(e.x>=this.bottle.upperLeft.x && e.x<=this.bottle.lowerRight.x && e.y>=this.bottle.upperLeft.y &&  e.y<=this.bottle.lowerRight.y){
            console.log('bottle');
            this.rootScene.detach(this.bottle);
            if(this.buy.indexOf('bottle') === -1){
                this.buy.push('bottle');
                this.money -= shopItems.bottle.value;
            }
            this.price5.remove();
        }
        localStorage.setItem('buyItem', this.buy)
        
    },
    
});
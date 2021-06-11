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
        //----------sound----------
        this.audio = new Framework.Audio({
            deal: {
                mp3: define.soundPath + 'Shopping.mp3'
            },
            angry: {
                mp3: define.soundPath + 'Bad.mp3'
            },
        });
        //----------items----------
        this.buy = [];

        this.itemlist = [];
        this.itemlist.push(new shopItem(shopItems.bomb, this.rootScene));
        this.itemlist.push(new shopItem(shopItems.potion, this.rootScene));
        this.itemlist.push(new shopItem(shopItems.clover, this.rootScene));
        this.itemlist.push(new shopItem(shopItems.book, this.rootScene));
        this.itemlist.push(new shopItem(shopItems.bottle, this.rootScene));   //make diamond price higher

        //----------other setting---------- 
        this.waitNextlevel = false;
        this.bombOriginal = parseInt(localStorage.getItem('bomb')); //原本持有的炸彈數量
        var self = this;
        this.defaultInfo = "點擊以購買物品";
        localStorage.setItem('buyItem', [])
        this.money = parseInt(localStorage.getItem("myMoney"));
        this.moneyTxt = new Text(this, Framework.Game.getCanvasWidth() - 700, (Framework.Game.getCanvasHeight() / 2) - 125, 100, 40,
            {text: "持有金錢: " + this.money, font: 'bold 32px 標楷體', color: 'black', textAlign: 'center'});
        this.infoTxt = new Text(this, 225, (Framework.Game.getCanvasHeight() / 2) - 170, 100, 40,
            {text: this.defaultInfo, font: 'bold 32px 標楷體', color: 'black', textAlign: 'left'});

        this.btn = new Button(this, Framework.Game.getCanvasWidth() - 500, 100, 175, 65,
        {text: '下一關', font: 'bold 48px 標楷體', color: 'white', background: 'green', textOffset: 7, click: function(){
            self.nextLevel();
        }});
        this.subBtn = new Button(this, Framework.Game.getCanvasWidth() - 502, 98, 179, 69,
        {text: '', font: 'bold 48px 標楷體', color: 'white', background: 'lime', textOffset: 10});
        //----------when goToNextlevel----------
        this.notBuy = new Framework.Sprite(define.backgroundPath + 'shop/mad.jpg'); //沒買東西
        this.notBuy.scale = 1.15;
        this.notBuy.position = this.mapPic.position;

        this.pay = new Framework.AnimationSprite({url: Anime.shopOwner, loop: false,  speed: 12}); //有買東西
        this.pay.scale = 1.15;
        this.pay.position = this.mapPic.position;
	},

    initialize: function() {
        
    },

    update: function() {
        if(this.isFullScreenTmp === "true" && !this.isFullScreen){
            Framework.Game.fullScreen();
            this.isFullScreen = true;
        }
        this.moneyTxt.text = "持有金錢: " + this.money;
        this.draw(this.Ctx);
    },

    draw:function(parentCtx){
        this.rootScene.draw();
        this.itemlist.forEach(element => {
            element.drawPrice(parentCtx);
        });
        if(! this.waitNextlevel){
            this.infoTxt.draw(parentCtx);
            this.moneyTxt.draw(parentCtx);
            this.subBtn.draw(parentCtx);
            this.btn.draw(parentCtx);
        }
        this.Ctx = parentCtx;
    },

    keydown:function(e, list){
        /*Framework.DebugInfo.Log.warning(e.key);
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
        },*/

        if(e.key === 'Enter') {
            if(!this.isFullScreen) {
                //Framework.Game.fullScreen();
                document.documentElement.requestFullscreen()
                this.isFullScreen = true;
            } else {
                //Framework.Game.exitFullScreen();
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
    
    mousemove: function(e) {
        this.infoTxt.text = this.defaultInfo;
        this.itemlist.forEach(element => {
            if(element.detect(e)){
                this.infoTxt.text = element.getInfo();
            }
        });
    },

    click: function (e) {  
        //console.log(e.x, e.y);

        this.itemlist.forEach(element => {
            if(element.detect(e)){
                this.audio.play({name: 'deal'});
                if(this.buy.indexOf(element.getName() === -1) && this.money >= element.getValue()){
                    if(element.getName() == 'bomb') {
                        localStorage.setItem('bomb', parseInt(localStorage.getItem('bomb')) + 1);
                    } else {
                        this.buy.push(element.getName());
                    }
                    this.money -= element.getValue();
                    element.detach();
                    this.pos = this.itemlist.indexOf(element);
                    this.itemlist.splice(this.pos, 1);
                }
                
            }
        });

        localStorage.setItem('buyItem', this.buy)
        
        this.btn.click(e);
    },

    nextLevel: function(){
        localStorage.setItem("myMoney", this.money);
        this.waitNextlevel = true;
        this.defaultInfo = '';
        this.itemlist.splice(0, this.itemlist.length);
        this.rootScene.detach(this.mapPic);
        if(this.buy.length == 0 && (this.bombOriginal === parseInt(localStorage.getItem('bomb')))){
            this.audio.play({name: 'angry'});
            this.rootScene.attach(this.notBuy);
        }
        else{
            this.audio.play({name: 'deal'});
            this.rootScene.attach(this.pay);
            this.pay.start();
        }
        setTimeout(function(){
            Framework.Game.goToLevel('level');
        }, 1000);
    }
    
});
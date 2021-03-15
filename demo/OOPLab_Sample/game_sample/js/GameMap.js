var GameMap = function(){
    //圖片長寬
    this.MW = 100;
    this.MH = 200;
    this.position = {x: Framework.Game.getCanvasWidth() / 2 , y: Framework.Game.getCanvasHeight() / 2};
    this.position2 = {x: 0 , y: 0};
    
    this.load = function(){
        this.mapPic = new Framework.Sprite(define.backgroundPath + 'test.jpg');
        this.mapPic.scale = 1.15;
        this.blackPic = new Framework.Sprite(define.imagePath + 'black.png');
        this.blackPic.scale = 10;
    };

    this.initialize = function(){

    };

    this.update = function(){

    };

    this.draw = function(ctx){
        this.blackPic.position = this.position2;
        this.blackPic.draw(ctx);
        this.blackPic.position = {x: 1413, y: 0};
        this.blackPic.draw(ctx);
        this.mapPic.position = this.position;
        this.mapPic.draw(ctx);
    }
}
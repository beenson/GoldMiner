var GameMap = function(){
    //圖片長寬
    this.MW = 1;
    this.MH = 1;
    this.position = {x: Framework.Game.getCanvasWidth() / 2 , y: Framework.Game.getCanvasHeight() / 2};
    //this.position = {x: 0 , y: 0};
    
    this.load = function(){
        this.mapPic = new Framework.Sprite(define.imagePath + 'testMap.jpeg');
        this.mapPic.scale = 1.15;
    };

    this.initialize = function(){

    };

    this.update = function(){

    };

    this.draw = function(ctx){
        this.mapPic.position = this.position;
        this.mapPic.draw(ctx);
    }
}
var GameMap = function(){
    //圖片長寬
    this.MW = 70;
    this.MH = 40;
    this.position = {x:200, y: 500};
    this.map = [[1,2,1,2], [2,1,2,1],
                [0,1,0,1], [2,0,2,0],
                [1,2,1,2]];
    
    this.load = function(){
        this.greenPic = new Framework.Sprite(define.imagePath+'green.png');
        this.bluePic = new Framework.Sprite(define.imagePath+'blue.png');
    };

    this.initialize = function(){

    };

    this.update = function(){

    };

    this.draw = function(ctx){
        for(var i=0;i<5;i++){
            for(var j=0;j<4;j++){
                var picPosition = {
                    x: this.position.x + (this.MW*j) + this.MW/2,
                    y: this.position.y + (this.MH*i) + this.MH/2 
                }
                switch(this.map[i][j]){
                    case 0:
                        break;
                    case 1:
                        this.greenPic.position = picPosition;
                        this.greenPic.draw(ctx);
                        break;
                    case 2:
                        this.bluePic.position = picPosition;
                        this.bluePic.draw(ctx);
                        break;
                }
            }
        }
    }
}
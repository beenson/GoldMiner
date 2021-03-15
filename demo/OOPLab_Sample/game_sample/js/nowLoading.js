var nowLoading = Framework.Class(Framework.Level , {
    load : function(){
        this.pic = new Framework.Sprite(define.imagePath+'/background/Gold.jpg');
        this.pic.position = {
            x: Framework.Game.getCanvasWidth() / 2,
            y: Framework.Game.getCanvasHeight() / 2
        };
        this.pic.scale = 2;
        this.position = {x: 100, y: 100};
        setTimeout('Framework.Game.goToNextLevel()', 2000);
    },

    initiallize: function(){
        
    },
    
    update: function(){
        //let a = setTimeout(Framework.Game.goToNextLevel(), 1500);
        /*this.position = {
            x: this.position.x + 1,
            y: this.position.y
        }
        this.rotation++;
        this.pic.position = this.position;
        this.pic.rotation = this.position;*/
    },

        
    draw: function(ctx){
        this.pic.draw();
    },
});
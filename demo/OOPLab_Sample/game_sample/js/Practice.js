var Practice = function(){
    this.load = function(){
        this.pic = new Framework.Sprite(define.imagePath+'wolf.jpg');
        this.pic.position = {x: 100, y: 100};
        this.pic.rotation = 0;
        this.position = {x: 100, y: 100};
    };

    this.initiallize = function(){

    };

    this.update = function(){
        /*this.position = {
            x: this.position.x + 1,
            y: this.position.y
        }
        this.rotation++;
        this.pic.position = this.position;
        this.pic.rotation = this.position;*/
    };

    this.keydown = function(e, list){
        if(e.key === 'Right'){
            this.pic.rotation += 10;
        }
        if(e.key === 'Left'){
            this.pic.rotation -= 10;
        }
    };
        
    this.draw = function(ctx){
        this.pic.draw();
    };
};
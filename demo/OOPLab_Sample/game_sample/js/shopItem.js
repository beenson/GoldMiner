var shopItem = Framework.exClass({
    __construct:function(type, scene){
        this.obj = type;
        this.value = type.value || 0;
        this.path = type.image || "";
        this.position = type.position || {x: 0, y: 0};
        this.scale = 1;
        this.scene = scene;

        this.level = parseInt(localStorage.getItem("currentLevel"))-1;
        if(this.level > 1){
            let i;
            for(i = 2;i<=this.level;i++){
                this.value += 68*i;
            }
        }

        this.priceTxt = new Text(this, (this.obj.position.x) - 30, (this.obj.position.y) + 80, 100, 40,
            {text: '$' + this.value, font: 'bold 32px 華康中圓體', color: 'green', textAlign: 'center'})

        this.img = new Framework.Sprite(this.path);
        this.img.scale = this.scale;
        this.img.position = this.position;
        this.attach();
    },

    attach: function(){
        this.scene.attach(this.img);
    },

    detach: function() {
        this.scene.detach(this.img);
    },

    debug: function() {

    },


    drawPrice: function(parentCtx){
        this.priceTxt.draw(parentCtx);
    },

    click: function(e) {
        console.log(this.detect(e));
    },

    detect: function(e) {
        return (e.x>=this.img.upperLeft.x && e.x<=this.img.lowerRight.x && e.y>=this.img.upperLeft.y &&  e.y<=this.img.lowerRight.y);
    },

    getInfo: function(){
        return this.obj.info;
    },

    getName: function(){
        return this.obj.name;
    },

    getValue: function(){
        return this.value;
    },

    //draw is just for testing range of detect
    draw: function(parentCtx) {
        this.size = {
            width: this.img.lowerRight.x - this.img.upperLeft.x,
            height: this.img.lowerRight.y - this.img.upperLeft.y
        };
        parentCtx.fillStyle = "blue";
        parentCtx.fillRect(this.img.upperLeft.x , this.img.upperLeft.y, this.size.width, this.size.height);
        this.img.draw();
    }
});
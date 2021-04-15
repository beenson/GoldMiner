var Object = Framework.exClass({
    __construct:function(type, position, audio, scene){
        this.position = position || {x: 0, y: 0};
        this.size = type.size || {width: 0, length: 0};
        this.value = type.value || 0;
        this.weight = type.weight || 0;
        this.isBigPrice = type.isBigPrice || false;
        this.image = type.image || "";
        this.scale = type.scale || 1;
        this.destory = type.destory || function(){};
        this.grabbed = type.grabbed || function(){};
        this.move = type.move || function(){};
        this.scene = scene;

        this.sound = audio;
        this.position = {
            x: this.position.x + 73,
            y: this.position.y + 202
        };

        this.obj = new Framework.Sprite(this.image);
        this.obj.scale = this.scale;
        this.obj.position = this.position;
        this.attach();
    },

    attach: function(){
        this.obj.layer = 100;
        this.scene.attach(this.obj);
    },

    detach: function() {
        this.scene.detach(this.obj);
    },

    catch: function(pos, scene) {
        if(this.detect(pos)) {
            console.log("hihi");
            this.grabbed();
            this.detach();
            this.scene = scene;
            this.attach();
            return true;   
        }
        return false;
    },

    //only for grabbing
    setPos: function(pos, offset) {
        this.obj.position = {
            x: pos.x + offset.x,
            y: pos.y + this.obj.height / 2 + offset.y
        };
    },

    detect: function(pos) {
        return (pos.x >= this.obj.upperLeft.x && pos.x <= this.obj.lowerRight.x && pos.y >= this.obj.upperLeft.y && pos.y <= this.obj.lowerRight.y);
    },

    debug: function() {

    },

    click: function(e) {
        console.log(this.detect(e));
    },

    //draw is just for testing range of detect
    draw: function(parentCtx) {
        this.size = {
            width: this.obj.lowerRight.x - this.obj.upperLeft.x,
            height: this.obj.lowerRight.y - this.obj.upperLeft.y
        };
        parentCtx.fillStyle = "blue";
        parentCtx.fillRect(this.obj.upperLeft.x , this.obj.upperLeft.y, this.size.width, this.size.height);
        this.obj.draw();
    }
});
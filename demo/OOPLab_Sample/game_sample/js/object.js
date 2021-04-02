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
            x: this.position.x + this.size.width / 2,
            y: this.position.y + this.size.height / 2 + 140
        };

        this.obj = new Framework.Sprite(this.image);
        this.obj.scale = this.scale;
        this.obj.position = this.position;
        this.scene.attach(this.obj);
    },

    getObj: function(){
        return this.obj;
    },

    detect: function(pos){
        return (pos.x >= this.position.x && pos.x <= this.position.x + this.size.width && pos.y >= this.position.y && pos.y <= this.position.y + this.size.height);
    },

    debug: function(){
    },

    //draw is just for testing range of detect
    draw: function(parentCtx){
        parentCtx.fillStyle = "blue";
        parentCtx.fillRect(this.position.x , this.position.y, this.size.width, this.size.height);
    }
});
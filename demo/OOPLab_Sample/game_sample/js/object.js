var Object = Framework.exClass({
    __construct:function(type, position, audio, scene, move){
        this.position = position || {x: 0, y: 0};
        this.move = move || {};
        this.value = type.value || 0;
        this.weight = type.weight || 0;
        this.isBigPrice = type.isBigPrice || false;
        this.image = type.image || "";
        this.scale = type.scale || 1;
        this.destory = type.destory || function(){};
        this.grabbed = type.grabbed || function(){};
        this.scene = scene;

        this.sound = audio;
        this.position = {
            x: this.position.x + 73,
            y: this.position.y + 202
        };

        if(this.image) {
            this.obj = new Framework.Sprite(this.image);
        } else {
            this.move.dir = 2;
            this.anima = type.anima;
            this.forward = new Framework.AnimationSprite({url:this.anima.animaForward, loop:true , speed:2});
            this.forward.start();
            this.backward = new Framework.AnimationSprite({url:this.anima.animaBackward, loop:true , speed:2});
            this.backward.start();
            this.obj = this.forward;
        }
        
        this.obj.scale = this.scale;
        this.obj.position = this.position;
        this.attach();
    },

    attach: function(){
        this.obj.layer = 100;
        this.scene.attach(this.obj);
        if(!this.animation) {
            this.obj.draw();
        }
    },

    detach: function() {
        this.scene.detach(this.obj);
    },

    detect: function(pos) {
        return (pos.x >= this.obj.upperLeft.x && pos.x <= this.obj.lowerRight.x && pos.y >= this.obj.upperLeft.y && pos.y <= this.obj.lowerRight.y);
    },

    detectArea: function(range) {
        var center = {
            x: (range.lowerRight.x + range.upperLeft.x) / 2,
            y: (range.lowerRight.y + range.upperLeft.y) / 2
        }
        var right = range.lowerRight;
        var left = range.upperLeft;
        right.y = center.y;
        left.y = center.y;
        return this.detect(left) || this.detect(center) || this.detect(right);
    },
    
    update: function() {
        if(!this.move || !this.move.dir)
            return;

        if((this.move.dir > 0 && this.position.x >= this.move.end) || (this.move.dir < 0 && this.position.x <= this.move.start)) {
            this.move.dir *= -1;
            this.detach();
            if(this.move.dir > 0){
                this.obj = this.forward;
            } else {
                this.obj = this.backward;
            }
            this.attach();
        }

        this.position.x += this.move.dir;
        this.obj.position = this.position;
    },

    catch: function(catcher, scene) {
        if(this.detectArea(catcher)) {
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
var Object = Framework.exClass({
    __construct:function(type, position, audio, scene, move){
        this.position = position || {x: 0, y: 0};
        this.move = move || {};
        this.value = type.value || 0;
        this.weight = type.weight || 0;
        this.family = type.family || "other";
        this.isBigPrice = type.isBigPrice || false;
        this.image = type.image || "";
        this.scale = type.scale || 1;
        this.grabbed = type.grabbed || function(){};
        this.boom = type.boom;
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
            this.forward = new Framework.AnimationSprite({url:this.anima.animaForward, loop:true , speed:6});
            this.forward.start();
            this.backward = new Framework.AnimationSprite({url:this.anima.animaBackward, loop:true , speed:6});
            this.backward.start();
            this.obj = this.forward;
        }
        
        this.obj.scale = this.scale;
        this.obj.position = this.position;
        this.attach();
    },

    destory: function(range){
        var inRange = this.detectArea(range);
        if(inRange) {
            this.detach();
        }
        return inRange;
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
        a = {
            name: "obj",
            start: {
                x: this.obj.upperLeft.x, 
                y: this.obj.upperLeft.y
            },
            end: {
                x: this.obj.lowerRight.x, 
                y: this.obj.lowerRight.y
            }
        };
        b = {
            name: "range",
            start: {
                x: range.x || range.upperLeft.x, 
                y: range.y || range.upperLeft.y
            },
            end: {
                x: (range.x + range.width) || range.lowerRight.x, 
                y: (range.y + range.height) || range.lowerRight.y
            }
        };
        
        var inside = true;

        if(a.start.x > b.start.x)
            [a, b] = [b, a];
        inside &= b.start.x <= a.end.x;

        if(a.start.y > b.start.y)
            [a, b] = [b, a];
        inside &= b.start.y <= a.end.y;
        
        return inside;
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
            if(this.family == "TNT"){
                this.boomRange = {
                    x: this.obj.upperLeft.x - 50,
                    y: this.obj.upperLeft.y - 50,
                    width: this.obj.lowerRight.x - this.obj.upperLeft.x + 100,
                    height: this.obj.lowerRight.y - this.obj.upperLeft.y + 100
                }
            }
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

    //draw range of boom
    draw: function(parentCtx) {
        return;
        if(this.family != "TNT")
            return;
        
        this.size = {
            width: this.obj.lowerRight.x - this.obj.upperLeft.x,
            height: this.obj.lowerRight.y - this.obj.upperLeft.y
        };
        parentCtx.fillStyle = "blue";
        parentCtx.fillRect(this.obj.upperLeft.x - 50 , this.obj.upperLeft.y-50, this.size.width + 100, this.size.height + 100);
        this.obj.draw();
    }
});
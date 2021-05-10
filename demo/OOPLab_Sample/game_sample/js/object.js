var Object = Framework.exClass({
    __construct:function(info, audio, scene){
        this.value = info.type.value || 0;
        this.weight = info.type.weight || 0;
        this.family = info.type.family || "other";
        this.image = info.type.image || "";
        this.anima = info.type.anima;
        this.scale = info.type.scale || 1;
        this.position = info.position || {x: 0, y: 0};
        this.move = info.move;

        this.scene = scene;
        this.audio = audio;

        if(this.image) {
            this.obj = new Framework.Sprite(this.image);
            if(this.family == "TNT") {
                this.crack = new Framework.Sprite(define.itemPath + "Crack.png");
                this.crack.scale = this.scale;
            }
        } else {
            this.move.dir = 2;
            this.forward = new Framework.AnimationSprite({url:this.anima.animaForward, loop:true , speed:6});
            this.forward.start();
            this.backward = new Framework.AnimationSprite({url:this.anima.animaBackward, loop:true , speed:6});
            this.backward.start();
            this.obj = this.forward;
        }
        
        this.baseScene = this.scene;
        this.explode = new Framework.AnimationSprite({url: Anime.explode, loop: false,  speed: 7});
        this.explode.scale = 2;
        this.explode.position = this.position;
        this.baseScene.attach(this.explode);

        this.obj.scale = this.scale;
        this.obj.position = this.position;
        this.attach();
    },

    /**
     * attach to scene
     */
    attach: function(){
        this.obj.layer = 100;
        this.scene.attach(this.obj);
        if(!this.animation) {
            this.obj.draw();
        }
    },

    /**
     * detach from scene
     */
    detach: function() {
        this.scene.detach(this.obj);
    },
    
    /**
     * check if pos in obj area or not
     * @param {x, y} pos 
     * @returns pos in obj or not
     */
    detect: function(pos) {
        return (pos.x >= this.obj.upperLeft.x && pos.x <= this.obj.lowerRight.x && pos.y >= this.obj.upperLeft.y && pos.y <= this.obj.lowerRight.y);
    },

    /**
     * check if object in range or not
     * @param {x, y, width, height| upperLeft:{x, y}, lowerRight:{x, y}} range 
     * @returns object in range or not
     */
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

    /**
     * if object in range deteach from scene
     * @param {{x, y, width, height} | {upperLeft:{x, y}, lowerRight:{x, y}}} range 
     * @returns object in range or not
     */
    destory: function(range){
        var inRange = this.detectArea(range);

        if(inRange){
            this.detach();
        }
        
        return inRange;
    },

    /**
     * search all object in list and destroy the object in this object boom range
     * @param {Object[]} list 
     */
    boom: function(list){
        this.explode.start();
        let self = this;
        setTimeout(function(){
            self.baseScene.detach(self.explode);
        }, 600);
        
        this.audio.play({name: 'boom'});

        this.boomRange = {
            x: this.obj.upperLeft.x - 75,
            y: this.obj.upperLeft.y - 75,
            width: this.obj.lowerRight.x - this.obj.upperLeft.x + 150,
            height: this.obj.lowerRight.y - this.obj.upperLeft.y + 150
        }

        setTimeout(function(){
            remove = [];

            list.forEach(element => {    
                if(element.destory(self.boomRange)) 
                    remove.push(element); 
            });
            
            remove.forEach(element => {
                list.splice(list.indexOf(element), 1);
            });

            remove.forEach(element => {
                    if(element.family == "TNT") { 
                        element.boom(list);
                    }
            });
        }, 200);
    },
    
    /**
     * for mouse moving
     * @returns no return
     */
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

    /**
     * check if the catcher touch the object if true it will attach on scene and if family is TNT then boom
     * @param {Catcher} catcher 
     * @param {Scene} scene 
     * @param {Object[]} objList 
     * @returns if the catcher touch the object or not
     */
    catch: function(catcher, scene, objList) {
        if(this.detectArea(catcher)) {
            switch(this.family){
                case "TNT":
                    this.boom(objList);
                    break;
                default:
                    let sound = '';
                    if(this.value >= 250)
                        sound = 'good';
                    else if(this.value < 50 && this.value >= 0)
                        sound = 'bad';
                    else
                        sound = 'normal';
                    this.audio.play({name: sound});
            }
            this.detach();
            this.scene = scene;
            if(this.family == "TNT") {
                this.obj = this.crack;
            }
            this.attach();
            return true;
        }
        return false;
    },

    /**
     * set the position in scene
     * @param {x, y} pos 
     * @param {x, y} offset 
     */
    setPos: function(pos, offset) {
        this.obj.position = {
            x: pos.x + offset.x,
            y: pos.y + this.obj.height / 2 + offset.y
        };
    },

    debug: function() {

    },

    /**
     * testing if the clicked point is in the detect area
     * @param {x, y} e 
     */
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
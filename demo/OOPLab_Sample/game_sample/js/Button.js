var Button=Framework.exClass({
    __construct:function(parent, locationX, locationY, width, height, text, font, color){
        this.load(parent);

        this.text = text;
        this.font = font;
        this.color = color;
        this.hovered = false;

        this.position = {
            x: locationX,
            y: locationY
        };
        this.size = {
            width: width,
            height: height
        };

        this.hovered = function(){return;}
    },

    mousemove: function(e) {
        this.hovered = (e.x >= this.position.x && e.x <= this.position.x + this.size.width && e.y >= this.position.y && e.y <= this.position.y + this.size.height);
    },

	load: function(parent){
        //this.parent = parent;
	},

	update: function() {
        if(this.hovered){
            
        }
    },
    
    draw: function(parentCtx) {
        parentCtx.font = this.font || '65pt bold';
        parentCtx.fillStyle = this.color || 'white';
        parentCtx.textBaseline = 'top';
        parentCtx.textAlign = 'center';
        parentCtx.fillText(
            this.text,
            this.position.x + this.size.width / 2, 
            this.position.y);
    },

	click: function(e,func) {
        if (this.hovered) {
            if (func) {
                func();
            }
        }
    }


});
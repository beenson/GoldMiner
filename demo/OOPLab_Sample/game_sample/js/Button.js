var Button=Framework.exClass({
    __construct:function(parent, locationX, locationY, width, height, other){
        this.load(parent);

        this.text = other.text || '';
        this.font = other.font || '65pt bold';
        this.color = other.color || 'white';
        this.hovered = false;

        this.position = {
            x: locationX,
            y: locationY
        };
        this.size = {
            width: width,
            height: height
        };

        this.hovered = other.hover || function(){};
        this.clicked = other.click || function(){};
    },

    mousemove: function(e) {
        this.isHovered = (e.x >= this.position.x && e.x <= this.position.x + this.size.width && e.y >= this.position.y && e.y <= this.position.y + this.size.height);
        if(this.isHovered) {
            this.hovered();
        }
    },

	load: function(parent){
        //this.parent = parent;
	},

	update: function() {
        
    },
    
    draw: function(parentCtx) {
        parentCtx.font = this.font;
        parentCtx.fillStyle = this.color;
        parentCtx.textBaseline = 'top';
        parentCtx.textAlign = 'center';
        parentCtx.fillText(
            this.text,
            this.position.x + this.size.width / 2, 
            this.position.y);
    },

	click: function(e,func) {
        if (this.isHovered) {
            this.clicked();
        }
    }


});
var Button=Framework.exClass({
    __construct:function(parent, locationX, locationY, width, height, options){
        this.load(parent);

        this.text = options.text || '';
        this.font = options.font || '65pt bold';
        this.color = options.color || 'white';
        this.hovered = false;

        this.position = {
            x: locationX,
            y: locationY
        };
        this.size = {
            width: width,
            height: height
        };

        this.hovered = options.hover || function(){}; //在hover時執行
        this.clicked = options.click || function(){}; //在button上click時執行
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
var Button=Framework.exClass({
    __construct:function(parent, locationX, locationY, width, height, options){
        this.load(parent);

        this.text = options.text || '';
        this.font = options.font || '65pt bold';
        this.color = options.color || 'white';
        this.textOffset = options.textOffset || 0;
        this.hovered = false;
        this.background = options.background || 'noColor';
        this.position = {
            x: locationX,
            y: locationY
        };

        this.size = {
            width: width,
            height: height
        };

        this.hovered = options.hover || function(){};
        this.clicked = options.click || function(){};
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
        //填滿背景顏色
        if(this.background != 'noColor'){
            parentCtx.fillStyle = this.background;
            parentCtx.fillRect(this.position.x , this.position.y, this.size.width, this.size.height);
        }
        //設定文字樣式及繪製顏色
        parentCtx.font = this.font;
        parentCtx.fillStyle = this.color;
        parentCtx.textBaseline = 'top';
        parentCtx.textAlign = 'center';
        parentCtx.fillText(
            this.text,
            this.position.x + this.size.width / 2, 
            this.position.y + this.textOffset);
    },

	click: function(e,func) {
        if (this.isHovered) {
            this.clicked();
        }
    }


});
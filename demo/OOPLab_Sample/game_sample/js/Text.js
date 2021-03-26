var Text = Framework.exClass({
    __construct:function(parent, locationX, locationY, width, height, options){
        this.load(parent);

        this.text = options.text || '';
        this.font = options.font || '65pt bold';
        this.color = options.color || 'white';
        this.textOffset = options.textOffset || 0;
        this.textAlign = options.textAlign || 'center';
        this.position = {
            x: locationX,
            y: locationY
        };

        this.size = {
            width: width,
            height: height
        };
    },

    mousemove: function(e) {

    },

	load: function(parent){
        //this.parent = parent;
	},

	update: function() {
        
    },
    
    draw: function(parentCtx) {
        
        //設定文字樣式及繪製顏色
        parentCtx.font = this.font;
        parentCtx.fillStyle = this.color;
        parentCtx.textBaseline = 'top';
        parentCtx.textAlign = this.textAlign;
        parentCtx.fillText(
            this.text,
            this.position.x + this.size.width / 2, 
            this.position.y + this.textOffset);
    },

	click: function(e) {
        
    }


});
var Button=Framework.exClass({
    __construct:function(parent, locationX, locationY, width, height, text){
        this.load(parent);

        this.text = text;

        this.position = {
            x: locationX,
            y: locationY
        };
        this.size = {
            width: width,
            height: height
        };
    },

	load:function(parent){
        //this.parent = parent;
	},

	update: function() {

    },
    
    draw: function(parentCtx) {
        parentCtx.font = '65pt bold';
        parentCtx.fillStyle = 'white';
        parentCtx.textBaseline = 'top';
        parentCtx.textAlign = 'center';
        parentCtx.fillText(
            this.text,
            this.position.x + this.size.width / 2, 
            this.position.y);
    },

	click: function(e,func) {
        if (e.x >= this.position.x && e.x <= this.position.x + this.size.width && e.y >= this.position.y && e.y <= this.position.y + this.size.height) {
            if (func) {
                func();
            }
        }
    }


});
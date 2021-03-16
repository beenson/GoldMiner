var nowLoading = Framework.Class(Framework.Level , {
    load : function(){
        this.pic = new Framework.Sprite(define.imagePath+'/background/Gold.jpg');
        this.pic.position = {
            x: Framework.Game.getCanvasWidth() / 2,
            y: Framework.Game.getCanvasHeight() / 2
        };
        this.pic.scale = 2;
        this.position = {x: 100, y: 100};

        //載入要被播放的音樂清單
        //資料夾內只提供mp3檔案, 其餘的音樂檔案, 請自行轉檔測試
        this.audio = new Framework.Audio({
            start: {
                mp3: define.soundPath + 'GameStart.mp3'
            },
            pull: {
                mp3: define.soundPath + 'PullingString.mp3'
            }
        });
        //播放時, 需要給name, 其餘參數可參考W3C
        this.audio.play({name: 'start'});

        setTimeout('Framework.Game.goToNextLevel()', 2000);
    },

    initiallize: function(){
        
    },
    
    update: function(){
        //let a = setTimeout(Framework.Game.goToNextLevel(), 1500);
        /*this.position = {
            x: this.position.x + 1,
            y: this.position.y
        }
        this.rotation++;
        this.pic.position = this.position;
        this.pic.rotation = this.position;*/
    },

        
    draw: function(ctx){
        this.pic.draw();
    },
});
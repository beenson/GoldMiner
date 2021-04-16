/**
 * image
 * scale
 * value (-1 for random)
 * weight (max is 15)
 */

var Items = {
    larGold: {
        image: define.itemPath + "Gold.png",
        scale: 1.1,
        value: 500,
        weight: 14
    },

    bigGold: {
        image: define.itemPath + "Gold.png",
        scale: 0.8,
        value: 250,
        weight: 13
    },

    medGold: {
        image: define.itemPath + "Gold.png",
        scale: 0.6,
        value: 100,
        weight: 12
    },

    smaGold: {
        image: define.itemPath + "Gold.png",
        scale: 0.3,
        value: 50,
        weight: 8
    },

    bigStone: {
        image: define.itemPath + "BigStone.png",
        value: 20,
        weight: 13
    },

    smaStone: {
        image: define.itemPath + "SmallStone.png",
        value: 11,
        weight: 12.5
    }, 
    
    head: {
        image: define.itemPath + "HeadBone.png",
        value: 20,
        weight: 6
    },

    bone: {
        image: define.itemPath + "Bone.png",
        value: 7,
        weight: 5
    },

    diamond: {
        image: define.itemPath + "Diamond.png",
        scale: 1.1,
        value: 600,
        weight: 8
    },

    boom: {
        image: define.itemPath + "Boom.png",
        value: 1,
        weight: 8
    },

    mysteryBag: {
        image: define.itemPath + "MysteryBag_.png",
        value: -1, //-1 for random
        weight: -1 //-1 for random
    },

    mouse: {
        weight: 8
    },


    mouseWithDiamond: {
        weight: 9
    }
};

var shopItems = {
    bomb: {
        image: define.imagePath + "shop/firecracker.png",
        value: 50,
        info: "拉到你不要的東西按↑鍵，就可以炸掉那個東西",
        position: {x:(Framework.Game.getCanvasWidth() / 2) - 550, y:(Framework.Game.getCanvasHeight() / 2) + 150},
    },
    potion: {
        image: define.imagePath + "shop/magicPotion.png",
        value: 200,
        info: "力量增加，拉東西的速度上升",
        position: {x:(Framework.Game.getCanvasWidth() / 2) - 375, y:(Framework.Game.getCanvasHeight() / 2) + 150},
    },
    clover: {
        image: define.imagePath + "shop/luckyFlower.png",
        value: 100,
        info: "使幸運度提高",
        position: {x:(Framework.Game.getCanvasWidth() / 2) - 200, y:(Framework.Game.getCanvasHeight() / 2) + 150},
    },
    book: {
        image: define.imagePath + "shop/stoneBook.png",
        value: 150,
        info: "使石頭的價值變成原本的3倍",
        position: {x:(Framework.Game.getCanvasWidth() / 2) - 25, y:(Framework.Game.getCanvasHeight() / 2) + 150},
    },
    bottle: {
        image: define.imagePath + "shop/IDK.png",
        value: 600,
        info: "鑽石的價值增加，從600提升為900",
        position: {x:(Framework.Game.getCanvasWidth() / 2) + 150, y:(Framework.Game.getCanvasHeight() / 2) + 150},
    },

    itemPosition: {
        pos1: {x:(Framework.Game.getCanvasWidth() / 2) - 500, y:(Framework.Game.getCanvasHeight() / 2) + 150},
        pos2: {x:(Framework.Game.getCanvasWidth() / 2) - 375, y:(Framework.Game.getCanvasHeight() / 2) + 150},
        pos3: {x:(Framework.Game.getCanvasWidth() / 2) - 250, y:(Framework.Game.getCanvasHeight() / 2) + 150},
        pos4: {x:(Framework.Game.getCanvasWidth() / 2) - 125, y:(Framework.Game.getCanvasHeight() / 2) + 150},
        pos5: {x:(Framework.Game.getCanvasWidth() / 2), y:(Framework.Game.getCanvasHeight() / 2) + 150},
    },
};
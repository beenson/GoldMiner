/**
 * family
 * animation
 * image
 * scale
 * value (-1 for random)
 * weight (max is 15)
 * anima {animaForward, animaBackward, startX, endX, Y}
 */

var Items = {
    larGold: {
        family: "gold",
        image: define.itemPath + "Gold.png",
        scale: 1.1,
        value: 500,
        weight: 14
    },

    bigGold: {
        family: "gold",
        image: define.itemPath + "Gold.png",
        scale: 0.8,
        value: 250,
        weight: 13
    },

    medGold: {
        family: "gold",
        image: define.itemPath + "Gold.png",
        scale: 0.6,
        value: 100,
        weight: 12
    },

    smaGold: {
        family: "gold",
        image: define.itemPath + "Gold.png",
        scale: 0.3,
        value: 50,
        weight: 8
    },

    bigStone: {
        family: "stone",
        image: define.itemPath + "BigStone.png",
        value: 20,
        weight: 13
    },

    smaStone: {
        family: "stone",
        image: define.itemPath + "SmallStone.png",
        value: 11,
        weight: 12.5
    }, 
    
    head: {
        family: "other",
        image: define.itemPath + "HeadBone.png",
        value: 20,
        weight: 6
    },

    bone: {
        family: "other",
        image: define.itemPath + "Bone.png",
        value: 7,
        weight: 5
    },

    diamond: {
        family: "diamond",
        image: define.itemPath + "Diamond.png",
        scale: 1.1,
        value: 600,
        weight: 8
    },

    boom: {
        family: "other",
        image: define.itemPath + "Boom.png",
        value: 1,
        weight: 8
    },

    mysteryBag: {
        family: "other",
        image: define.itemPath + "MysteryBag_.png",
        value: -1, //-1 for random
        weight: -1 //-1 for random
    },

    mouse: {
        family: "other",
        anima: {
            animaForward: [
                define.imagePath + "mouse/1.png",
                define.imagePath + "mouse/2.png",
                define.imagePath + "mouse/3.png",
                define.imagePath + "mouse/4.png",
                define.imagePath + "mouse/5.png",
                define.imagePath + "mouse/6.png",
                define.imagePath + "mouse/7.png",
                define.imagePath + "mouse/8.png"
            ],
            animaBackward: [
                define.imagePath + "mouse/1.png",
                define.imagePath + "mouse/2.png",
                define.imagePath + "mouse/3.png",
                define.imagePath + "mouse/4.png",
                define.imagePath + "mouse/5.png",
                define.imagePath + "mouse/6.png",
                define.imagePath + "mouse/7.png",
                define.imagePath + "mouse/8.png"
            ]
        },
        value: 2,
        weight: 8
    },


    mouseWithDiamond: {
        family: "diamond",
        value: 602,
        weight: 9
    }
};

var shopItems = {
    bomb: {
        image: define.imagePath + "shop/firecracker.png",
        value: 50,
        name: "bomb",
        info: "拉到你不要的東西按↑鍵，就可以炸掉那個東西",
        position: {x:(Framework.Game.getCanvasWidth() / 2) - 550, y:(Framework.Game.getCanvasHeight() / 2) + 150},
    },
    potion: {
        image: define.imagePath + "shop/magicPotion.png",
        value: 200,
        name: "potion",
        info: "力量增加，拉東西的速度上升",
        position: {x:(Framework.Game.getCanvasWidth() / 2) - 375, y:(Framework.Game.getCanvasHeight() / 2) + 150},
    },
    clover: {
        image: define.imagePath + "shop/luckyFlower.png",
        value: 100,
        name: "clover",
        info: "使幸運度提高",
        position: {x:(Framework.Game.getCanvasWidth() / 2) - 200, y:(Framework.Game.getCanvasHeight() / 2) + 150},
    },
    book: {
        image: define.imagePath + "shop/stoneBook.png",
        value: 150,
        name: "book",
        info: "使石頭的價值變成原本的3倍",
        position: {x:(Framework.Game.getCanvasWidth() / 2) - 25, y:(Framework.Game.getCanvasHeight() / 2) + 150},
    },
    bottle: {
        image: define.imagePath + "shop/IDK.png",
        value: 600,
        name: "bottle",
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
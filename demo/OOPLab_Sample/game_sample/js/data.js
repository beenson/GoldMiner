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
        scale: 0.5,
        value: 100,
        weight: 12
    },

    smaGold: {
        family: "gold",
        image: define.itemPath + "Gold.png",
        scale: 0.25,
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
        scale: 1.1,
        value: 20,
        weight: 6
    },

    bone: {
        family: "other",
        image: define.itemPath + "Bone.png",
        scale: 1.1,
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
        family: "TNT",
        image: define.itemPath + "Boom.png",
        scale: 1.1,
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
        family: "mouse",
        anima: {
            animaForward: [
                define.itemPath + "mouse/normal/forward/1.png",
                define.itemPath + "mouse/normal/forward/2.png",
                define.itemPath + "mouse/normal/forward/3.png",
                define.itemPath + "mouse/normal/forward/4.png",
                define.itemPath + "mouse/normal/forward/5.png",
                define.itemPath + "mouse/normal/forward/6.png",
                define.itemPath + "mouse/normal/forward/7.png",
                define.itemPath + "mouse/normal/forward/8.png"
            ],
            animaBackward: [
                define.itemPath + "mouse/normal/backward/1.png",
                define.itemPath + "mouse/normal/backward/2.png",
                define.itemPath + "mouse/normal/backward/3.png",
                define.itemPath + "mouse/normal/backward/4.png",
                define.itemPath + "mouse/normal/backward/5.png",
                define.itemPath + "mouse/normal/backward/6.png",
                define.itemPath + "mouse/normal/backward/7.png",
                define.itemPath + "mouse/normal/backward/8.png"
            ]
        },
        value: 2,
        weight: 8
    },


    mouseWithDiamond: {
        family: "diamond",
        anima: {
            animaForward: [
                define.itemPath + "mouse/diamond/forward/1.png",
                define.itemPath + "mouse/diamond/forward/2.png",
                define.itemPath + "mouse/diamond/forward/3.png",
                define.itemPath + "mouse/diamond/forward/4.png",
                define.itemPath + "mouse/diamond/forward/5.png",
                define.itemPath + "mouse/diamond/forward/6.png",
                define.itemPath + "mouse/diamond/forward/7.png",
                define.itemPath + "mouse/diamond/forward/8.png"
            ],
            animaBackward: [
                define.itemPath + "mouse/diamond/backward/1.png",
                define.itemPath + "mouse/diamond/backward/2.png",
                define.itemPath + "mouse/diamond/backward/3.png",
                define.itemPath + "mouse/diamond/backward/4.png",
                define.itemPath + "mouse/diamond/backward/5.png",
                define.itemPath + "mouse/diamond/backward/6.png",
                define.itemPath + "mouse/diamond/backward/7.png",
                define.itemPath + "mouse/diamond/backward/8.png"
            ]
        },
        value: 602,
        weight: 9
    }
};

var Anime = {
    oldmanPull:[
        define.imagePath + 'OldMan/1.png',
        define.imagePath + 'OldMan/2.png',
        define.imagePath + 'OldMan/3.png',
        define.imagePath + 'OldMan/4.png',
        define.imagePath + 'OldMan/5.png',
        define.imagePath + 'OldMan/6.png',
        define.imagePath + 'OldMan/7.png',
        define.imagePath + 'OldMan/8.png',
        define.imagePath + 'OldMan/9.png',
        define.imagePath + 'OldMan/10.png',
        define.imagePath + 'OldMan/11.png',
        define.imagePath + 'OldMan/12.png',
        define.imagePath + 'OldMan/13.png',
        define.imagePath + 'OldMan/14.png'
    ],

    oldmanThrowBomb:[
        define.imagePath + 'OldMan/throwBomb/1.png',
        define.imagePath + 'OldMan/throwBomb/2.png'
    ],

    explode: [
        define.itemPath + "explode/0.png",
        define.itemPath + "explode/1.png",
        define.itemPath + "explode/2.png",
        define.itemPath + "explode/3.png",
        define.itemPath + "explode/4.png",
        define.itemPath + "explode/5.png",
        define.itemPath + "explode/6.png",
    ],

    shopOwner: [
        define.backgroundPath + 'shop/deal/1.jpg',
        define.backgroundPath + 'shop/deal/2.jpg',
        define.backgroundPath + 'shop/deal/3.jpg',
        define.backgroundPath + 'shop/deal/4.jpg',
        define.backgroundPath + 'shop/deal/5.jpg',
        define.backgroundPath + 'shop/deal/6.jpg',
        define.backgroundPath + 'shop/deal/7.jpg',
        define.backgroundPath + 'shop/deal/8.jpg'
    ]
};

var shopItems = {
    bomb: {
        image: define.imagePath + "shop/firecracker.png",
        value: 100,
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
        value: 50,
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
        value: 400,
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
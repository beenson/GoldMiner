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
}
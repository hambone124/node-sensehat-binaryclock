const sense = require("sense-hat-led");
const low = [50, 0, 50];
const high = [0, 155, 155];
const blank = [0, 0, 0];
sense.setRotation(270, false);

function convertToBinaryArray (num) {
    let binaryString = parseInt(num).toString(2).padStart(4,"0");
    let binaryArray = [];
    for (let char of binaryString) {
        binaryArray.push(char);
    }
    return binaryArray;
}

function getTimeStringArray () {
    let date = new Date();
    let arr = [date.getHours(), date.getMinutes(), date.getSeconds()];
    return arr.reduce((p, c, i, a) => {
        let splitChars = [];
        c.toString()
        .padStart(2, "0")
        .split("")
        .forEach(char => {
            splitChars.push(char);
        });
        return p.concat(splitChars);
    }, []);
}

function tick() {
    sense.flipV();
    sense.flipH();
    let timeArray = getTimeStringArray();
    // let binaryTimeArray = timeArray.map(digit => convertToBinaryArray(digit));
    let binaryTimeArray = timeArray.reduce((p, c) => {
        let binaryDigitArray = convertToBinaryArray(c).concat(["x", "x", "x", "x"])
        return p.concat(binaryDigitArray);
    }, []);
    let ledMatrix = (binaryTimeArray.concat(["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"]).map(input => {
        if(input === "0") {
            return low;
        }
        else if (input === "1") {
            return high;
        } else {
            return blank;
        }            
    }));
    sense.setPixels(ledMatrix);
}

setInterval(() => {
    console.time();
    tick();
    console.timeEnd();
}, 1000);

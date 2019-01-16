const sense = require("sense-hat-led");
const low = [50, 0, 50];
const high = [0, 155, 155];
const blank = [0, 0, 0];
sense.setRotation(90, false);

function convertToBinaryArray (num) {
    let binaryString = parseInt(num).toString(2).padStart(4,"0");
    let binaryArray = [];
    for (let char of binaryString) {
        // unshift here so the bits change in the right
        // direction on the display
        binaryArray.unshift(char);
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

function formatClockDisplay (_timeArray) {
    // init the output array
    let outputMatrix = [];

    // convert numbers to binary form
    let binaryTimeArray = _timeArray.reduce((p, c) => {
        return p.concat(convertToBinaryArray(c));
    }, []);

    // spread out elements
    binaryTimeArray.forEach( el => {
        outputMatrix.unshift("x");
        outputMatrix.unshift(el);
    });

    // add blank bars between hours, minutes, and seconds
    for (let i = 0; i < 8; i++) {
        outputMatrix.splice(16, 0, "x");
    }
    for (let i = 0; i < 8; i++) {
        outputMatrix.splice(40, 0, "x");
    }

    return outputMatrix;
}

function outputToDisplay (matrix) {
    let ledMatrix = matrix
        .map(input => {
            if(input === "0")
                return low;
            else if (input === "1")
                return high;
            else 
                return blank;            
        });
    sense.setPixels(ledMatrix);
}

function tick () {
    let timeArray = getTimeStringArray();

    // let ledMatrix = formatClockDisplay(timeArray)
    //     .map(input => {
    //         if(input === "0")
    //             return low;
    //         else if (input === "1")
    //             return high;
    //         else 
    //             return blank;            
    // });
    // sense.setPixels(ledMatrix);
    let formattedMatrix = formatClockDisplay(timeArray);
    outputToDisplay(formattedMatrix);

}

setInterval(() => {
    console.time();
    tick();
    console.timeEnd();
}, 1000);

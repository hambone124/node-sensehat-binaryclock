const sense = require('sense-hat-led');

const low = [50, 0, 50];
const high = [0, 100, 0];
const blank = [0, 0, 0];
sense.setRotation(90, false);

function convertToBinaryArray(num) {
  const binaryString = parseInt(num, 10).toString(2).padStart(4,'0');
  const binaryArray = [];
  for (let char of binaryString) {
    // unshift here so the bits change in the right
    // direction on the display
    binaryArray.unshift(char);
  }
  return binaryArray;
}

function getTimeStringArray() {
  const date = new Date();
  const arr = [date.getHours(), date.getMinutes(), date.getSeconds()];
  return arr.reduce((p, c) => {
    const splitChars = [];
    c.toString()
      .padStart(2, '0')
      .split('')
      .forEach((char) => {
        splitChars.push(char);
      });
    return p.concat(splitChars);
  }, []);
}

function formatClockDisplay(_timeArray) {
  // init the output array
  const outputMatrix = [];

  // convert numbers to binary form
  const binaryTimeArray = _timeArray.reduce((p, c) => {
    const binaryArray = p.concat(convertToBinaryArray(c));
    return binaryArray;
  }, []);

  // spread out elements
  binaryTimeArray.forEach((el) => {
    outputMatrix.unshift('x');
    outputMatrix.unshift(el);
  });

  // add blank bars between hours, minutes, and seconds
  for (let i = 0; i < 8; i += 1) {
    outputMatrix.splice(16, 0, 'x');
  }
  for (let i = 0; i < 8; i += 1) {
    outputMatrix.splice(40, 0, 'x');
  }

  return outputMatrix;
}

function outputToDisplay(matrix) {
  const ledMatrix = matrix
    .map((input) => {
      if (input === '0') return low;
      if (input === '1') return high;
      return blank;
    });
  sense.setPixels(ledMatrix);
}

function tick() {
  const timeArray = getTimeStringArray();
  const formattedMatrix = formatClockDisplay(timeArray);
  outputToDisplay(formattedMatrix);
}

setInterval(() => tick(), 1000);

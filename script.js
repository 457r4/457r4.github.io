// Note: Create a literal cube (an array of matrixes) to manage the pieces, rotations, and cube's mixing



const cube = document.querySelector('.cubeContainer');
let angle = 0;

function rotateCube() {
  angle += 0.1;
  cube.style.transform = `rotateX(${angle}deg) rotateY(${angle}deg)`;
  // cube.style.transform = `rotateY(-${angle}deg)`;
}

// setInterval(rotateCube, 1);


const center1 = document.querySelector('.center1');
const center2 = document.querySelector('.center2');
const center3 = document.querySelector('.center3');
const center4 = document.querySelector('.center4');
const center5 = document.querySelector('.center5');
const center6 = document.querySelector('.center6');
const corner1 = document.querySelector('.corner1');
const corner2 = document.querySelector('.corner2');
const corner3 = document.querySelector('.corner3');
const corner4 = document.querySelector('.corner4');
const corner5 = document.querySelector('.corner5');
const corner6 = document.querySelector('.corner6');
const corner7 = document.querySelector('.corner7');
const corner8 = document.querySelector('.corner8');
const side1 = document.querySelector('.side1');
const side2 = document.querySelector('.side2');
const side3 = document.querySelector('.side3');
const side4 = document.querySelector('.side4');
const side5 = document.querySelector('.side5');
const side6 = document.querySelector('.side6');
const side7 = document.querySelector('.side7');
const side8 = document.querySelector('.side8');
const side9 = document.querySelector('.side9');
const side10 = document.querySelector('.side10');
const side11 = document.querySelector('.side11');
const side12 = document.querySelector('.side12');

var transversalSet1 = [corner1, side1, corner2, side2, corner3, side3, corner4, side4, center1];
var transversalSet2 = [side5, center3, side6, center6, side7, center4, side8, center5];
var transversalSet3 = [corner6, side9, corner5, side12, corner8, side11, corner7, side10, center2];
var transversalAreas = [transversalSet1, transversalSet2, transversalSet3];
const transversalDisplace = ['translateZ(var(--pieceSize))', '', 'translateZ(calc(var(--pieceSize) * (-1)))'];

var horizontalSet1 = [corner6, side9, corner5, side6, corner2, side1, corner1, side5, center3];
var horizontalSet2 = [side10, center2, side12, center6, side2, center1, side4, center5];
var horizontalSet3 = [corner4, side3, corner3, side7, corner8, side11, corner7, side8, center4];
var horizontalAreas = [horizontalSet1, horizontalSet2, horizontalSet3];

var verticalSet1 = [corner6, side5, corner1, side4, corner4, side8, corner7, side10, center5];
var verticalSet2 = [side9, center3, side1, center1, side3, center4, side11, center2];
var verticalSet3 = [corner5, side6, corner2, side2, corner3, side7, corner8, side12, center6];
var verticalAreas = [verticalSet1, verticalSet2, verticalSet3];

const setOfTransformationsOrigin = ['var(--halfCube) var(--halfCube)',
                                    'var(--halfPiece) var(--halfCube)',
                                    'calc(var(--halfPiece) * (-1)) var(--halfCube)',
                                    'calc(var(--halfPiece) * (-1)) var(--halfPiece)',
                                    'calc(var(--halfPiece) * (-1)) calc(var(--halfPiece) * (-1))',
                                    'var(--halfPiece) calc(var(--halfPiece) * (-1))',
                                    'var(--halfCube) calc(var(--halfPiece) * (-1))',
                                    'var(--halfCube) var(--halfPiece)',
                                    'var(--halfPiece) var(--halfPiece)'];

function rotateTransversal(area, startAngle, finalAngle, i = 0) {
    if (area == 2) {
        startAngle *= -1;
        finalAngle *= -1;
    }
    transversalAreas[area].forEach(piece => {
        piece.animate([
            {
                offset: '0',
                transformOrigin: setOfTransformationsOrigin[i],
                transform: `rotate(${startAngle}deg) ${transversalDisplace[area]}`
            },
            {
                offset: '1',
                transformOrigin: setOfTransformationsOrigin[i],
                transform: `rotate(${finalAngle}deg) ${transversalDisplace[area]}`
            }
        ], {
            duration: Math.abs(((Math.abs(finalAngle) - Math.abs(startAngle)) / 90) * 200),
            easing: 'ease-in-out',
            // iterations: Infinity
            fill: 'forwards'
        });
        i++;
    });
}

function rotateHorizontal(area, startAngle, finalAngle, i = 0) {
    if (area != 2) {
        startAngle *= -1;
        finalAngle *= -1;
    }
    horizontalAreas[area].forEach(piece => {
        let displace = '';
        if (transversalSet1.indexOf(piece) != -1) {
            displace = transversalDisplace[0];
        } else if (transversalSet3.indexOf(piece) != -1) {
            displace = transversalDisplace[2];
        }
        piece.animate([
            {
                offset: '0',
                transformOrigin: setOfTransformationsOrigin[i],
                transform: `rotateY(${startAngle}deg) ${displace}`
            },
            {
                offset: '1',
                transformOrigin: setOfTransformationsOrigin[i],
                transform: `rotateY(${finalAngle}deg) ${displace}`
            }
        ], {
            duration: Math.abs(((Math.abs(finalAngle) - Math.abs(startAngle)) / 90) * 200),
            easing: 'linear',
            // iterations: Infinity
            fill: 'forwards'
        });
        i++;
    });
}

function rotateVertical(area, startAngle, finalAngle, i = 0) {
    if (area != 2) {
        startAngle *= -1;
        finalAngle *= -1;
    }
    verticalAreas[area].forEach(piece => {
        let displace = '';
        if (transversalSet1.indexOf(piece) != -1) {
            displace = transversalDisplace[0];
        } else if (transversalSet3.indexOf(piece) != -1) {
            displace = transversalDisplace[2];
        }
        piece.animate([
            {
                offset: '0',
                transformOrigin: setOfTransformationsOrigin[i],
                transform: `rotateX(${startAngle}deg) ${displace}`
            },
            {
                offset: '1',
                transformOrigin: setOfTransformationsOrigin[i],
                transform: `rotateX(${finalAngle}deg) ${displace}`
            }
        ], {
            duration: Math.abs(((Math.abs(finalAngle) - Math.abs(startAngle)) / 90) * 200),
            easing: 'linear',
            // iterations: Infinity
            fill: 'forwards'
        });
        i++;
    });
}

var transversalAngle = horizontalAngle = verticalAngle = transversalAngleReverse = horizontalAngleReverse = verticalAngleReverse = 0;
function rotate(zone, section, RR, shift) {
    let angle = 0;
    if (zone === 'transversal') {
        angle = (RR === 'right') ? transversalAngle : transversalAngleReverse;
        angle += shift;
        rotateTransversal(section, angle - shift, angle);
        (RR === 'right') ? transversalAngle = angle : transversalAngleReverse = angle;
    } else if (zone === 'horizontal') {
        angle = (RR === 'right') ? horizontalAngle : horizontalAngleReverse;
        angle += shift;
        rotateHorizontal(section, angle - shift, angle);
        (RR === 'right') ? horizontalAngle = angle : horizontalAngleReverse = angle;
    } else {
        angle = (RR === 'right') ? verticalAngle : verticalAngleReverse;
        angle += shift;
        rotateVertical(section, angle - shift, angle);
        (RR === 'right') ? verticalAngle = angle : verticalAngleReverse = angle;
    }
}

document.addEventListener("keydown", function(event) {
    if (event.key === "q")
        rotate('transversal', 0, 'right', 90);
    else if (event.shiftKey && event.key === "Q")
        rotate('transversal', 0, 'right', -90);
    if (event.key === "a")
        rotate('transversal', 2, 'reverse', 90);
    else if (event.shiftKey && event.key === "A")
        rotate('transversal', 2, 'reverse', -90);

    if (event.key === "w")
        rotate('horizontal', 0, 'right', 90);
    else if (event.shiftKey && event.key === "W")
        rotate('horizontal', 0, 'right', -90);
    if (event.key === "s")
        rotate('horizontal', 2, 'reverse', 90);
    else if (event.shiftKey && event.key === "S")
        rotate('horizontal', 2, 'reverse', -90);

    if (event.key === "e")
        rotate('vertical', 0, 'right', 90);
    else if (event.shiftKey && event.key === "E")
        rotate('vertical', 0, 'right', -90);
    if (event.key === "d")
        rotate('vertical', 2, 'reverse', 90);
    else if (event.shiftKey && event.key === "D")
        rotate('vertical', 2, 'reverse', -90);
});


var xAngle = -30, yAngle = 45;
var displacement = 3;
var upPressed = downPressed = leftPressed = rightPressed = false;

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowUp") upPressed = true;
    if (event.key === "ArrowDown") downPressed = true;
    if (event.key === "ArrowLeft") leftPressed = true;
    if (event.key === "ArrowRight") rightPressed = true;
});
document.addEventListener("keyup", function(event) {
    if (event.key === "ArrowUp") upPressed = false;
    if (event.key === "ArrowDown") downPressed = false;
    if (event.key === "ArrowLeft") leftPressed = false;
    if (event.key === "ArrowRight") rightPressed = false;
});

function updateCube() {
    if (upPressed) xAngle += displacement;
    if (downPressed) xAngle -= displacement;
    if (leftPressed) yAngle -= displacement;
    if (rightPressed) yAngle += displacement;
    cube.style.transform = `rotateX(${xAngle}deg) rotateY(${yAngle}deg)`;
    requestAnimationFrame(updateCube);
}

requestAnimationFrame(updateCube);


// CSS VARIABLES
// --cubeSize: 45vh;
// --halfCube: calc(var(--cubeSize) / 2);
// --pieceSize: calc(var(--cubeSize) / 3);
// --halfPiece: calc(var(--pieceSize) / 2);
// --thirdPiece: calc(var(--pieceSize) / 3);
// --twoThird: calc(var(--thirdPiece) * 2);
// --doublePieceSize: calc(var(--pieceSize) * 2);

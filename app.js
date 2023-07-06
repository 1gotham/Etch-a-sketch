let gridCont = document.getElementById("gridCont");
let isDrawing = false;
let selectOption = document.getElementById("size");
let size = 16;
let colorInput = document.getElementById("colorInput");
let erase = false;
const drawingCont = document.getElementById("drawing");

drawingCont.addEventListener("dragstart", (event) => {
    event.preventDefault();
});

function gridDimensions(box, size) {
    x = Math.floor(640 / size);
    box.style.height = `${x}px`;
    box.style.width = `${x}px`;
}

function changeGrid() {
    let allBoxes = document.querySelectorAll(".grid-box") 
    allBoxes.forEach(function(box) {
        box.remove();
    });
    createGrid() 
    draw()
}

function createGrid() {

    if (selectOption.value == 1) {
        size = 16;
    }
    else if (selectOption.value == 2) {
        size = 32;
    }
    else if (selectOption.value == 3) {
        size = 64;
    }

    for (i = 0; i < size * size; i ++) {
        newDiv = document.createElement("div");
        newDiv.classList.add("grid-box");
        gridDimensions(newDiv, size);
        newDiv.setAttribute('id', `box${i}`);
        gridCont.appendChild(newDiv)
    }
}

function draw() {
    let allBoxes = document.querySelectorAll(".grid-box")

    allBoxes.forEach(function(box, index) {
        box.addEventListener('click', function () {
            if (!erase) {
                box.style.backgroundColor = colorInput.value;
            }
            else {
                box.style.backgroundColor = "#f1b26a";
            }
        });
        box.addEventListener('mousedown', startDrawing);
        box.addEventListener('mouseup', stopDrawing);
        box.addEventListener('mouseover', drawing);
    })

}

const startDrawing = (event) => {
    isDrawing = true
}

const drawing = (event) => {
    if (!isDrawing) return
    
    if (!erase) {
        event.target.style.backgroundColor = colorInput.value;
    }
    else {
        event.target.style.backgroundColor = "#f1b26a";
    }
}

const stopDrawing = () => {
    isDrawing = false
}

function eraser() {
    if (erase == false) {
        erase = true;
        document.body.style.cursor = `url('assets/eraser.png'), auto`;
        // document.body.style.cursor = "pointer";
    }
    else {
        erase = false;
        document.body.style.cursor = "default";
    }
}

createGrid()
draw()
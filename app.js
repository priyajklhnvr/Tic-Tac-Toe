
let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#resetButton");
let newMsgBtn = document.querySelector("#new");
let msgBox = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkForDraw = () => {
    for (let box of boxes) {
        if (box.innerText === "") {
            return false;
        }
    }
    return true;
};

const resetGame = () => {
    turnO = true;
    enableBox();
    msgBox.classList.add("hide");
    msgBox.style.display = "none"; // Ensure the message box is hidden
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Box clicked!");
        if (box.innerText === "") { // Ensure the box is empty before marking
            if (turnO) {
                box.innerText = "O";
                turnO = false;
            } else {
                box.innerText = "X";
                turnO = true;
            }
            box.disabled = true;

            checkWinner();
        }
    });
});

const disableBox = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBox = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msg.style.color = "white";
    msgBox.style.display = "block";
    disableBox();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [pos1, pos2, pos3] = pattern.map(index => boxes[index].innerText);
        if (pos1 && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            return;
        }
    }
    if (checkForDraw()) {
        msg.innerText = "It's a draw!";
        msg.style.color = "white";
        msgBox.style.display = "block";
        disableBox();
    }
};

newMsgBtn.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);


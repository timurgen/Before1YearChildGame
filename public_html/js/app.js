const ELEMENTS = 16;
const SIZE_PERCENT = "25%";
const GAMEAREA = document.getElementById('gameArea');
const RANDOM_EVENTS = true;
const RANDOM_EVENT_PERIOD = 5000;
const ELEMENT_CLASS = 'cell';
const COLORS = [
    "FFFFAA", "D4D46A", "808015", "555500",
    "CD88AF", "AA5585", "661141", "440026",
    "9775AA", "764B8E", "3D1255", "260339",
    "354F00", "567714", "A5C663", "D4EE9F"
];

!function () {
    initGameArea();
    if (RANDOM_EVENTS) {
        initRandomEvents();
    }
}();

function initGameArea() {
    GAMEAREA.style.height = '100vh';
    for (let i = 0; i < ELEMENTS; i++) {
        initElement(i);
    }
}

function initElement(index) {
    const element = document.createElement('div');
    element.dataset.index = index;
    element.className = ELEMENT_CLASS;
    initElementStyle(element);
    initEvents(element);
    GAMEAREA.appendChild(element);
}

function initElementStyle(element) {
    element.style.float = 'left';
    element.style.width = SIZE_PERCENT;
    element.style.height = SIZE_PERCENT;
}

function initEvents(element) {
    element.onclick = function (e) {
        changeState(e.target);
    };
}

function changeState(element) {
    const state = element.dataset.state;
    switch (state) {
        case 'colored':
            element.style.backgroundColor = "";
            delete element.dataset.state;
            break;
        default:
            const randomValue = Math.floor((Math.random() * ELEMENTS));
            const color = COLORS[randomValue];
            element.style.backgroundColor = "#" + color;
            element.dataset.state = 'colored';
            break;
    }

}

function initRandomEvents() {
    const periodicEvent = setInterval(function () {
        const elements = document.getElementsByClassName(ELEMENT_CLASS);
        const randomValue = Math.floor((Math.random() * ELEMENTS));
        let element = null;
        for (let i = 0; i < ELEMENTS; i++) {
            if (parseInt(elements[i].dataset.index) === randomValue) {
                element = elements[i];
                break;
            }
        }
        if (null !== element) {
            changeState(element);
        }
    }, RANDOM_EVENT_PERIOD);
}

function createButton(text = 'CLICK ME!', width = 600, height = 200) {
    const button = document.createElement('button');
    button.classList.add('button');
    button.textContent = text;
    Object.assign(button.style, {width: `${width}px`, height: `${height}px`});

    return button;
}

// xPos, yPos - float 0..1 from left/top to right/bottom position
function placeElement(element, xPosition = 0.5, yPosition = 0.5) {
    const {innerWidth, innerHeight} = window;
    const width = parseInt(element.style.width);
    const height = parseInt(element.style.height);
    const left = (innerWidth - width) * xPosition;
    const top = (innerHeight - height) * yPosition;
    Object.assign(button.style, {left: `${left}px`, top: `${top}px`});
    document.body.append(element);
}

function mouseClickHandler() {
    placeElement(this, Math.random(), Math.random());
}

function mouseOverHandler() {
    if (Math.random() > 0.5) {
        placeElement(this, Math.random(), Math.random());
    }
}

const button = createButton();
button.addEventListener('mouseover', mouseOverHandler);
button.addEventListener('click', mouseClickHandler);
placeElement(button);




const MIN_BTN_WIDTH = 500;
const MIN_BTN_HEIGHT = 140;

function createButton(width = 600, height = 200) {
    const sizeValidationResult = validateSizes(width, height);

    if (!sizeValidationResult.isValid) {
        throw new Error(sizeValidationResult.errorMessage);
    }

    const button = document.createElement('button');
    button.classList.add('button');
    button.textContent = 'CLICK ME!';
    Object.assign(button.style, {width: `${width}px`, height: `${height}px`});

    return button;
}

function validateSizes(width, height) {
    const {innerWidth, innerHeight} = window;

    if (!Number.isInteger(width) || width < MIN_BTN_WIDTH || width > innerWidth) {
        return {
            isValid: false,
            errorMessage: `${width} value is incorrect`
        }
    }

    if (!Number.isInteger(height) || height < MIN_BTN_HEIGHT || height > innerHeight) {
        return {
            isValid: false,
            errorMessage: `${height} value is incorrect`
        }
    }

    return {
        isValid: true
    }
}

function placeElement(element, xPosition = 0.5, yPosition = 0.5) {
    if (!(element instanceof Element)) {
        throw new Error(`${element} is not an Element`);
    }

    if (!isPositionValid(xPosition)) {
        throw new Error(`${xPosition} value is incorrect`);
    }

    if (!isPositionValid(yPosition)) {
        throw new Error(`${yPosition} value is incorrect`);
    }

    const {innerWidth : windowWidth, innerHeight: windowHeight} = window;
    const {width: widthStr, height: heightStr} = element.style;
    const left = calculateOffset(windowWidth, xPosition, widthStr);
    const top = calculateOffset(windowHeight, yPosition, heightStr);
    Object.assign(button.style, {left: `${left}px`, top: `${top}px`});
    document.body.append(element);
}

function isPositionValid(position) {
    return Number.isFinite(position) && position >= 0 && position <= 1;
}

function calculateOffset(windowSize, position, sizeStr) {
    const size = parseInt(sizeStr);

    return (windowSize - size) * position;
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





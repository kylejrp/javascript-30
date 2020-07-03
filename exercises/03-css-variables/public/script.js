const root = document.documentElement;

const setupElementForCssVariable = (selector, variable) => {
    const element = document.querySelector(selector);

    // Randomize the starting values and offsets
    if (element.type === "range") {
        randomizeInitialValues(element)
    }

    // Add the event listener for when the input changes
    const handleElementInput = () => handleInput(element, variable);
    element.addEventListener('input', handleElementInput);

    // Handle the initial values set on the element
    handleElementInput();
}

const randomizeInitialValues = (element) => {
    const { step, min, max } = element;
    const { offset } = element.dataset;

    const numberOfDiscreteValues = ((max - min) / step) + 1;

    const random = getRandomInt(0, numberOfDiscreteValues);
    element.value = parseInt(min) + (random * step);


    if (offset) {
        const randomOffset = getRandomInt(0, numberOfDiscreteValues);
        element.dataset.offset = parseInt(min) + (randomOffset * step)
    }

}

// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const handleInput = (element, variable) => {
    if (element.value) {
        let elementValue = element.value;

        if (element.dataset.offset) {
            elementValue = parseInt(elementValue) + parseInt(element.dataset.offset);
        }

        if (element.dataset.absolute === "") {
            elementValue = Math.abs(parseInt(elementValue));
        }

        const elementUnits = element.dataset.sizing ?? '';

        const elementValueWithUnits = `${elementValue}${elementUnits}`;

        root.style.setProperty(variable, elementValueWithUnits)
    }
}

setupElementForCssVariable('input#rotation', '--rotation');
setupElementForCssVariable('input#blur', '--blur');
setupElementForCssVariable('input#base', '--base');


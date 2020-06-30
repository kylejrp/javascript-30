const root = document.documentElement;

const addAndFireInputListener = (selector, variable) => {
    const element = document.querySelector(selector);
    const handleElementInput = () => handleInput(element, variable);
    element.addEventListener('input', handleElementInput);
    handleElementInput();
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

addAndFireInputListener('input#rotation', '--rotation');
addAndFireInputListener('input#blur', '--blur');
addAndFireInputListener('input#base', '--base');


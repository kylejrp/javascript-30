const root = document.documentElement;

const addAndFireInputListener = (selector, variable) => {
    const element = document.querySelector(selector);
    const handleElementInput = () => handleInput(element, variable);
    element.addEventListener('input', handleElementInput);
    handleElementInput();
}

const handleInput = (element, variable) => {
    if (element.value) {
        const elementValue = `${element.value}${element.dataset.sizing ?? ''}`;
        root.style.setProperty(variable, elementValue)
    }
}

addAndFireInputListener('input#spacing', '--spacing');
addAndFireInputListener('input#blur', '--blur');
addAndFireInputListener('input#base', '--base');


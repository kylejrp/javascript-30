const endpoint = 'https://www.dnd5eapi.co/api/equipment'

let equipment = []
const searchElement = document.querySelector('.search')

const search = () => {
    const searchText = searchElement.value
    const foundEquipment = equipment.filter(equipment => equipment.name.toLowerCase().includes(searchText.toLowerCase()))

    const suggestions = document.querySelector('.suggestions')
    while (suggestions.firstChild) {
        suggestions.firstChild.remove()
    }

    if (equipment.length === foundEquipment.length) {
        return;
    }

    foundEquipment.forEach(equipment => {
        const li = document.createElement("li")
        const searchRegex = new RegExp(searchText, 'gi')
        const equipmentText = sanitizeHTML(equipment.name).replace(searchRegex, '<span class="hl">$&</span>')
        li.innerHTML = equipmentText;
        suggestions.appendChild(li)
    })
}

fetch(endpoint)
    .then(response => response.json())
    .then(data => equipment = data.results)
//    .then(() => search())

searchElement.addEventListener('input', search)


/*!
 * Sanitize and encode all HTML in a user-submitted string
 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {String} str  The user-submitted string
 * @return {String} str  The sanitized string
 */
var sanitizeHTML = function (str) {
    var temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
};
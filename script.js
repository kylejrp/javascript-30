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

    foundEquipment.forEach(equipment => {
        const li = document.createElement("li")
        li.appendChild(document.createTextNode(equipment.name))
        suggestions.appendChild(li);
    })
}

fetch(endpoint)
    .then(response => response.json())
    .then(data => equipment = data.results)
//    .then(() => search())

searchElement.addEventListener('input', search)
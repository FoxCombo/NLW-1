function populateUFs() {
    const ufSelect = document.querySelector('select[name=uf]')

    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then( res => res.json() )
    .then( states => {

        for( state of states ) {
            ufSelect.innerHTML += `<option value='${state.id}'>${state.nome}</option>`
        }

    })
}

populateUFs();

function getCities(event) {
    const citySelect = document.querySelector('[name=city]')
    const stateInput = document.querySelector('[name=state]')

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>";
    citySelect.disabled = true;

    fetch(url)
    .then( res => res.json() )
    .then( cities => {

        for(city of cities) {
            citySelect.innerHTML += `<option value='${city.nome}'>${city.nome}</option>`
        }

    citySelect.disabled = false;
    })
}

document
    .querySelector('select[name=uf]')
    .addEventListener('change', getCities)

// Itens de coleta
// pegar todos os LIs
const itemsToCollect = document.querySelectorAll(".items-grid li");

for (const item of itemsToCollect) {
    item.addEventListener('click', handleSelectetItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = [];

function handleSelectetItem(event) {
    const itemLi = event.target

    // add or remove a class
    itemLi.classList.toggle('selected')

    const itemId = itemLi.dataset.id

    // console.log("ITEM ID: ", itemId);
    // verificar se existem itens selecionados e transportar os itens pro input
    //pegar os selecionados
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId
        return itemFound
    })

    // se ja estiver selecionado, remover da seleção
    if(alreadySelected >= 0) {
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        selectedItems.push(itemId)
    }

    console.log("SelectedItems: ", selectedItems);
    // atualizar o input hidden com os itens
    collectedItems.value = selectedItems

}
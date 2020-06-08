// fill the UF select of form
function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]");

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((response) => response.json())
    .then((states) => {
      for (const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      }
    });
}
populateUFs();

// fill the city select of form
function getCities(event) {
  const citySelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("input[name=state]");

  const selectedUfId = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  citySelect.innetHTML = `<option value="">Selecione uma cidade</option>`;
  citySelect.disabled = true;
  fetch(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUfId}/municipios`
  )
    .then((res) => res.json())
    .then((cities) => {
      citySelect.innerHTML = "";
      for (const city of cities) {
        citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`;
      }

      citySelect.disabled = false;
    });
}
document.querySelector("select[name=uf]").addEventListener("change", getCities);

// Select the items grid
const itemsToCollect = document.querySelectorAll(".items-grid li");

let selectedItems = [];
const collectedItems = document.querySelector("input[name=items]");
function handleSelectedItem(event) {
  const itemLi = event.target;

  itemLi.classList.toggle("selected");

  const itemId = itemLi.dataset.id;

  const alreadySelected = selectedItems.find((item) => item === itemId);

  if (alreadySelected) {
    selectedItems.splice(selectedItems.indexOf(itemId), 1);
  } else {
    selectedItems.push(itemId);
  }

  collectedItems.value = selectedItems;
}

for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem);
}

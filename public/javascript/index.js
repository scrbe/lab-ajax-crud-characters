const charactersAPI = new APIHandler('http://localhost:8000');

function showCharacters(characterData) {

  const charactContainer = document.querySelector('.characters-container')
  charactContainer.innerHTML= ''

  if (Array.isArray(characterData)) {
    characterData.forEach(character => {
      charactContainer.innerHTML += `
      <div class="character-info">
        <div class="name">Character Name: ${character.name}</div>
        <div class="occupation">Character Occupation: ${character.occupation}</div>
        <div class="cartoon">Is a Cartoon?: ${character.cartoon}</div>
        <div class="weapon">Character Weapon: ${character.weapon}</div>
        <div class="id">Character ID: ${character.id}</div>
      </div>
      `
    })
  } else {
    charactContainer.innerHTML += `
    <div class="character-info">
    <div class="name">Character Name: ${characterData.name}</div>
    <div class="occupation">Character Occupation: ${characterData.occupation}</div>
    <div class="cartoon">Is a Cartoon?: ${characterData.cartoon}</div>
    <div class="weapon">Character Weapon: ${characterData.weapon}</div>
    <div class="weapon">Character ID: ${characterData.id}</div>
  </div>
    `
  }
}

window.addEventListener('load', () => {

  document.getElementById('fetch-all').addEventListener('click', async function (event) {
    const allCharacters = await charactersAPI.getFullList()
    showCharacters(allCharacters)
  })

  document.getElementById('fetch-one').addEventListener('click', async function (event) {
    const {value: characterId} = document.querySelector('.operation input')
    const singleCharacter = await charactersAPI.getOneRegister(characterId)
    showCharacters(singleCharacter)
  });

  document.getElementById('delete-one').addEventListener('click', async function (event) {
    const { value: characterId } = document.querySelector('.operation.delete input')
    const deletebtn = document.querySelector('#delete-one')
    console.log('character', characterId)
    const deletedCharacter = await charactersAPI.deleteOneRegister(characterId)
    if (deletedCharacter) {
      deletebtn.classList.add('#deleted-character')
    } else {
      deletebtn.classList.add('#failed-deleted-character')
    }
  });

  document.getElementById('edit-character-form').addEventListener('submit', async function (event) {

    event.preventDefault()

    const {value: id} = document.querySelector('#edit-character-id')
    const {value: name} = document.querySelector('#edit-character-name')
    const {value: occupation} = document.querySelector('#edit-character-occupation')
    const {value: weapon} = document.querySelector('#edit-character-weapon')
    const { value: checkbox } = document.querySelector('#edit-character-cartoon')
    
    const updateData = {
      name, occupation, weapon, checkbox
    }
    const editCharacter = await charactersAPI.updateOneRegister(id, updateData)
    console.log('edited character', editCharacter)
  });

  document.getElementById('new-character-form').addEventListener('submit', async function (event) {

    event.preventDefault()

    const {value: name} = document.querySelector('#new-character-name')
    const {value: occupation} = document.querySelector('#new-character-occupation')
    const {value: weapon} = document.querySelector('#new-character-weapon')
    const {value: checkbox} = document.querySelector('#new-character-checkbox')

    const newCharacterData = {
      name, 
      occupation,
      weapon,
      checkbox
    }

    const newCharacter = await charactersAPI.createOneRegister(newCharacterData)
    console.log('New Character:', newCharacter)
  });
})

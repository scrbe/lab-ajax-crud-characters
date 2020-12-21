class APIHandler {
  constructor (baseUrl) {
    this.BASE_URL = baseUrl;
    this.APIRequest = axios.create({
      baseURL: this.BASE_URL
    })
  }

  async getFullList () {
    try {
      const { data: allCharacters } = await this.APIRequest.get('/characters');
      console.log('All Characters:', allCharacters)
      return allCharacters;
    } catch (error) {
      console.log(error);
    }
  }

  async getOneRegister (characterId) {
    try {
      const { data: singleCharacter } = await this.APIRequest.get(`/characters/${characterId}`)
      return singleCharacter
    } catch (error) {
      console.log(error);
    }
  }

  async createOneRegister (newCharacterInfo) {
    try {
      await this.APIRequest.post('/characters', newCharacterInfo)
    } catch (error) {
      console.log(error);
    }
  }

  async updateOneRegister (characterId, editCharacterInfo) {
    try {
      await this.APIRequest.put(`/characters/${characterId}`, editCharacterInfo)
    } catch (error) {
      console.log('There is an error !', error)
    }
  }

  async deleteOneRegister (characterId) {
    try {
      await this.APIRequest.delete(`/characters/${characterId}`)
    } catch (error) {
      console.log('There is an error!', error)
    }
  }
}

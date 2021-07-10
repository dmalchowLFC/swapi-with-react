import './App.css';
import axios from 'axios';
import React from "react"
import CharactersTable from './components/CharactersTable';
import SearchBar from './components/SearchBar'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      character: '',
      birthday: '',
      height: '',
      mass: '',
      homeworld: '',
      species: '',
      charactersList: [],
      nameList: []
    }

  }
  handleSubmit(event) {
    event.preventDefault();


  }

  componentDidMount() {
    axios.get('https://swapi.dev/api/people/')
      .then(async (response) => {
        const characters = response.data.results;
        for (const character of characters) {
          let nameList = [];
          const planet = character.homeworld;
          const species = character.species;
          const homeworldResponse = await axios.get(planet)
          character.homeworld = homeworldResponse.data.name
          const speciesResponse = await axios.get(species)
          if (character.species.length === 0) {
            character.species = "Human"
            nameList.push(character.name)
          } else {
            nameList.push(character.name)
            character.species = speciesResponse.data.name;
          }
          this.setState({
            charactersList: characters,
            character: character.name,
            birthday: character.birth_year,
            height: character.height,
            mass: character.mass,
            homeworld: character.homeworld,
            species: character.species,
            nameList: nameList
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
  render() {
    return (
      <div>
        <SearchBar options={this.state.nameList} />
        <CharactersTable charactersList={this.state.charactersList} />
      </div>
    )
  }

}


export default App;

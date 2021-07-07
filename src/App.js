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
      charactersList: []
    }

  }
  handleSubmit(event) {
    event.preventDefault();


  }

  componentDidMount() {
    axios.get('https://swapi.dev/api/people/')
      .then(async (response) => {
        const characters = response.data.results;
        console.log('These are the characters results:', characters)

        for (const character of characters) {
          const planet = character.homeworld;
          const species = character.species;
          const homeworldResponse = await axios.get(planet)
          character.homeworld = homeworldResponse.data.name


          const speciesResponse = await axios.get(species)
          if (speciesResponse === '') {
            character.species = "Human"
          } else {
            character.species = speciesResponse.data.name;
            console.log('species are:', speciesResponse)
          }





          this.setState({
            charactersList: characters,
            character: character.name,
            birthday: character.birth_year,
            height: character.height,
            mass: character.mass,
            homeworld: character.homeworld,
            species: character.species
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
        <SearchBar handleSubmit={this.handleSubmit} />
        <CharactersTable charactersList={this.state.charactersList} />
      </div>
    )
  }

}


export default App;

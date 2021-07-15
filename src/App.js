import './App.css';
import axios from 'axios';
import React from "react"
import CharactersTable from './components/CharactersTable';
import SearchBar from './components/SearchBar'
import Header from './components/Header'


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
      searchQuery: ''
    }
    this.componentDidMount = this.componentDidMount.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }


  handleChange(event) {
    this.setState({
      searchQuery: event.target.value
    })
  }



  componentDidMount() {
    axios.get('https://swapi.dev/api/people/')
      .then(async (response) => {
        const characters = response.data.results;
        for (const character of characters) {
          const planet = character.homeworld;
          const species = character.species;
          const homeworldResponse = await axios.get(planet)
          character.homeworld = homeworldResponse.data.name
          const speciesResponse = await axios.get(species)
          if (character.species.length === 0) {
            character.species = "Human"
          } else {
            character.species = speciesResponse.data.name;
          }
          this.setState({
            charactersList: characters,
            id: character.name,
            character: character.name,
            birthday: character.birth_year,
            height: character.height,
            mass: character.mass,
            homeworld: character.homeworld,
            species: character.species,
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
  async handleSubmit(event) {
    event.preventDefault();
    const search = await axios.get(`https://swapi.dev/api/people/?search=${this.state.searchQuery}`)
    const searchResults = search.data.results
    for (const person of searchResults) {
      const planet = person.homeworld;
      const species = person.species;
      const homeworldResponse = await axios.get(planet);
      person.homeworld = homeworldResponse.data.name;
      const speciesResponse = await axios.get(species);
      if (person.species.length === 0) {
        person.species = "Human"
      } else {
        person.species = speciesResponse.data.name;
      }
      this.setState({
        charactersList: searchResults,
        id: person.name,
        character: person.name,
        birthday: person.birth_year,
        height: person.height,
        mass: person.mass,
        homeworld: person.homeworld,
        species: person.species
      })
    }


  }
  render() {
    return (
      <div className="theApp">
        < Header />
        <SearchBar
          handleChange={this.handleChange}
          searchQuery={this.state.searchQuery}
          handleSubmit={this.handleSubmit} />
        <CharactersTable charactersList={this.state.charactersList} />
      </div >
    )
  }

}


export default App;

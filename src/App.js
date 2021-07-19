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
      charactersList: [],
      searchQuery: '',
      isLoading: false
    }
    this.componentDidMount = this.componentDidMount.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getSpecies = this.getSpecies.bind(this)
    this.getCharacters = this.getCharacters.bind(this)
    this.getHomeWorld = this.getHomeWorld.bind(this)
  }

  componentDidMount() {
    this.getCharacters("https://swapi.dev/api/people/")
  }

  handleChange(event) {
    this.setState({
      searchQuery: event.target.value
    })
  }

  async getCharacters(URL) {
    this.setState({ isLoading: true })
    axios.get(URL)
      .then(async (response) => {
        const characters = response.data.results;
        for (const character of characters) {
          const planetURL = character.homeworld;
          const speciesURL = character.species;
          character.homeworld = await this.getHomeWorld(planetURL)
          character.species = await this.getSpecies(speciesURL)
        }
        this.setState({
          charactersList: characters,
        })
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => this.setState({ isLoading: false }))
  }

  async getHomeWorld(URL) {
    const homeworldResponse = await axios.get(URL)
    return homeworldResponse.data.name
  }

  async getSpecies(URL) {
    if (URL.length === 0) {
      return "Human"
    } else {
      const speciesResponse = await axios.get(URL)
      return speciesResponse.data.name;
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.getCharacters(`https://swapi.dev/api/people/?search=${this.state.searchQuery}`)
  }
  render() {
    return (
      <div className="theApp">
        < Header />
        <SearchBar
          handleChange={this.handleChange}
          searchQuery={this.state.searchQuery}
          handleSubmit={this.handleSubmit} />
        <br></br>
        <CharactersTable isLoading={this.state.isLoading} charactersList={this.state.charactersList} />
      </div >
    )
  }

}


export default App;

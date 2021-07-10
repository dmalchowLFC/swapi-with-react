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
      nameList: [],
      next: '',
      previous: '',
      searchQuery: ''
    }
    this.componentDidMount = this.componentDidMount.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)

  }


  handleChange(event) {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }
  handleSearchChange(event) {
    this.setState({
      searchQuery: event.target.value
    })
    console.log(event.target)
  }


  componentDidMount() {
    axios.get('https://swapi.dev/api/people/')
      .then(async (response) => {
        const characters = response.data.results;
        const next = response.data.next
        const prev = response.data.previous

        let nameList = []
        for (const character of characters) {
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
            id: character.name,
            character: character.name,
            birthday: character.birth_year,
            height: character.height,
            mass: character.mass,
            homeworld: character.homeworld,
            species: character.species,
            nameList: nameList,
            next: next,
            prev: prev
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
  async handleSubmit(event) {
    event.preventDefault();
    const search = await axios.get(`https://swapi.dev/api/people/?search=${this.state.seachQuery}`)
    console.log(search)
    //   const searchQuery = this.state.searchQuery
    //   const soloLine = this.state.charactersList.filter(character => character.id === searchQuery)

    //   console.log(soloLine)
    //   console.log(searchQuery)

    //   if (searchQuery in this.state.nameList) {

    //     this.setState({
    //       charactersList: soloLine
    //     })
    //   } else {
    //     alert("Name not found")
    //   }
  }
  render() {
    return (
      <div>
        <SearchBar nameList={this.state.nameList} handleSearchChange={this.handleSearchChange} state={this.state} handleSubmit={this.handleSubmit} />
        <CharactersTable charactersList={this.state.charactersList} />
      </div>
    )
  }

}


export default App;

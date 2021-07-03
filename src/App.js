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
      .then(response => {
        const charactersList = response.data.results;
        let rowId = this.state.charactersList.name;
        const newRow = {
          id: rowId,
          character: this.state.charactersList.name,
          birthday: this.state.charactersList.birth_year,
          height: this.state.charactersList.height,
          mass: this.state.charactersList.mass,
          homeworld: this.state.charactersList.homeworld,
          species: this.state.charactersList.species,
        }
        console.log("the data is: ", charactersList)
        this.setState({
          charactersList: [...this.state.charactersList, newRow],
          character: charactersList.name,
          birthday: charactersList.birth_year,
          height: charactersList.height,
          mass: charactersList.mass,
          homeworld: charactersList.homeworld,
          species: charactersList.species
        })
      })
      .catch(error => {
        console.log(error);
      });
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

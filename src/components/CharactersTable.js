import React from "react"

function CharactersTable(props) {
    return (
        <div>
            <table className="table table-striped text-warning font-weight-bold">
                <thead className="thead-dark">
                    <tr>
                        <th className="tableHeads text-warning">Name</th>
                        <th className="tableHeads text-warning">Birth Date</th>
                        <th className="tableHeads text-warning">Height</th>
                        <th className="tableHeads text-warning">Mass</th>
                        <th className="tableHeads text-warning">Homeworld</th>
                        <th className="tableHeads text-warning">Species</th>
                    </tr>
                </thead>
                <tbody>
                    {props.charactersList.map(character => {
                        return (
                            <tr key={character.name}>
                                <td>{character.name}</td>
                                <td>{character.birth_year}</td>
                                <td>{character.height}</td>
                                <td>{character.mass}</td>
                                <td>{character.homeworld}</td>
                                <td>{character.species}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default CharactersTable
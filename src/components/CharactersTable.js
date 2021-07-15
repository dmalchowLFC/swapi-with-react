import React from "react"

function CharactersTable(props) {
    return (
        <div>
            <table className="table table-striped text-white">
                <thead className="thead-dark">
                    <tr>
                        <th className="tableHeads">Name</th>
                        <th className="tableHeads">Birth Date</th>
                        <th className="tableHeads">Height</th>
                        <th className="tableHeads">Mass</th>
                        <th className="tableHeads">Homeworld</th>
                        <th className="tableHeads">Species</th>
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
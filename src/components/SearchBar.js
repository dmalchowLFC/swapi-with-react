import React from "react"

const SearchBar = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <input
                className="search"
                type="text"
                name="search"
                placeholder="Search for a Star Wars character"
            // value={props.state.search} 
            />
            <button>Search</button>
        </form>
    )
}

export default SearchBar
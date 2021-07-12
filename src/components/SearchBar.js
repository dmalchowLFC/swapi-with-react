import React from 'react';

const SearchBar = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <label> Search for a specific character:</label>
                <input
                    type="text"
                    name="searchQuery"
                    onChange={props.handleChange}
                    value={props.searchQuery} />
                <button type="submit" className="btn btn-dark" >Search</button>
            </form>

        </div>
    )
}

export default SearchBar;
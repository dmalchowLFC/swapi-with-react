import React from 'react';

const SearchBar = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <label> Search for a specific character:</label>
                <input type="text" name="searchQuery" onChange={props.handleSearchChange} value={this.state.searchQuery} />
                <button type="submit" className="btn btn-dark" >Search</button>
            </form>

        </div>
    )
}

export default SearchBar;
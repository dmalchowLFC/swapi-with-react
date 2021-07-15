import React from 'react';

const SearchBar = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <label className="col-sm-4 col-form-label text-white" for="searchQuery"> Search for a specific character:</label>
                <input
                    type="text"
                    name="searchQuery"
                    onChange={props.handleChange}
                    value={props.searchQuery}
                    className="form col-md-6" />
                <button type="submit" className="btn btn-dark col-sm-1" >Search</button>
            </form>

        </div>
    )
}

export default SearchBar;
import React from 'react';

const SearchBar = (props) => {
    return (
        <div className="d-flex justify-content-center">
            <form onSubmit={props.handleSubmit}>
                <label className="col-form-label text-warning text-uppercase" for="searchQuery"> Search for a specific character:</label>
                <hr></hr>
                <input
                    type="text"
                    name="searchQuery"
                    onChange={props.handleChange}
                    value={props.searchQuery}
                    className="form bg-warning" />
                <button type="submit" className="btn btn-dark text-warning" >Search</button>
            </form>

        </div>
    )
}

export default SearchBar;
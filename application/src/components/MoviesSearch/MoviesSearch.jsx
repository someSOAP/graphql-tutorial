import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import withHocs from './MoviesSearchHoc';

const MoviesSearch = ({ classes, name, handleChange, handleSearch }) => (
    <div className={classes.search}>
        <div className={classes.searchIcon}>
            <SearchIcon />
        </div>
        <InputBase
            onChange={handleChange('name')}
            onKeyPress={(e) => handleSearch(e)}
            value={name}
            placeholder="Search…"
            classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
            }}
        />
    </div>
);

export default withHocs(MoviesSearch);

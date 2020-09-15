import React from 'react';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import SaveIcon from '@material-ui/icons/Save';

import withHocs from './MoviesFormHoc';


const handleClose = ({ onClose }) => () => {
  onClose();
};

const handleSave = ({ selectedValue, onClose, addMovie, updateMovie }) => () => {
  const { id, name, genre, rate, directorId, watched } = selectedValue;
  id ?
      updateMovie({id, name, genre, rate: Number(rate), directorId: directorId || undefined, watched: Boolean(watched) }) :
      addMovie({ name, genre, rate: Number(rate), directorId: directorId || undefined, watched: Boolean(watched) });
  onClose();
};


const MoviesForm = (
    {
      onClose,
      addMovie,
      updateMovie,
      data = {},
      classes,
      open,
      handleChange,
      handleSelectChange,
      handleCheckboxChange,
      selectedValue = {}
    }
) => {
  const { name, genre, rate, directorId, watched } = selectedValue;
  const { directors = [] } = data;

  return (
      <Dialog onClose={handleClose({ onClose })} open={open} aria-labelledby="simple-dialog-title">
        <DialogTitle className={classes.title} id="simple-dialog-title">Movie information</DialogTitle>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
              id="outlined-name"
              label="Name"
              className={classes.textField}
              value={name}
              onChange={handleChange('name')}
              margin="normal"
              variant="outlined"
          />
          <TextField
              id="outlined-genre"
              label="Genre"
              className={classes.textField}
              value={genre}
              onChange={handleChange('genre')}
              margin="normal"
              variant="outlined"
          />
          <TextField
              id="outlined-rate"
              label="Rate"
              value={rate}
              onChange={handleChange('rate')}
              type="number"
              className={classes.textField}
              margin="normal"
              variant="outlined"
          />
          <FormControl variant="outlined" className={classes.formControlSelect}>
            <InputLabel
                htmlFor="outlined-age-simple"
            >
              Director
            </InputLabel>
            <Select
                value={directorId}
                onChange={handleSelectChange}
                input={<OutlinedInput name="directorId" id="outlined-director" labelWidth={57} />}
            >
              {directors.map(director => <MenuItem key={director.id} value={director.id}>{director.name}</MenuItem>)}
            </Select>
          </FormControl>
          <div className={classes.wrapper}>
            <FormControlLabel
                control={<Checkbox checked={watched} onChange={handleCheckboxChange('watched')} value="watched" />}
                label="Watched movie"
            />
            <Button onClick={handleSave({ selectedValue, onClose, addMovie, updateMovie })} variant="contained" color="primary" className={classes.button}>
              <SaveIcon /> Save
            </Button>
          </div>
        </form>
      </Dialog>
  );
};

export default withHocs(MoviesForm);

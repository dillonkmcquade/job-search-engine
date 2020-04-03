import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import RoomIcon from "@material-ui/icons/Room";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import "./search-bar.styles.scss";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200,
      backgroundColor: "#96A1D3",
      color: "white"
    }
  }
}));

const SearchBar = ({
  description,
  location,
  errorStatus,
  setDescription,
  setLocation,
  onSubmit
}) => {
  const classes = useStyles();
  return (
    <nav>
      <form
        className={`${classes.root} search-bar`}
        noValidate
        autoComplete="off"
      >
        <TextField
          className={classes.margin}
          id="outlined-basic"
          label="Job Description"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          variant="filled"
          size="small"
          value={description}
          onChange={event => setDescription(event.target.value)}
        />
        <TextField
          required
          id="input-with-icon-textfield"
          label="Location"
          variant="filled"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <RoomIcon />
              </InputAdornment>
            )
          }}
          error={errorStatus}
          helperText={errorStatus ? "Field required" : null}
          value={location}
          onChange={event => setLocation(event.target.value)}
        />
        <input
          className="submit-btn"
          type="submit"
          value="Find Jobs"
          onClick={onSubmit}
        />
      </form>
    </nav>
  );
};

export default SearchBar;

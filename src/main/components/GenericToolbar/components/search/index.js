import { Collapse, IconButton, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined";

const Search = (props) => {
  const { value, onChange, placeholder } = props;
  const [searchClicked, setSearchClicked] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value);

  const handleClearSearch = () => {
    setSearchTerm("");
    onChange("");
  };

  return (
    <Collapse in={searchClicked} orientation="horizontal" collapsedSize={100}>
      <TextField
        variant="standard"
        size="small"
        placeholder={placeholder ? placeholder : "Kerko"}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          onChange(e.target.value);
        }}
        onClick={() => {
          if (!searchClicked) {
            setSearchClicked(true);
            handleClearSearch();
          }
        }}
        value={searchClicked ? searchTerm : "Search"}
        InputProps={{
          sx: {
            ".MuiInput-input": {
              padding: 0,
              fontSize: "0.96rem",
              "&:hover": {
                cursor: `${searchClicked ? "" : "pointer"}`,
              },
            },
          },
          disableUnderline: true,
          startAdornment: (
            <ManageSearchOutlinedIcon
              sx={{ cursor: "pointer" }}
              onClick={() => {
                searchClicked && handleClearSearch();
                setSearchClicked(!searchClicked);
              }}
            />
          ),
          endAdornment: searchClicked && (
            <IconButton
              title="Clear"
              aria-label="Clear"
              onClick={() => {
                handleClearSearch();
              }}
              sx={{
                visibility: `${
                  searchTerm && searchTerm.length > 0 ? "visible" : "hidden"
                }`,
                padding: 0,
              }}
            >
              <HighlightOffOutlinedIcon fontSize="small" />
            </IconButton>
          ),
        }}
        sx={{
          backgroundColor: `${
            searchClicked ? "rgba(109, 120, 141, 0.08)" : "none"
          }`,
          borderRadius: "8px",
          padding: "0.4375rem 0.75rem",
          transition: "background 250ms ease",
          "& .MuiSvgIcon-root": {
            mr: 0.5,
          },
          "&:hover": {
            backgroundColor: "rgba(109, 120, 141, 0.08)",
          },
        }}
      />
    </Collapse>
  );
};

export default Search;

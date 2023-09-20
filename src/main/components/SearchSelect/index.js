import { Autocomplete, MenuItem, TextField } from "@mui/material";
import { auto } from "@popperjs/core";
import React, { useEffect, useState } from "react";

// type Options = {
//   id?: number,
//   value: any,
//   label: string,
// };

const SearchSelect = (props) => {
  const {
    value,
    onChange,
    error,
    options,
    label,
    multiple = false,
    defaultValue,
  } = props;

  const [customValue, setCustomValue] = useState(
    multiple
      ? [
          ...options.filter(
            (o) => Array.isArray(value) && value?.includes(o.value)
          ),
        ]
      : value
      ? options.find((o) => o.value == value)
      : undefined
  );

  useEffect(() => {
    setCustomValue(
      multiple
        ? [
            ...options.filter(
              (o) => Array.isArray(value) && value?.includes(o.value)
            ),
          ]
        : value
        ? options.find((o) => o.value == value)
        : undefined
    );
  }, [value]);

  return (
    <Autocomplete
      multiple={multiple}
      defaultValue={defaultValue}
      noOptionsText={"Not found!"}
      value={customValue}
      fullWidth
      style={{ width: "100%" }}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) => {
        return options && value && option.value == value.value;
      }}
      size="small"
      onChange={(event, newValue) => {
        onChange(
          multiple
            ? [...newValue.map((v) => v.value)]
            : newValue
            ? newValue.value
            : null
        );
      }}
      options={options}
      sx={{ width: 300 }}
      renderOption={(props, option) => {
        props.key = props.id;

        return (
          <MenuItem key={`opsioni${option.value}`} {...props}>
            {option.label}
          </MenuItem>
        );
      }}
      renderInput={(params) => (
        <TextField {...params} label={label} error={error} />
      )}
    />
  );
};

export default SearchSelect;

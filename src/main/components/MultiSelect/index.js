import { getSameObjectValues } from "../../utils/functions";
import { Box, InputLabel, Select, Checkbox } from "@mui/material";
import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { pink } from "@mui/material/colors";
import { useRef } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MultiSelect = (props) => {
  const {
    labelInputId,
    label,
    onChange,
    initialValue,
    input,
    error,
    optionsRendered,
    totalOptions,
    shouldDisplaySelectedOptionsOnBottom = false,
  } = props;

  const [selectedIds, setSelectedIds] = useState(initialValue);
  const multiSelectRef = useRef(null);
  const [open, setOpen] = useState(false); //CONTROLLED DROPDOWN FOR SHOWING RESULTS IN BOTTOM

  return (
    <>
      <InputLabel id={labelInputId}>{label}</InputLabel>
      <Select
        open={open}
        ref={multiSelectRef}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        labelId={labelInputId}
        label={label}
        onChange={(e) => {
          const {
            target: { value },
          } = e;
          setSelectedIds(typeof value === "string" ? value.split(",") : value);
          onChange(value);
        }}
        renderValue={(selected) => {
          if (shouldDisplaySelectedOptionsOnBottom) {
            return (
              <>
                {selectedIds.length === totalOptions.length
                  ? "All selected"
                  : "Selected"}
              </>
            );
          } else {
            return <> {selected} </>; //modify what i want to show on the select
          }
        }}
        value={selectedIds}
        multiple
        error={error !== undefined}
        input={input}
        MenuProps={MenuProps}
      >
        {optionsRendered}
      </Select>

      {shouldDisplaySelectedOptionsOnBottom ? (
        <>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              marginTop:
                shouldDisplaySelectedOptionsOnBottom && open
                  ? "125px"
                  : "0.5rem",
            }}
          >
            {totalOptions &&
              selectedIds &&
              getSameObjectValues(totalOptions, selectedIds).map((opt) => {
                return (
                  <Box
                    key={opt.id}
                    sx={{ display: "flex", marginRight: "1rem" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "0.75rem",
                      }}
                    >
                      <Box
                        sx={{
                          width: "0.8rem",
                          height: "0.8rem",
                          backgroundColor: `${opt.color}`,
                          borderRadius: "50%",
                        }}
                      ></Box>
                      {opt.text}
                    </Box>
                    <Checkbox
                      onChange={() => {
                        const sIds = selectedIds.filter(
                          (item) => item !== opt.id
                        );
                        setSelectedIds(sIds);
                        onChange(sIds);
                      }}
                      size="small"
                      icon={<ClearIcon />}
                      checked={true}
                      sx={{
                        color: pink[800],
                        "&.Mui-checked": {
                          color: pink[600],
                        },
                      }}
                    />
                  </Box>
                );
              })}
          </Box>
        </>
      ) : (
        <> </>
      )}
    </>
  );
};

export default MultiSelect;

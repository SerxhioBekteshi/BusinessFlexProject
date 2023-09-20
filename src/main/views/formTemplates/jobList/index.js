import {
  FormControl,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { TypographyErrorStyled } from "../../../../main/components/TypographyErrorStyled";
import formValidationManager from "../../../../main/utils/formValidationmanager";
import eStatusEnum from "../../../enums/eStatusEnum";
import MultiSelect from "../../../components/MultiSelect";
import CheckIcon from "@mui/icons-material/Check";

const JobListForm = () => {
  const categoryOptions = [
    { text: "Sidewalk Shed", id: "1", color: "#67AA3C" },
    { text: "Scaffold", id: "2", color: "#EFD652" },
    { text: "Shoring", id: "3", color: "#9640BE" },
  ];

  const { control } = useFormContext();

  function formatCamelCaseToWords(inputString) {
    const words = inputString.split(/(?=[A-Z])/);
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);

    return words.join(" ");
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <FormControl fullWidth size="small">
            <Controller
              control={control}
              name="jobSiteName"
              rules={{ required: true }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  <TextField
                    size="small"
                    fullWidth
                    label="Job Site Name"
                    value={value}
                    placeholder="Job Site Name"
                    onChange={onChange}
                    error={error !== undefined}
                  />
                  {error && (
                    <TypographyErrorStyled>
                      {formValidationManager.extractError(error)}
                    </TypographyErrorStyled>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth size="small">
            <InputLabel sx={{ marginBottom: "0.5rem" }} id="status">
              Status
            </InputLabel>
            <Controller
              control={control}
              name="status"
              rules={{ required: true }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  <Select
                    label="status"
                    labelId="status"
                    value={value}
                    onChange={onChange}
                    error={error !== undefined}
                    renderValue={(selected) => {
                      return (
                        <>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                            }}
                          >
                            {" "}
                            <Box
                              sx={{
                                width: "0.8rem",
                                height: "0.8rem",
                                backgroundColor:
                                  selected === eStatusEnum.Completed
                                    ? "#7AC14D"
                                    : selected === eStatusEnum.InProgress
                                    ? "#B3D99B"
                                    : "#ECDE7C",
                                borderRadius: "50%",
                              }}
                            ></Box>
                            {selected}{" "}
                          </Box>
                        </>
                      );
                    }}
                  >
                    {Object.keys(eStatusEnum).map((key) => {
                      return (
                        <MenuItem
                          value={formatCamelCaseToWords(key)}
                          key={key}
                          sx={{
                            "&:hover": {
                              backgroundColor:
                                key === "Completed"
                                  ? "#7AC14D"
                                  : key === "InProgress"
                                  ? "#B3D99B"
                                  : "#ECDE7C",
                            },
                          }}
                        >
                          {formatCamelCaseToWords(key)}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {error && (
                    <TypographyErrorStyled>
                      {formValidationManager.extractError(error)}
                    </TypographyErrorStyled>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth size="small">
            <Controller
              control={control}
              name="categoryIds"
              rules={{ required: true }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  <MultiSelect
                    initialValue={[]}
                    labelInputId="category"
                    label="category"
                    onChange={onChange}
                    error={error}
                    shouldDisplaySelectedOptionsOnBottom={true}
                    totalOptions={categoryOptions}
                    optionsRendered={
                      categoryOptions &&
                      categoryOptions.map((option) => {
                        const isSelected = value && value.includes(option.id);
                        return (
                          <MenuItem
                            sx={{
                              "&:hover": {
                                backgroundColor: `${option.color}`,
                              },
                              "&.Mui-selected": {
                                backgroundColor: isSelected
                                  ? `${option.color}`
                                  : "transparent",
                              },

                              display: "flex",
                              justifyContent: "space-between",
                            }}
                            key={option.id}
                            value={option.id}
                          >
                            {option.text}
                            {isSelected && <CheckIcon />}
                          </MenuItem>
                        );
                      })
                    }
                  />

                  {/* <Select
                    label="category"
                    labelId="category"
                    value={value}
                    onChange={onChange}
                    error={error !== undefined}
                  >
                    {categoryOptions.map((option) => {
                      return (
                        <MenuItem value={option.value} key={option.value}>
                          {option.text}
                        </MenuItem>
                      );
                    })}
                  </Select> */}
                  {error && (
                    <TypographyErrorStyled>
                      {formValidationManager.extractError(error)}
                    </TypographyErrorStyled>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
};

export default JobListForm;

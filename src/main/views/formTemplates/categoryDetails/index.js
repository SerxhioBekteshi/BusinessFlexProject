import { Grid, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { TypographyErrorStyled } from "../../../../main/components/TypographyErrorStyled";
import formValidationManager from "../../../../main/utils/formValidationmanager";
import SearchSelect from "../../../../main/components/SearchSelect";
import { useEffect, useState } from "react";

const JobListForm = (props) => {
  const { model } = props;
  const { control } = useFormContext();

  //immitation of loading the json data from categoryDetails
  const options = [
    { id: 1, label: "G42295", value: "G42295", categoryId: 1 },
    { id: 2, label: "M721", value: "M721", categoryId: 1 },
    { id: 3, label: "M94796", value: "M94796", categoryId: 1 },
    { id: 4, label: "HDJS4", value: "HDJS4", categoryId: 1 },
    { id: 5, label: "S25907", value: "S25907", categoryId: 2 },
    { id: 6, label: "sefsefsef", value: "sefsefsef", categoryId: 3 },
    { id: 7, label: "TRY THIS", value: "TRY THIS", categoryId: 1 },
  ];

  const [neededOptions, setNeededOptions] = useState(options);

  useEffect(() => {
    setNeededOptions(
      options.filter((option) => option.categoryId === model.categoryId)
    );
  }, [model]);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="item"
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <>
                  <>
                    <SearchSelect
                      label="Item"
                      multiple={false}
                      value={value}
                      onChange={onChange}
                      error={error !== undefined}
                      options={neededOptions.map(
                        ({ categoryId, ...rest }) => rest
                      )}
                    />
                    {error && (
                      <TypographyErrorStyled>
                        {formValidationManager.extractError(error)}
                      </TypographyErrorStyled>
                    )}
                  </>
                </>
              );
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            control={control}
            name="quantity"
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextField
                  size="small"
                  type="number"
                  fullWidth
                  label="Quantity"
                  value={value}
                  placeholder="Quantity"
                  onChange={(val) => onChange(Number(val.target.value))}
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
        </Grid>

        <Grid item xs={12}>
          <Controller
            control={control}
            name="description"
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextField
                  size="small"
                  fullWidth
                  multiline={true}
                  rows={5}
                  label="Description"
                  value={value}
                  placeholder="Description"
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
        </Grid>

        <Grid item xs={12}>
          <Controller
            control={control}
            name="notes"
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextField
                  fullWidth
                  size="small"
                  multiline={true}
                  rows={5}
                  label="Notes"
                  value={value}
                  placeholder="Notes"
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
        </Grid>
      </Grid>
    </form>
  );
};

export default JobListForm;

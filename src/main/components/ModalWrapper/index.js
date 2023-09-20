import { useState } from "react";
import { Container } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import ModalCC from "../modal";
import Button from "@mui/material/Button";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";

const ModalWrapper = (props) => {
  const {
    children,
    title,
    onCancel,
    model,
    passDataAbove,
    dialogWidth,
    shouldHideContentOverflow,
  } = props;

  const [open, setOpen] = useState(false);
  const methods = useForm({ defaultValues: { ...model } });

  useEffect(() => {
    setOpen(true);
  }, []);

  const {
    handleSubmit,
    formState,
    reset,
    control,
    getValues,
    setValue,
    watch,
    register,
  } = methods;

  const handleFormSubmit = (data) => {
    if (passDataAbove) passDataAbove(data, false);
  };

  const handleClose = () => {
    setOpen(false);
    if (onCancel) onCancel();
    reset();
  };

  return (
    <ModalCC
      modalTitle={title}
      open={open}
      onClose={handleClose}
      dialogWidth={dialogWidth}
      shouldHideContentOverflow={shouldHideContentOverflow}
      actions={
        <>
          <Button
            sx={{ backgroundColor: "#71CF48", textTransform: "none" }}
            variant="contained"
            endIcon={<DoneIcon />}
            onClick={() => {
              handleSubmit(handleFormSubmit)();
            }}
            type="submit"
          >
            Save Changes
          </Button>
          <Button
            sx={{ backgroundColor: "#EB4345", textTransform: "none" }}
            variant="contained"
            onClick={handleClose}
            endIcon={<CloseIcon />}
          >
            Cancel changes
          </Button>
        </>
      }
    >
      <FormProvider {...methods}>
        <Container>{children}</Container>
      </FormProvider>
    </ModalCC>
  );
};

export default ModalWrapper;

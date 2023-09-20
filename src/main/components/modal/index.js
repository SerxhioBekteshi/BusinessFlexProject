import {
  Box,
  Dialog as DialogModalMui,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ModalCC = (props) => {
  const {
    modalTitle,
    open,
    onClose,
    children,
    actions,
    context,
    dialogWidth,
    shouldHideContentOverflow,
  } = props;

  return (
    <DialogModalMui
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiPaper-root": {
          width: "100%",
          maxWidth: dialogWidth ? dialogWidth : "650px",
          p: [2, 10],
        },
      }}
      aria-describedby="user-view-edit-description"
    >
      <DialogTitle>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              fontSize: "1.5rem !important",
            }}
          >
            {modalTitle}
          </Box>

          <Box
            onClick={onClose}
            sx={{
              "& :hover": { cursor: "pointer" },
            }}
          >
            <CloseIcon />
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent
        sx={{
          overflow: `${shouldHideContentOverflow ? "hidden" : ""}`,
        }}
      >
        {context && (
          <DialogContentText
            variant="body2"
            id="user-view-edit-description"
            sx={{ textAlign: "center", mb: 7 }}
          >
            {context}
          </DialogContentText>
        )}

        {children}
      </DialogContent>

      {actions && (
        <DialogActions sx={{ justifyContent: "end" }}>{actions}</DialogActions>
      )}
    </DialogModalMui>
  );
};

export default ModalCC;

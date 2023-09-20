import { Box, Button } from "@mui/material";
import Search from "./components/search";
import AddIcon from "@mui/icons-material/Add";

const GenericToolbar = (props) => {
  const { showSearch, showCreateButton, value, onChange, onCreateClick } =
    props;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          marginTop: "0.5rem",
          marginBottom: "0.2rem",
          paddingX: "0.5rem",
          paddingTop: "0.5rem",
          mb: 4,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "end", gap: 3 }}>
          {showSearch && <Search value={value} onChange={onChange} />}
          {showCreateButton && (
            <Button
              sx={{
                backgroundColor: "#71CF48",
                color: "white",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "lightblue",
                },
              }}
              onClick={onCreateClick}
              endIcon={<AddIcon />}
            >
              Create
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
};

export default GenericToolbar;

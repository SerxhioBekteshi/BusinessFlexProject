import { Grid, Card, Box, Chip, Table } from "@mui/material";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import { loadJson } from "../../../../main/apis/readJson";
import DoneIcon from "@mui/icons-material/Done";
import TableC from "../../../../main/components/table";
import ModalWrapper from "../../../../main/components/ModalWrapper";
import CategoryDetailsForm from "../../../../main/views/formTemplates/categoryDetails";
import { Alert, AlertTitle, Button } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";

const JobListSite = () => {
  const { id } = useParams();
  const { state } = useLocation();

  const chipRef = useRef(null);

  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState();
  const [model, setModel] = useState(null);
  const [fieldsToExlude] = useState([["categoryId", "id"]]);
  const tableRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadJson("jobs").then((data) => {
      if (data) {
        const idAsNumber = parseInt(id, 10);
        const dataJobSiteNeeded = data.find((job) => job.id === idAsNumber);
        if (dataJobSiteNeeded) {
          loadJson("categories").then((categories) => {
            const categoriesIncluded = categories.filter((category) =>
              dataJobSiteNeeded.categoryIds.includes(category.id)
            );
            if (categoriesIncluded) setCategories(categoriesIncluded);
          });
        }
      }
    });
  }, []);

  const handleDoubleClick = (row) => {
    setModel(row);
  };

  const onCancel = () => {
    setModel(null);
  };

  const getDataFromBelow = (data) => {
    if (tableRef.current) {
      tableRef.current.changeData((prev) => {
        const copyData = [...prev];
        const foundIndex = copyData.findIndex((c) => c.id === data.id);
        if (foundIndex != -1) {
          copyData[foundIndex] = data;
        } else {
          copyData.push({ ...data, id: copyData.length + 1 });
        }
        toast.success(data.id ? "Edited successfully" : "Added successfully", {
          duration: 3000,
        });
        return copyData;
      });
    }
    setModel(null);
  };

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (!chipRef.current) {
  //       return;
  //     }

  //     if (!chipRef.current.contains(event.target)) {
  //       setSelectedCategory(null);
  //     }
  //   };

  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);

  return (
    <Box>
      <Card sx={{ backgroundColor: "grey" }}>
        <Grid container>
          <Grid
            item
            md={3}
            xs={12}
            sx={{
              padding: "1rem",
            }}
          >
            <Box
              sx={{
                borderRadius: "1rem",
                padding: "1rem",
                backgroundColor: "white",
              }}
            >
              <Box>{state && state.name}</Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  marginBlock: "1rem",
                  justifyContent: "center",
                }}
              >
                {categories && categories.length != 0 ? (
                  <>
                    {categories.map((category) => {
                      return (
                        <Chip
                          key={category.id}
                          ref={chipRef}
                          label={category.text}
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            backgroundColor:
                              selectedCategory === category.id ? "#67AA3C" : "",
                            "&:hover": {
                              backgroundColor:
                                selectedCategory === category.id
                                  ? "#67AA3C"
                                  : "",
                            },
                          }}
                          onClick={() => setSelectedCategory(category.id)}
                          deleteIcon={
                            selectedCategory ? <CloseIcon /> : <DoneIcon />
                          }
                          onDelete={() => setSelectedCategory(null)}
                        />
                      );
                    })}
                  </>
                ) : (
                  <>
                    <Alert severity="warning">
                      No categories for this joblist (because i load the data
                      from json here and the new object is stored in the state)
                    </Alert>
                  </>
                )}
              </Box>

              <Box>
                <Button
                  size="small"
                  variant="contained"
                  endIcon={<KeyboardBackspaceIcon />}
                  sx={{ textTransform: "none" }}
                  onClick={() => navigate(-1)}
                >
                  Go back
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            md={9}
            xs={12}
            sx={{
              padding: "1rem",
            }}
          >
            <Box
              sx={{
                borderRadius: "1rem",
                padding: "1rem",
                backgroundColor: "white",
              }}
            >
              {" "}
              <Box>Data grid</Box>
              {selectedCategory ? (
                <>
                  <TableC
                    ref={tableRef}
                    filename="categoryDetails"
                    showCreateButton={false}
                    filterFieldValue={selectedCategory}
                    filterField="categoryId"
                    fieldsToExclude={fieldsToExlude}
                    handleDoubleClick={handleDoubleClick}
                  />
                </>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "2rem",
                    justifyContent: "center",
                  }}
                >
                  <Alert severity="warning">
                    <AlertTitle>Warning</AlertTitle>
                    No service selected —{" "}
                    <strong>Select a service to proceed!</strong>
                  </Alert>
                </Box>
              )}
              {model && (
                <ModalWrapper
                  model={model}
                  title="Edit category details"
                  controller="categoryDetails"
                  onCancel={onCancel}
                  passDataAbove={(data) => {
                    console.log("te dhena", data);
                    getDataFromBelow(data);
                  }}
                >
                  <CategoryDetailsForm model={model} />
                </ModalWrapper>
              )}
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default JobListSite;

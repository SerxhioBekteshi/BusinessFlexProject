import * as React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { loadJson } from "../../apis/readJson";
import eStatusEnum from "../../enums/eStatusEnum";
import { Box, Link, Alert, CircularProgress } from "@mui/material";
import GenericToolbar from "../GenericToolbar";
import { Link as LinkReact, json } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { useImperativeHandle } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  // "&:last-child td, &:last-child th": {
  //   border: 0,
  // },
}));

const TableC = React.forwardRef((props, ref) => {
  const [jsonData, setJsonData] = useState(null);
  const [columns, setColumns] = useState([]);
  const [keys, setKeys] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  // const navigate = useNavigate();
  const [dataLoading, setDataLoading] = useState(true);

  const {
    fieldToRedirect = "name",
    onCreateClick,
    setHeaderData,
    filterFieldValue,
    filterField,
    fieldsToExclude,
    showSearch = true,
    showCreateButton = true,
    handleDoubleClick,
  } = props;

  useImperativeHandle(
    ref,
    () => {
      return {
        data: jsonData,
        changeData: setJsonData,
      };
    },
    [jsonData, setJsonData]
  );
  useEffect(() => {
    console.log("changedData", jsonData);
  }, [jsonData]);

  const loadData = () => {
    loadJson(props.filename).then((data) => {
      if (data) {
        if (filterFieldValue && filterField) {
          const filteredData = data.filter(
            (item) => item[`${filterField}`] === filterFieldValue
          );
          if (filteredData) {
            setJsonData(filteredData);
          } else {
            setJsonData(data);
          }
        } else {
          setJsonData(data);
        }

        setDataLoading(false);
        if (setHeaderData) {
          setHeaderData(data);
        }

        getColumns(data);
      }
    });
  };

  useEffect(() => {
    loadData();
  }, [props.filename, fieldsToExclude, filterFieldValue, filterField]);

  const formatColumnName = (inputString) => {
    const words = inputString.split(/(?=[A-Z])/);
    const formattedString = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return formattedString;
  };

  const getColumns = (jsData) => {
    if (jsData) {
      let col = Object.keys(jsData[0]);
      if (fieldsToExclude) {
        if (fieldsToExclude.includes("id")) {
          const id = jsData[0].id;
          delete jsData[0].id;
          col = Object.keys(jsData[0]);
          jsData[0].id = id;
        }

        const fieldsToExcludeWithoutId = fieldsToExclude.filter(
          (item) => item !== "id"
        );
        col = col.filter((item) => !fieldsToExcludeWithoutId.includes(item));
      }

      const formattedColumns = col.map((c) => formatColumnName(c));
      setColumns(formattedColumns);
      setKeys(col);
    }
  };

  useEffect(() => {
    if (jsonData) {
      const filteredData = jsonData.filter((item) => {
        return Object.values(item).some((prop) => {
          if (typeof prop === "string") {
            return prop.toLowerCase().includes(searchValue);
          }
          return false;
        });
      });
      if (filteredData) {
        setJsonData(filteredData);
      }

      if (searchValue === "") {
        loadData();
      }
    }
  }, [searchValue]);

  const renderStatusDesign = (value) => {
    switch (value) {
      case eStatusEnum.Completed:
        return (
          <>
            <Box
              sx={{
                backgroundColor: "#7AC14D",
                width: "82px",
                height: "22px",
                paddingInline: "0.5rem",
                paddingBlock: "0.3rem",
                color: "white",
                borderRadius: "1rem",
                textAlign: "center",
              }}
            >
              {value}
            </Box>
          </>
        );

      case eStatusEnum.InProgress:
        return (
          <>
            <Box
              sx={{
                backgroundColor: "#ECDE7C",
                width: "82px",
                height: "22px",
                paddingInline: "0.5rem",
                textAlign: "center",
                paddingBlock: "0.3rem",
                color: "white",
                borderRadius: "1rem",
              }}
            >
              {value}
            </Box>
          </>
        );

      case eStatusEnum.OnHold:
        return (
          <>
            <Box
              sx={{
                backgroundColor: "#FE4C4A",
                width: "82px",
                height: "22px",
                paddingInline: "0.5rem",
                paddingBlock: "0.3rem",
                color: "white",
                borderRadius: "1rem",
                textAlign: "center",
              }}
            >
              {value}
            </Box>
          </>
        );

      default:
        return <>STH WRONG</>;
    }
  };

  const renderFieldAsLink = (value, id) => {
    return (
      // <Typography onClick={() => navigate(`/${props.filename}/${id}`)}>
      //   {" "}
      //   {value}{" "}
      // </Typography>
      <LinkReact
        to={`/${props.filename}/${id}`}
        state={{ name: value }}
        passHref
      >
        <Link rel="noopener noreferrer" target="_blank">
          {value}
        </Link>
      </LinkReact>
    );
  };
  const renderColumns = () => {
    return columns.map((column, index) => {
      return (
        <>
          <StyledTableCell key={index}>{column}</StyledTableCell>
        </>
      );
    });
  };
  const renderRows = () => {
    return jsonData.map((row, index) => {
      return (
        <StyledTableRow key={`${row.id}${index}`}>
          {keys &&
            keys.map((key) => {
              if (key === "status") {
                return (
                  <StyledTableCell
                    key={`${row[key]}${row.id}${index}`}
                    component="th"
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                    scope="row"
                    onDoubleClick={() => {
                      if (handleDoubleClick) {
                        handleDoubleClick(row);
                      }
                    }}
                  >
                    {renderStatusDesign(row[key])}
                  </StyledTableCell>
                );
              }

              if (key === fieldToRedirect) {
                return (
                  <StyledTableCell
                    key={`${row[key]}${row.id}${index}`}
                    component="th"
                    scope="row"
                    sx={{
                      "&:hover": {
                        cursor: "pointer", // Add cursor pointer on hover
                      },
                    }}
                    onDoubleClick={() => {
                      if (handleDoubleClick) {
                        handleDoubleClick(row);
                      }
                    }}
                  >
                    {renderFieldAsLink(row[key], row.id)}
                  </StyledTableCell>
                );
              }
              return (
                <StyledTableCell
                  onDoubleClick={() => {
                    if (handleDoubleClick) {
                      handleDoubleClick(row);
                    }
                  }}
                  key={`${row[key]}${row.id}${index}`}
                  component="th"
                  scope="row"
                  sx={{
                    "&:hover": {
                      cursor: "pointer", // Add cursor pointer on hover
                    },
                  }}
                >
                  {row[key]}
                </StyledTableCell>
              );
            })}
        </StyledTableRow>
      );
    });
  };

  return (
    <>
      <Box sx={{ position: "relative" }}>
        <GenericToolbar
          showSearch={showSearch}
          onCreateClick={onCreateClick}
          showCreateButton={showCreateButton}
          value={searchValue}
          onChange={(value) => {
            setTimeout(() => {
              //wait 1 sec after searching
              setSearchValue(value);
            }, 1000);
          }}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>{renderColumns()}</TableRow>
            </TableHead>
            <TableBody>
              {jsonData && jsonData.length > 0 ? (
                <>
                  {!dataLoading ? (
                    <>{renderRows()}</>
                  ) : (
                    <TableRow
                      sx={{
                        height: 100,
                      }}
                    >
                      <TableCell
                        sx={{
                          position: "absolute",
                          left: 0,
                          right: 0,
                          marginTop: 4,
                          textAlign: "center",
                          border: "none",
                        }}
                      >
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ) : (
                <TableRow
                  sx={{
                    height: 100,
                  }}
                >
                  <TableCell
                    sx={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      marginTop: 4,
                      textAlign: "center",
                      border: "none",
                    }}
                  >
                    <Alert
                      severity="warning"
                      sx={{ width: "fit-content", margin: " auto" }}
                    >
                      No data available
                    </Alert>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
});

export default TableC;

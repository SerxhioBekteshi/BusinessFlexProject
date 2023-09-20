import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

import "./styles.css";
import eStatusEnum from "../../enums/eStatusEnum";

const Header = (props) => {
  const { headerData } = props;

  const [statuses, setStatuses] = useState({
    completed: 0,
    onHold: 0,
    inProgress: 0,
  });

  const theme = useTheme(); //we can either use theme breakpoints
  const isScreenSmall = useMediaQuery("(max-width:900px)");

  useEffect(() => {
    const countStatus = () => {
      const counts = {
        onHold: 0,
        inProgress: 0,
        completed: 0,
      };

      if (headerData) {
        headerData.forEach((item) => {
          switch (item.status) {
            case eStatusEnum.OnHold:
              counts.onHold++;
              break;
            case eStatusEnum.InProgress:
              counts.inProgress++;
              break;
            case eStatusEnum.Completed:
              counts.completed++;
              break;
            default:
              break;
          }
        });
      }

      return counts;
    };

    // Update the status counts in the state
    setStatuses(countStatus());
  }, [headerData]);

  return (
    headerData && (
      <Card
        sx={{
          padding: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid container>
          <Grid
            item
            md={4}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: isScreenSmall ? "1rem" : "", // Add margin-bottom on small screens
            }}
          >
            <Box
              sx={{
                backgroundColor: "#ECDE7C",
              }}
              className="columnStyle"
            >
              {statuses && statuses.inProgress} in Progress
            </Box>
          </Grid>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: isScreenSmall ? "1rem" : "", // Add margin-bottom on small screens
            }}
            item
            md={4}
            xs={12}
          >
            <Box
              sx={{
                backgroundColor: "#7AC14D",
              }}
              className="columnStyle"
            >
              {statuses && statuses.completed} Completed on Road
            </Box>
          </Grid>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: isScreenSmall ? "1rem" : "", // Add margin-bottom on small screens
            }}
            item
            md={4}
            xs={12}
          >
            <Box
              sx={{
                backgroundColor: "#FE4C4A",
              }}
              className="columnStyle"
            >
              {statuses && statuses.onHold} on Hold
            </Box>
          </Grid>
        </Grid>
      </Card>
    )
  );
};

export default Header;

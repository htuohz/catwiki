import { Grid, Rating } from "@mui/material";
import React from "react";

export default function BreedChart({ ratingMap }) {
  return (
    <>
      {Object.keys(ratingMap).map((item) => (
        <Grid container>
          <Grid item xs={4}>
            <strong>{item}</strong>
          </Grid>
          <Grid item xs={8}>
            <Rating name="read-only" value={ratingMap[item]} readOnly />
          </Grid>
        </Grid>
      ))}
    </>
  );
}

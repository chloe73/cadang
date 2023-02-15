import React, { useEffect, useState } from "react"
import { Paper, Box, Grid, Card } from "@mui/material"
import Typography from "@mui/joy/Typography"
import CardMedia from "@mui/material/CardMedia"
import questionMark from "../assets/question_mark.png"
import loading from "../assets/loading.png"
import loadinggif from "../assets/loadinggif.gif"

export default function LoadingPage() {
  return (
    <div>
      {/* <Grid container sx={{ mt: 23 }}>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <CardMedia
            component="img"
            sx={{ width: 150 }}
            image={questionMark}
            alt="questionMark"
          />
        </Grid>
      </Grid> */}
      <Grid container sx={{ mt: 12 }}>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <img src={loadinggif} alt="loading" style={{ width: "300px" }} />
        </Grid>
      </Grid>

      <Grid container sx={{ ml: 3 }}>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <CardMedia
            component="img"
            sx={{ width: 300 }}
            image={loading}
            alt="loading"
            style={{
              position: "absolute",
              bottom: "300px",
            }}
          />
        </Grid>
      </Grid>
    </div>
  )
}

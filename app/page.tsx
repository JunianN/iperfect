'use client'

import React, { useState } from "react";
import { Box, Typography, Toolbar } from "@mui/material";
import CodeEditor from "./components/AceEditor";
import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <Box>
      <Toolbar/>
      <Typography>This is the homepage.</Typography>
    </Box>
  )
}
import React from "react";
import { Grid, Paper, Box } from "@mui/material"

interface Props {
    children : React.ReactNode;
    wideSize? : number ; 
    smallSize? : number;
}

export default function GeneratorContainerItem(props : Props){
    return (
        <Grid 
            item
            xs={props.smallSize || 12 } 
            sm={props.wideSize || 6}
        >
            <Paper
                elevation={12}
                sx={{
                    width: "100%",
                    height: "100%",
                    maxHeight: "500px",
                    minHeight: "500px",
                    overflow: "scroll"
                }}
            >

                <Box

                    sx={{
                        margin: "10px"
                    }}
                >
                    {props.children}
                </Box>
            </Paper>
        </Grid>
    );
}
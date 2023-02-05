
import React, { useEffect, useState } from "react"
import {Paper, Box, Container, Grid, Button, Divider } from "@mui/material"
import * as Generator from "../../components/Generator.js"
import { BiRotateRight, BiDownload } from "react-icons/bi/index.js"
import { url } from "../../../config.js"


export default function NameGenerator( ){
    const [ nameGenerators, setNameGenerators] = React.useState<string[]>([])
    const [ nameGenerator, setNameGenerator] = React.useState<string>("");
    const [generated, setGenerated] = React.useState<string[]>([]);
    
    async function getNameGenerators(){
        const data = await fetch(`${url}/api/names`);
        const json = await data.json();
        return json;
    }
    
    async function generateNames(){
        const data = await fetch(`${url}/api/create/names`, {
            method : "POST",
            headers : {
                "Content-Type" : "Application/Json",
                Accept : "Application/json"
            },
            body : JSON.stringify({
                nameGenerator : nameGenerator
            })
        });

        const json = await data.json();
        return json;
    }

    useEffect( () => {
        const loadNameGenerators = async () => {
            const result = await getNameGenerators();

            if ( Array.isArray(result.nameGenerators)){
                setNameGenerators(result.nameGenerators)
                
                if (result.nameGenerators.length > 0){
                    setNameGenerator(result.nameGenerators[0]);
                }
            }
        }

        loadNameGenerators();

    }, [])

    console.log(generated);

    return (
    <>
        <Container
        >
            <p>
                <span>Generate a unique character name with different name generators!</span>
            </p>

            <Box
                sx={{
                    paddingBottom: "40px"
                }}
            >

                <Generator.Header name="Name Generator"/>
                <Generator.Container>
                    <Generator.ContainerItem wideSize={12}>
                        <Generator.ConfigList
                            Generator={{
                                onEdit : (value) => {setNameGenerator(value)},
                                values: nameGenerators,
                                value : nameGenerator
                            }}
                        />

                        <Divider variant="middle"/>

                        <Container 
                            sx={{
                                textAlign : "Center"
                            }}
                        >
                            { generated.map( (name, index) => (
                                <p key={name+index}>{name}</p>
                            ))}
                        </Container>

                    </Generator.ContainerItem>
                </Generator.Container>
                <Generator.Footer>

                    {/* SAVE HTML */}
                    <Grid container spacing={2}>

                        { /* SAVE JSON */}
                        <Grid item>
                            <Button variant="contained"
                            >
                                <BiDownload
                                    style={{
                                        marginTop : "0",
                                        width : "100%",
                                        height : "20px"
                                    }}
                                />
                                Save
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Button 
                            variant="contained"
                            onClick={ async () => {
                                const generated = await generateNames();
                                setGenerated(generated.names);
                            }}
                         >
                            <BiRotateRight
                                style={{
                                    marginTop : "0",
                                    width : "100%",
                                    height : "20px"
                                }}
                            />
                            ALL
                        </Button>
                    </Grid>
                </Generator.Footer>
            </Box>

        </Container>
    </>
    )

}
import {
  Autocomplete,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { breeds } from "../consts/consts";
import debounce from 'lodash.debounce';
import { fetchSuggestionsByQuery } from "../apis/apis";
import { useNavigate } from "react-router-dom";

export default function Home({theme}) {
  const [breedsSuggestions, setBreedsSuggestions] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  useEffect(()=>{ 
    if(!query){
      return;
    }
    fetchSuggestionsByQuery(query)
      .then(res=>res.json())
      .then(data=>setBreedsSuggestions(data.map(item=>({value:item.id,label:item.name}))))
  },[query])

  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  }

  const debouncedHandleQueryChange = debounce(handleQueryChange, 500);

  const handleSelectBreed = (event,obj) => {
    console.log(obj.value)
    navigate(`/breedDetails/${obj.value}`)
  }
  return (
    <Container>
      <Grid
        Container
        borderRadius="10px 10px 0 0"
        bgcolor="#F5E8C7"
        marginTop={2}
        padding={5}
        style={{backgroundImage:`url(https://images.pexels.com/photos/37337/cat-silhouette-cats-silhouette-cat-s-eyes.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,backgroundPosition:"center",backgroundSize:"cover",color:"white"}}
      >
        <Grid item xs={12} sm={5} marginLeft={3} paddingTop={2} maxWidth={400}>
          <Typography variant="h4">Cat Wiki</Typography>
          <Typography>Get to know more about your cat breed</Typography>
          <Autocomplete
            disableClearable
            options={breedsSuggestions}
            role="list"
            onChange={handleSelectBreed}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search input"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
                placeholder="search"
                onChange={debouncedHandleQueryChange}
              />
            )}
            sx={{
                '& input': {
                  bgcolor: 'background.paper',
                  color: (theme) =>
                    theme.palette.getContrastText(theme.palette.background.paper),
                },
              }}
          />
        </Grid>
      </Grid>
      <Grid
        Container
        borderRadius="0 0 10px 10px"
        bgcolor="#F5E8C7"
        padding={5}
      >
        <Grid item xs={12} sm={6} marginLeft={3} marginTop={2}>
          <Typography variant="h3">Photos</Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

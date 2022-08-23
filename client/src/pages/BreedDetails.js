import {
  Autocomplete,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { breeds } from "../consts/consts";
import debounce from "lodash.debounce";
import { fetchSuggestionsByQuery } from "../apis/apis";
import { useParams } from "react-router-dom";
import { Box } from "@mui/system";
import BreedChart from "../components/BreedChart";

const TEST_BREED = {
  weight: { imperial: "7  -  10", metric: "3 - 5" },
  id: "abys",
  name: "Abyssinian",
  cfa_url: "http://cfa.org/Breeds/BreedsAB/Abyssinian.aspx",
  vetstreet_url: "http://www.vetstreet.com/cats/abyssinian",
  vcahospitals_url:
    "https://vcahospitals.com/know-your-pet/cat-breeds/abyssinian",
  temperament: "Active, Energetic, Independent, Intelligent, Gentle",
  origin: "Egypt",
  country_codes: "EG",
  country_code: "EG",
  description:
    "The Abyssinian is easy to care for, and a joy to have in your home. They’re affectionate cats and love both people and other animals.",
  life_span: "14 - 15",
  indoor: 0,
  lap: 1,
  alt_names: "",
  adaptability: 5,
  affection_level: 5,
  child_friendly: 3,
  dog_friendly: 4,
  energy_level: 5,
  grooming: 1,
  health_issues: 2,
  intelligence: 5,
  shedding_level: 2,
  social_needs: 5,
  stranger_friendly: 5,
  vocalisation: 1,
  experimental: 0,
  hairless: 0,
  image: {
    id: "0XYvRd7oD",
    width: 1204,
    height: 1445,
    url: "https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg",
  },
};

export default function BreedDetails() {
  const [breed, setBreed] = useState({});
  const { id } = useParams();
  useEffect(() => {
    setBreed(TEST_BREED);
  }, []);

  return (
    <Container>
      {Object.keys(breed).length > 0 && (
        <>
          <Grid container padding={4}>
            <Grid item xs={12} md={4}>
              <Box
                component="img"
                sx={{
                  maxHeight: 300,
                  maxWidth: 400,
                  borderRadius: 5,
                }}
                alt="The house from the offer."
                src={breed.image.url}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography fontWeight={600} variant="h5">
                {breed.name}
              </Typography>
              <Typography>{breed.description}</Typography>
              <br />
              <Typography>
                <strong>Temperament: </strong>
                {breed.temperament}
              </Typography>
              <br />
              <Typography>
                <strong>Origin: </strong>
                {breed.origin}
              </Typography>
              <br />
              <Typography>
                <strong>Lifespan: </strong>
                {breed.life_span}
              </Typography>
              <br />
              <BreedChart
                ratingMap={{
                  Adaptability: breed.adaptability,
                  "Affection Level": breed.affection_level,
                  "Child Friendly": breed.child_friendly,
                  Grooming: breed.grooming,
                  Intelligence:breed.intelligence,
                  "Health Issues": breed.health_issues,
                  "Social Needs": breed.social_needs,
                  "Stranger Friendly": breed.stranger_friendly
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {/* {.map((_, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Item>xs=2</Item>
          </Grid>
        ))} */}
          </Grid>
        </>
      )}
    </Container>
  );
}

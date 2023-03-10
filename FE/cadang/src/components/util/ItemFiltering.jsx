import React, { useState, useEffect } from "react";
import MenuListItem from "./MenuListItem";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { Paper, Grid, Divider, Card, List } from "@mui/material";

function ItemFiltering(props) {
  const ListData = props.menu;
  // console.log("ListData", ListData.drinkableDrinks)
  const [filter, setFilter] = useState(true);
  const [sortType, setSortType] = useState("caffeine");
  // console.log(sortType)
  const [next, setNext] = useState(false);

  const [showData, setShowData] = useState([]);
  function onClickFilter() {
    if (filter === false) {
      setShowData(() => ListData.drinkableDrinks);
      setFilter(() => true);
    } else if (filter === true) {
      setShowData(() => ListData.allDrinks);
      setFilter(() => false);
    }
  }
  /* eslint-disable */
  useEffect(() => {
    if (filter === false) {
      setShowData(() => ListData.drinkableDrinks);
      setFilter(() => true);
    } else if (filter === true) {
      setShowData(() => ListData.allDrinks);
      setFilter(() => false);
    }
  }, [ListData.drinkableDrinks]);

  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        caffeine: "caffeine",
        sugar: "sugar",
        cal: "cal",
        price: "price",
        cnt: "cnt",
      };
      const sortProperty = types[type];
      const sorted = [...showData].sort((a, b) => a[sortProperty] - b[sortProperty]);
      const reverseSorted = [...showData].sort((a, b) => b[sortProperty] - a[sortProperty]);
      // console.log(sorted)
      // console.log(type)
      if (type === types.cnt) {
        setShowData(reverseSorted);
      } else {
        setShowData(sorted);
      }
    };

    sortArray(sortType);
  }, [sortType, filter]);

  return (
    <Card>
      <Grid container sx={{ display: "flex" }} justifyContent="end" alignItems="center">
        <Grid item>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="?????? ????????? ??????"
            labelPlacement="end"
            margin="0"
            onClick={onClickFilter}
            color="secondary"
          />

          <FormControl size="small" sx={{ paddingTop: 1 }}>
            <NativeSelect defaultValue="caffeine" onChange={(e) => setSortType(e.target.value)}>
              <option value="caffeine">?????? ????????????</option>
              <option value="sugar">?????? ??????</option>
              <option value="cal">?????? ????????????</option>
              <option value="price">?????? ?????????</option>
              <option value="cnt">?????? ?????????</option>
            </NativeSelect>
          </FormControl>
        </Grid>
        <Grid item>
          <MenuListItem
            data={showData}
            getSelectedDrink={props.getSelectedDrink}
            setNext={setNext}
          />
        </Grid>
      </Grid>
    </Card>
  );
}

const menuData = [
  { pk: 1, name: "????????????", caffeine: 300, sugar: 10, cal: 200, price: 3000 },
  {
    pk: 2,
    name: "????????? ??????",
    caffeine: 200,
    sugar: 20,
    cal: 300,
    price: 5000,
  },
  {
    pk: 3,
    name: "????????? ???????????????",
    caffeine: 100,
    sugar: 30,
    cal: 100,
    price: 4500,
  },
];

export default ItemFiltering;

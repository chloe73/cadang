import * as React from "react";
import PropTypes from "prop-types";
// import SwipeableViews from "react-swipeable-views-react-18-fix";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// import { useTheme } from '@mui/material/styles';
import { Paper, Card, CardHeader } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import sugar from "../assets/sugar.png";
import caffeine from "../assets/caffeine.png";

// 정보 박스
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Divider from "@mui/material/Divider";

import WeeklyReportChart from "./WeeklyReportChart";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function WeeklyReportData() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="full width tabs example"
        variant="fullWidth"
      >
        {/* 이미지 크기 제한 어케 하징......... */}
        <Tab
          icon={<img width="15%" src={caffeine} alt="sugar" />}
          iconPosition="start"
          label="카페인"
          {...a11yProps(0)}
        />
        <Tab
          icon={<img width="15%" src={sugar} alt="sugar" />}
          iconPosition="start"
          label="당"
          {...a11yProps(1)}
        />
      </Tabs>
      {/* theme이 react 18에 지원 안해서 사용이 안됨(슬라이드) */}
      {/* <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChange}
      > */}
      <TabPanel value={value} index={0}>
        <WeeklyReportChart />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <WeeklyReportChart />
      </TabPanel>
      {/* </SwipeableViews> */}

      <Box width="85%" margin="auto">
        <Paper elevation={1} style={{ backgroundColor: "#E5E0FF" }}>
          <Typography variant="h6" gutterBottom>
            오늘 섭취량 |<ListItemDecorator>☕</ListItemDecorator> 250mg
            <ListItemDecorator>🧂</ListItemDecorator> 54g
          </Typography>
        </Paper>

        <Paper variant="outlined" style={{ backgroundColor: "#FFF2F2" }}>
          <Typography varient="body1">
            지난주 대비 어쩌구 저쩌궁 \n 이러쿵 저러쿵쿵쿵
          </Typography>
        </Paper>
        <br />
        <Paper elevation={1} style={{ backgroundColor: "#E5E0FF" }}>
          <Typography variant="h6" gutterBottom>
            이번주 총 섭취량 |<ListItemDecorator>☕</ListItemDecorator> 1625mg
            <ListItemDecorator>🧂</ListItemDecorator> 420g
          </Typography>
        </Paper>

        <Paper variant="outlined" style={{ backgroundColor: "#FFF2F2" }}>
          <Typography varient="body1">
            지난주 대비 어쩌구 저쩌궁 \n 이러쿵 저러쿵쿵쿵
          </Typography>
        </Paper>
      </Box>
      <br />
    </Paper>
  );
}

export default WeeklyReportData;
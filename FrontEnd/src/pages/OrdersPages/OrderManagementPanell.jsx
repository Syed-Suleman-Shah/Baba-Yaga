import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
 import {OrderList} from "../../components/OrderComponents/OrderList"

 const OrderManagementPanell = () => {
  const [tab, setTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box>
      <Tabs value={tab} onChange={handleTabChange}>
        <Tab label="Reports" />
      </Tabs>
      {tab === 0 && <OrderList/>}
    </Box>
  );
};
export default OrderManagementPanell;

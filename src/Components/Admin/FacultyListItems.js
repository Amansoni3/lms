import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';

import Createset from './Createset';
import Question from './questions';

export default function FacultyListitems(props)
{
  const handleClick=(v)=>{
   props.setView(v)
  }

  return(
  <div>
    <ListItem button onClick={()=>handleClick(<Createset setView={props.setView} />)}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Create Set" />
    </ListItem>
    <ListItem button onClick={()=>handleClick(< Question setView={props.setView} />)}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Add Questions" />
    </ListItem>
    
  </div>
)
}
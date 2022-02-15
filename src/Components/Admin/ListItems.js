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
import Department from './Department';
import Faculty from './Faculty';
import Courses from './Courses';
import Subjects from './Subjects';
import Students from './Students';
import Units from './units';


export default function Listitems(props)
{
  const handleClick=(v)=>{
   props.setView(v)
  }

  return(
  <div>
    
    <ListItem button onClick={()=>handleClick(<Faculty setView={props.setView} />)}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Faculty" />
    </ListItem>

    <ListItem button onClick={()=>handleClick(<Students setView={props.setView} />)}> 
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Students" />
    </ListItem>
        
    <ListItem button onClick={()=>handleClick(<Department setView={props.setView} />)}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Department" />
    </ListItem>

    <ListItem button onClick={()=>handleClick(<Courses setView={props.setView} />)}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Courses" />
    </ListItem>

    <ListItem button onClick={()=>handleClick(<Subjects setView={props.setView} />)}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Subjects" />
    </ListItem>

    <ListItem button onClick={()=>handleClick(<Units setView={props.setView} />)}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Units" />
    </ListItem>
  
  
  </div>
)
}
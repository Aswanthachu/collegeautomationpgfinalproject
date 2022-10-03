import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

export const ListItemContent = ({ Icon,listText,disablePadding }) => {
  return (
      <ListItem disablePadding={disablePadding} >
        <ListItemButton sx={{height:"60px"}}>
          <ListItemIcon>
            <Icon fontSize="large"/>
          </ListItemIcon>
          <ListItemText>
            <Typography variant="p" sx={{fontSize:"20px"}}>{listText}</Typography>
          </ListItemText>
        </ListItemButton>
      </ListItem>
  );
};

import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Dashboard, CastForEducation,VoiceChat,Backup,Error,LibraryBooks,UploadFile,Receipt,AssignmentInd,PersonAdd } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  SideBox: {
    // backgroundColor:"red",
    height: "90%",
    paddingTop: "10%",
  },
}));

const StyledListItem = ({ Icon, Text , link , navigate }) => {
  return (
    <>
      {Text === "DashBoard" ? (
        <ListItemButton
          sx={{
            [`&.MuiListItemButton-root`]: {
              padding: "15px 0 15px 30px",
              color: "black",
            },
            [`&:hover`]: {
              backgroundColor: "#FFFFFF",
            },
            [`&.Mui-selected`]: {
              backgroundColor: "#FFFFFF",
            },
            [`&.Mui-focusVisible`]: {
              backgroundColor: "#FFFFFF",
            },
          }}
          disabled
        >
          <ListItemIcon>{Icon}</ListItemIcon>
          <ListItemText>
            <Typography
              variant="h4"
              sx={{ fontSize: "20px", fontWeight: "bold" }}
            >
              {Text}
            </Typography>
          </ListItemText>
        </ListItemButton>
      ) : (
        <ListItemButton
          sx={{
            [`&.MuiListItemButton-root`]: {
              padding: "15px 0 15px 30px",
              color:"black"
            },
            [`&:hover`]: {
              color: "black !important",
            },
          }}
          onClick={()=>navigate(link)}
        >
          <ListItemIcon>{Icon}</ListItemIcon>
          <ListItemText>
            <Typography variant="p" sx={{ fontSize: "20px" }}>
              {Text}
            </Typography>
          </ListItemText>
        </ListItemButton>
      )}
    </>
  );
};

const teacherLists = [
  [<Dashboard />, "DashBoard"],
  [<CastForEducation sx={{color: "#7962E1"}}/>, "Host Webinar", "/videoconference/join"],
  [<VoiceChat sx={{color: "#7962E1"}}/>, "ChatRoom", "/chatroom"],
  [<Backup sx={{color: "#7962E1"}}/>, "Study Materials", "/upload-study-materials"],
  [<Error sx={{color: "#7962E1"}}/>, "Instructions", "/student-instructions"],
  [<PersonAdd sx={{color: "#7962E1"}}/>,"Add Students","/add-students" ]
];

const studentLists=[
  [<Dashboard />, "DashBoard"],
  [<CastForEducation sx={{color: "#7962E1"}}/>, "Join Webinar", "/videoconference/join"],
  [<VoiceChat sx={{color: "#7962E1"}}/>, "ChatRoom", "/chatroom"],
  [<LibraryBooks sx={{color: "#7962E1"}}/>, "Study Materials", "/upload-study-materials"],
  [<UploadFile sx={{color: "#7962E1"}}/>, "Upload Resume", "/add-resume"],
  [<Receipt sx={{color: "#7962E1"}}/>, "Fee Receipt", "/upload-fee"],
]

const staffLists=[
  [<Dashboard />, "DashBoard"],
  [<CastForEducation sx={{color: "#7962E1"}}/>, "Fee Receipts", "/view-fee"],
  // [<LibraryBooks sx={{color: "#7962E1"}}/>, "View Study Materials", "/view"],
]

const placementLists=[
  [<Dashboard />, "DashBoard"],
  [<AssignmentInd sx={{color: "#7962E1"}}/>, "Interview Details", "/interview"],
  [<LibraryBooks sx={{color: "#7962E1"}}/>, "Placement Page", "/upload-study-materials"],
  
]

const SideBar = ({userType}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <Box variant="permanent" className={classes.SideBox}>
      <List>
      {userType === "teacher" && teacherLists.map((l, index) => (
        <StyledListItem
          key={index}
          Icon={l[0]}
          Text={l[1]}
          link={l[2]}
          navigate={navigate}
        />
      ))}
      {userType === "student" && studentLists.map((l, index) => (
        <StyledListItem
          key={index}
          Icon={l[0]}
          Text={l[1]}
          link={l[2]}
          navigate={navigate}
        />
      ))}
      {userType === "placement" && placementLists.map((l, index) => (
        <StyledListItem
          key={index}
          Icon={l[0]}
          Text={l[1]}
          link={l[2]}
          navigate={navigate}
        />
      ))}
      {userType === "staff" && staffLists.map((l, index) => (
        <StyledListItem
          key={index}
          Icon={l[0]}
          Text={l[1]}
          link={l[2]}
          navigate={navigate}
        />
      ))}
      {/* {userType === "student" && studentLists.map((l, index) => (
        <StyledListItem
          key={index}
          Icon={l[0]}
          Text={l[1]}
          link={l[2]}
          navigate={navigate}
        />
      ))} */}
      </List>
    </Box>
  );
};

export default SideBar;

import {
  DarkMode,
  Groups,
  QuestionAnswer,
  MoreHoriz,
  SaveAs,
  Search,
  Close
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  ButtonBase,
  Paper,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadContacts} from "../../../actions/chat";

// import {useTheme,ThemeProvider} from "@mui/styles";

const useStyle = (theme) => ({
  contactsContainer: {
    padding: "20px 0 20px 10px",
    width: "28%",
    // backgroundColor:"gray",
    borderRadius: "20px 0 0 20px",
    display: "flex",
    borderRight: "2px solid #213156bf",
  },
  sideControlBox: {
    height: "auto",
    width: "13%",
    backgroundColor: "#7962E1",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "5px",
    justifyContent: "space-between",
    positiom: "fixed",
    top: "5px",
    left: "5px",
    right: "5px",
    bottom: "5px",
  },
  toggleAvatars: {
    display: "flex",
    flexDirection: "column",
    height: "17%",
    justifyContent: "space-between",
  },
  toggleButton: {
    width: "45px",
    height: "45px",
    [`&.MuiButtonBase-root:active`]: {
      backgroundColor: "red",
    },
  },
  sideIcons: {
    fontSize: "30px",
  },
  chatUsers: {
    backgroundColor: "inherit",
    boxShadow: "none",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  topControl: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px 0",
    paddingLeft: "10px",
    backgroundColor: "inherit",
    boxShadow: "none",
  },
  topLeft: {
    display: "flex",
    alignItems: "center",
  },
  iconButton: {
    backgroundColor: "#0a0a1357",
    color: "white",
    margin: "0 8px",
    [`&.MuiButtonBase-root:hover,&.MuiButtonBase-root:focus,&.MuiButtonBase-root:active`]:
      {
        backgroundColor: "#0a0a1357",
      },
  },
  username: {
    marginLeft: "10px",
    fontFamily: "poppins",
    color: "#fff",
  },
  search: {
    margin: "20px 5px 20px 0",
    backgroundColor: "#15162559",
    border: "none !important",
    borderRadius: "20px",
    marginLeft: "10px",
    // paddingLeft: "0 !important",
    height: "35px",
    alignItems: "center",
    justifyContent: "center",

    [`& .MuiOutlinedInput-root`]: {
      "& > fieldset": {
        border: "none",
      },
      width: "100%",
      color: "#fff",
      fontFamily: "poppins",
      fontSize: "13px",
      // paddingLeft: "15px",
    },
  },
  searchCloseButton:{
    [`&.MuiButtonBase-root`]:{
      padding:0,
      fontSize:"10px"
    }
  },
  contactButtonBox: {
    width: "100%",
    overflow: "hidden",
    overflowY: "auto",
  },
  contact: {
    width: "100%",
    display: "flex",
    justifyContent: "start",
    padding: "8px 5px 8px 20px",
    [`&.MuiButtonBase-root:hover`]:{
    backgroundColor:"rgba(43,51,85,.568)"
    },
    [`&.&.MuiButtonBase-root:active`]:{
      backgroundColor:"rgba(43,51,85,.568)"
    }
  },
  selectedcontact:{
    [`&.MuiButtonBase-root`]:{
      backgroundColor:"rgba(43,51,85,.568)"
    },
  }
});

const ContactContainer = ({selectedContact,setSelectedContact,loginedUser}) => {
  const styles = useStyle();
  const dispatch = useDispatch();
  const [contacts, setContacts] = useState([]);
  const [search,setSearch]=useState("")

  console.log(search)

  const contact = useSelector((state) => state.chat.contacts? state.chat.contacts:[]);

  useEffect(() => {
    dispatch(loadContacts());
  },[loginedUser,dispatch]);


  useEffect(() => {
    setContacts(contact);
  },[contact]);
   

  const handleSelectContact=(id)=>{
    if(id){
    setSelectedContact(id);
    }
  }

  const handleSearchClose =(e)=>{
    e.preventDefault();
    setSearch("");
  }


  return (
    // <ThemeProvider theme={theme}>
    <Box sx={styles.contactsContainer}>
      <Box sx={styles.sideControlBox}>
        {/* <Paper sx={styles.logoPaper}></Paper> */}
        <Avatar size="large" />
        <div style={styles.toggleAvatars}>
          <ButtonBase sx={styles.toggleButton}>
            <QuestionAnswer sx={styles.sideIcons} />
          </ButtonBase>
          <ButtonBase sx={styles.toggleButton}>
            <Groups sx={styles.sideIcons} />
          </ButtonBase>
        </div>
        <ButtonBase sx={styles.toggleButton}>
          <DarkMode sx={styles.sideIcons} />
        </ButtonBase>
      </Box>
      <Paper sx={styles.chatUsers}>
        <Paper sx={styles.topControl}>
          <div style={styles.topLeft}>
            <Avatar src={loginedUser?.profilepic}>
              {loginedUser?.name
                ? loginedUser?.name?.charAt(0).toUpperCase()
                : loginedUser?.username?.charAt(0).toUpperCase()}
            </Avatar>
            <Typography sx={styles.username}>
              {loginedUser?.name ? loginedUser?.name : loginedUser?.username}
            </Typography>
          </div>
          <div>
            <IconButton sx={styles.iconButton}>
              <MoreHoriz />
            </IconButton>
            <IconButton sx={styles.iconButton}>
              <SaveAs />
            </IconButton>
          </div>
        </Paper>
        <TextField
          sx={styles.search}
          autoComplete="off"
          onChange={(e)=>setSearch(e.target.value)}
          value={search}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ fontSize: "25px", color: "#fff" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  sx={styles.searchCloseButton}
                  // aria-label='toggle password visibility'
                  onClick={handleSearchClose}
                >
                  {search && <Close sx={{color:"#fff"}}/>}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Box sx={styles.contactButtonBox}>
          {contacts.filter(user=>{ return user?.username?.toLowerCase().includes(search) ||user?.name?.toLowerCase().includes(search)}).map((contact) => (
            <ButtonBase key={contact._id} sx={{...(styles.contact),...(selectedContact ===contact._id && styles.selectedcontact)}} onClick={()=>handleSelectContact(contact._id)}>
              <Avatar src={contact.profilepic} alt="">
                {contact?.name
                  ? contact?.name.charAt(0).toUpperCase()
                  : contact?.username.charAt(0).toUpperCase()}
              </Avatar>
              <Typography sx={styles.username}>
                {contact.name || contact.username}
              </Typography>
            </ButtonBase>
          ))}
        </Box>
      </Paper>
    </Box>
    // </ThemeProvider>
  );
};

export default ContactContainer;

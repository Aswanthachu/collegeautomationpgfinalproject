import React,{useState,useEffect} from "react";
import {
  Box,
  Avatar,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import {useSelector} from "react-redux";

const useStyle = (theme) => ({
  mediaContainer: {
    width: "22%",
    height: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
  noUserDescription: {
    display: "flex",
    // backgroundColor:"red",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "12%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  sharedMediaContainer:{ 
    width: "100%",
    height: "68%",
    // overflow:"hidden",
    // overflowY:"auto"
  },
  sharedMedia:{
    backgroundColor:"inherit",
    // backgroundColor:"red",
    maxHeight:"100%",
    boxShadow:"none",
    color:"#fff",
    overflow:"hidden",
    overflowY:"auto" 
  },
  sharedImage:{
    width:"100px",
    height:"100px"
  }
});


const OppentUser = ({selectedContact,messages,active}) => {
  const styles = useStyle();

  const [selectedUserMessage,setSelectedUserMessage] = useState("");
  const [loading, setLoading] = useState(false);
  
  let selected=useSelector(state=>
    state.chat.contacts ? state.chat.contacts.filter(contact=>contact._id === selectedContact) : null
    );
    console.log(selected[0]);
 
  useEffect(() => {
    setSelectedUserMessage(selected[0]);
    setLoading(true);
  }, [selectedContact]);

  return (
    <>
    {loading && 
    <Box sx={styles.mediaContainer}>
      <div style={{ width: "100%", height: "30%" }}>
        <Box sx={styles.noUserDescription}>
          <Avatar sx={{ width: "100px", height: "100px",marginTop:"20px" }} src={selectedUserMessage?.profilepic}><Typography sx={{fontSize:"40px"}}>{(selectedUserMessage?.name &&selectedUserMessage?.name.charAt(0)) || selectedUserMessage?.username.charAt(0)}</Typography></Avatar>
          {active ?
            <Typography sx={{ color: "#44b700", fontWeight: "bold" }}>
              active
            </Typography> :
            <Typography sx={{ color: "red", fontWeight: "bold" }}>
              offline
            </Typography>
          }
          <Typography
            variant="p"
            sx={{fontSize: "15px", fontWeight: "bold", color: "#fff" }}
          >
            {(selectedUserMessage?.name && selectedUserMessage?.name ) || selectedUserMessage?.username }
          </Typography>
        </Box>
      </div>
      <div style={styles.sharedMediaContainer}>
        <Accordion sx={styles.sharedMedia}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
          >
            <Typography>Shared Media</Typography>
          </AccordionSummary>
          <AccordionDetails  >
            
            <Grid container spacing={1} >
              {messages.map(m=>m.message.image !=="" &&
                <Grid xs={6} key={m._id}>
                <img src={m.message.image} alt="" style={styles.sharedImage}/>
                </Grid> 
              )}
            
            </Grid>
            
          </AccordionDetails>
        </Accordion>
      </div>
    </Box>
   }
  </>
  );
};

export default OppentUser;

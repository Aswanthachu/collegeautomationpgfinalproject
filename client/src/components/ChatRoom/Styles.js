
const styles={
    mainContainer:{
        backgroundColor:"#fff",
        height: "100vh",
        padding: 0,
        margin: 0,
        [`&.MuiContainer-root`]: {
          maxWidth: "100vw",
          padding:"20px",
        },
        zIndex: 2,

    },
    mainPaper:{
        margin:0,
        width:"100%",
        height:"100%",
        backgroundColor: "#141b2bf0",
        borderRadius:"20px",
        // padding:"10px",
        display:"flex",

    },
    messageConatiner:{
        margin:0,
        padding:0,
        width:"45%",
        // backgroundColor:"green",
        height:"100%"
    },
    mediaContainer:{
        margin:0,
        padding:0,
        width:"30%",
        // backgroundColor:"blue",
        height:"100%",
        borderRadius:"0 20px 20px 0"
    },
    welcomeBox:{
        height:"100%",
        width:"72%",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
      },
      welcomeImg:{
        width:"80%",
        height:"60%",
      },
      welcomeText:{
        fontSize:"19px",
        color:"white",
        marginTop:"20px",
      }
}


export default styles;


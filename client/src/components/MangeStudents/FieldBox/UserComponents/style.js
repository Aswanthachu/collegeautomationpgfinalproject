import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    mainBox: {
        "&.MuiBox-root": {
            height: "-webkit-fill-available",
            borderRadius: "0 0 4px 0",
            display: "flex",
            position: "relative",
            justifyContent: "center",
            [theme.breakpoints.down('sm')]:{
                alignItems:"flex-start"
            }
        }
    },
    textFieldContainerBox: {
        "&.MuiBox-root": {
            flex: 1.4,
            padding: "3% 5%",
            position: "relative",
            [theme.breakpoints.only('md')]: {
                flex: 1,
            },
            [theme.breakpoints.down('xs')]: {
                display: "flex",
                flexDirection: "column",
                alignItems:"flex-start"
            }
        }
    },
    heading: {
        "&.MuiTypography-root": {
            fontSize: "20px",
            fontFamily: "Poppins",
            color: "#444",
            marginBottom: "10px",
            [theme.breakpoints.down('xs')]: {
                marginBottom: 30
            }
        }
    },
    formControl: {
        marginTop: "5px"
    },
    textFieldLabel: {
        "&.MuiTypography-root": {
            fontFamily: "Poppins",
            marginBottom: "3px"
        }
    },
    textField: {
        "& .MuiOutlinedInput-root": {
            "& > fieldset": {
                width: "150%",
                outlineWidth: 0.2,
                [theme.breakpoints.down('md')]: {
                    width: "130%"
                }
            },
            "&:hover": {
                "& > fieldset": {
                    border: "0.5px solid #666"
                },
            },
            "&:focus-within": {
                "& > fieldset": {
                    border: "1.5px solid #222"
                },
            },
        }
    },
    submitButton: {
        "&.MuiButton-root": {
            marginTop: "50px",
            width: "30%",
            color: "#906EE8",
            fontFamily: "Poppins",
            fontWeight: 600,
            border: "1.5px solid #7962E1",
            "&:hover": {
                border: "2px solid #7962E1"
            },
            [theme.breakpoints.down('md')]: {
                marginTop: "30px",
            },
            [theme.breakpoints.down('sm')]: {
                marginTop: "5%",
            },
            [theme.breakpoints.down('xs')]: {
                marginTop: "10%",
                width: "40%"
            }
        }
    },
    buttonDiv: {
        [theme.breakpoints.down('xs')]: {
            marginTop: "20px",
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
        }
    },
    imageBox: {
        "&.MuiBox-root": {
            flex: 1,
            display: "flex",
            alignItems: "center",

            [theme.breakpoints.down('md')]: {
                flex: 1,
            },
            [theme.breakpoints.down('sm')]: {
                display: "none"
            }
        }
    },
    img: {
        // backgroundSize:"cover",
        // backgroundPosition:"center",
        // maxHeight:""
        [theme.breakpoints.down('md')]: {
            width: "90%",
            height: "90%",
        }
    },
    containerBoxUser: {
        "&.MuiBox-root": {
            height: "100%",
            flex: 1.4,
            padding: "5%",
            dispaly: "flex",
        }
    },
    avatarBox: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    userDetailsBox: {
        display: "flex",
        justifyContent: "space-around",
        marginTop: "5%"
    },
    userAvatar: {
        "&.MuiAvatar-root": {
            width: "75px",
            height: "75px"
        }
    },
    userDetailsName: {
        "&.MuiTypography-root": {
            fontFamily: "Poppins",
            fontWeight: 600,
            marginTop: 12
        }
    },
    colon: {
        display: "flex",
        alignItems: "end",
        fontWeight: 600
    },
    containerBoxUserNot: {
        "&.MuiBox-root": {
            height: "100%",
            width: "100%",
            flex: 1.4,
            // padding: "5%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "10%",
            [theme.breakpoints.down('md')]: {
                paddingTop: 0,
                justifyContent: 'center'
            }
        }
    },
    reportIcon: {
        "&.MuiSvgIcon-root": {
            width: 100,
            height: 100
        }
    },
    reportText: {
        "&.MuiTypography-root": {
            fontFamily: "Poppins",
            fontSize: 25,
            marginTop: 10
        }
    },
    dropDownBox: {
        display: "flex",
        marginTop: 10,
        [theme.breakpoints.down("md")]: {
            flexDirection: "column"
        }
    },
    reactImage: {
        width: "80%",
        height: "80%",
        position: "absolute",
    },
    streamSelect: {
        "&.MuiInputBase-root": {
            height: 40,
            "&:hover": {
                "& > fieldset": {
                    border: "0.5px solid #666"
                }
            },
            "&:focus-within": {
                "& > fieldset": {
                    border: "0.5px solid #666"
                }
            }
        },
        [theme.breakpoints.up("md")]: {
            minWidth: 135,
        },
        [theme.breakpoints.only("md")]: {
            width: "50%"
        },
        [theme.breakpoints.down('sm')]: {
            width: 150
        }
    },
    deskTopDatePicker: {
        marginLeft: 20,
        "& .MuiInputBase-root": {
            minWidth: 150,
            height: 40,
            "&:hover": {
                "& > fieldset": {
                    border: "0.5px solid #666"
                }
            },
            "&:focus-within": {
                "& > fieldset": {
                    border: "0.5px solid #666"
                }
            },
            "&:focus": {
                "& > fieldset": {
                    border: "0.5px solid #666"
                }
            },
        }
    },
    datePickerDiv: {
        display: "flex",
        justifyContent: "flex-start",
        [theme.breakpoints.down("md")]: {
            marginTop: 15,
            maxWidth:"60%"
        },
        [theme.breakpoints.only('sm')]: {
            maxWidth: "90%",
        },
        [theme.breakpoints.down('xs')]: {
            display: "none"
        },
        [theme.breakpoints.up('md')]:{
            maxWidth:"70%"
        }
    },
    datePickerDivMobile: {
        display: "none",
        justifyContent: "flex-start",
        marginTop: 15,
        [theme.breakpoints.down('sm')]: {
            width: "65%",
        },
        [theme.breakpoints.down('xs')]: {
            display: "flex"
        }
    },
    firstDatePicker: {
        "&.MuiFormControl-root": {
            marginLeft: 15,
            [theme.breakpoints.down("md")]: {
                marginLeft: 0,
            }
        }
    },
    secondDatePicker:{
        "&.MuiFormControl-root": {
        marginLeft:2,
        [theme.breakpoints.down('sm')]:{
            marginLeft:20
        },
        [theme.breakpoints.up('md')]:{
            marginLeft:60
        },
        [theme.breakpoints.up('lg')]:{
            marginLeft:5
        }
    }
    }
}));

export default useStyles;
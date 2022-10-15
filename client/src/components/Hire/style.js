import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    styledMainContainer: {
        backgroundColor: "#fff",
        height: "100vh",
        padding: 0,
        margin: 0,
        [`&.MuiContainer-root`]: {
            maxWidth: "100vw",
            padding: 0,
            display: "flex",
            flexDirection:"column"
        },
        zIndex: 2,
        overflowY: "auto"
    },

}))

export default useStyles;
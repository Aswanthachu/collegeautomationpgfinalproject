import React, { useState,useEffect,useCallback } from 'react';
import { Container, Typography, Avatar, Stack, TextareaAutosize, TextField, FormLabel, Button, Alert, Snackbar } from "@mui/material";
import ChipInput from 'material-ui-chip-input';
import { useDispatch, useSelector } from "react-redux";

import { useStyles } from './style';

import user from "../../images/user.svg";
import ResumeUploader from './ResumeUploader/ResumeUploader';

import { resumeUpload,getResumeData } from '../../actions/resume';
import {claerMessage} from "../../features/resume";

const AddResume = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [pdfFile, setPdfFile] = useState("");
    const [pdfSelectionError, setPdfSelectionError] = useState("");
    const [chips, setChips] = useState([]);
    const [data, setData] = useState({
        phone: "",
        email: "",
        bio: "",
        address: "",
        linkedin: "",
        github: "",
        position: "",
    });
    const [errorMessage, setErrorMessage] = useState();
    const [open, setOpen] = useState(false);
    // const [dataFromRedux,setDataFromRedux]=useState({});

    const successMessage = useSelector(state => state.resume.message);
    const dataFromStore=useSelector(state=>state.resume.resumeData ? state.resume.resumeData : null);

    console.log(dataFromStore);
    // console.log(errorMessage);
    useEffect(() => {
        if(successMessage) setOpen(true);
        setTimeout(() => dispatch(claerMessage()),3500);
    }, [successMessage,dispatch]);

    // const loginedUser=localStorage.getItem('user')?true:false;
    useEffect(()=>{
        dispatch(getResumeData());
    },[])

    useEffect(() => {
        if(dataFromStore){
            setData({
                phone: dataFromStore.phone,
                email: dataFromStore.email,
                bio: dataFromStore.bio,
                address: dataFromStore.address,
                linkedin: dataFromStore.linkedin,
                github: dataFromStore.github,
                position: dataFromStore.position,
            });
            setChips(dataFromStore.skills);
        }
    },[dataFromStore])
    
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    const handleAddChip = (chip) => {
        if (chips.length < 8)
            setChips([...chips, chip]);
    };

    const handleDeleteChip = (chip) => {
        setChips(chips.filter((c) => c !== chip));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(resumeUpload({ resumeData: { ...data, skills: chips, resume: pdfFile }, setErrorMessage }));
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Container className={classes.styledMainContainer}>
            <div className={classes.styledContainer}>
                <div className={classes.ResumeTop}>
                    <Avatar src={JSON.parse(localStorage.getItem('user')).profilepic || user} className={classes.avatar}></Avatar>
                    <Typography className={classes.name}>
                        {JSON.parse(localStorage.getItem('user')).name || JSON.parse(localStorage.getItem('user')).username}
                    </Typography>
                </div>
                <form className={classes.resumeBottom} autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
                    <Stack direction="column" spacing={2} className={classes.bottomStack}>
                        <div className={classes.FormControl}>
                            <FormLabel className={classes.formLabel}>
                                Phone :
                            </FormLabel>
                            <TextField id="outlined-basic" variant="outlined" className={classes.textField} name="phone" value={data.phone} onChange={(e) => handleChange(e)} required />
                        </div>
                        <div className={classes.FormControl}>
                            <FormLabel className={classes.formLabel}>
                                Email :
                            </FormLabel>
                            <TextField id="outlined-basic" variant="outlined" className={classes.textField} name="email" value={data.email} onChange={(e) => handleChange(e)} required />
                        </div>
                        <div className={classes.FormControl}>
                            <FormLabel className={classes.formLabel}>
                                Bio :
                            </FormLabel>
                            <TextareaAutosize
                                minRows={3}
                                className={classes.textField}
                                name="bio"
                                value={data.bio}
                                onChange={(e) => handleChange(e)}
                                required
                            />
                        </div>
                        <div className={classes.FormControl}>
                            <FormLabel className={classes.formLabel}>
                                Address :
                            </FormLabel>
                            <TextareaAutosize
                                minRows={3}
                                className={classes.textField}
                                name="address"
                                value={data.address}
                                onChange={(e) => handleChange(e)}
                                required

                            />
                        </div>
                        <div className={classes.FormControl}>
                            <FormLabel className={classes.formLabel}>
                                LinkedIn :
                            </FormLabel>
                            <TextField id="outlined-basic" variant="outlined" className={classes.textField} name="linkedin"  value={data.linkedin} onChange={(e) => handleChange(e)} required />
                        </div>
                        <div className={classes.FormControl}>
                            <FormLabel className={classes.formLabel}>
                                GitHub :
                            </FormLabel>
                            <TextField variant="outlined" className={classes.textField} name="github" value={data.github} onChange={(e) => handleChange(e)} required />
                        </div>
                    </Stack>

                    <Stack direction="column" spacing={2} className={classes.bottomStack}>
                        <div className={classes.FormControl}>
                            <FormLabel className={classes.formLabel}>
                                Position :
                            </FormLabel>
                            <TextField variant="outlined" className={classes.textField} name="position" value={data.position} onChange={(e) => handleChange(e)} required />
                        </div>
                        <div className={classes.FormControl}>
                            <FormLabel className={classes.formLabel}>
                                Skills :
                            </FormLabel>
                            <ChipInput
                                value={chips}
                                onAdd={(chip) => handleAddChip(chip)}
                                onDelete={(chip) => handleDeleteChip(chip)}
                                variant='outlined'
                                className={classes.textField}
                                placeholder="write your 8 key skills"
                                style={{ border: "none", maxWidth: "240px" }}

                            />
                        </div>
                        <ResumeUploader pdfFile={pdfFile} setPdfFile={setPdfFile} setPdfSelectionError={setPdfSelectionError} />
                        <div className={classes.buttonContainer}>
                            <Button type='submit' className={classes.submitButton}>SAVE </Button>
                            {!successMessage && errorMessage &&
                                <Alert severity="error" className={classes.alert}>
                                    {errorMessage}
                                </Alert>
                            }
                        </div>
                    </Stack>
                </form>
                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }} variant="filled">
                        {successMessage}
                    </Alert>
                </Snackbar>
            </div>
        </Container>
    )
}

export default AddResume
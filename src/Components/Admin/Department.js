import React, { useState } from "react";
import { styled, makeStyles } from "@mui/styles";
import { Grid, TextField, Button } from "@mui/material"
import { fontSize, padding } from "@mui/system";
import Avatar from '@mui/material/Avatar';
import { ServerURL, postData, postDataAndImage, getData } from "./FetchNodeServices";
import Swal from "sweetalert2";
import DisplayAllDepartment from "./DisplayAllDepartment";

const useStyles = makeStyles((theme) => ({

    root: {
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: 40,

    },
    subdiv: {
        display: 'flex',
        background: '#f5f6fa',
        padding: 20,
        width: 600
    },

    inputClasses: {
        display: 'none'
    },


}))

export default function Department(props) {

    const classes = useStyles()

    const [depicon, setdepicon] = useState({ byte: '', file: '/department.png' })
    const [departmentName, setDepartmentName] = useState()

    const handleIconChange = (event) => {
        if (event.target.files.length) {
            setdepicon({ byte: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) })
        }
    }

    const handleSubmit = async () => {

        var formData = new FormData()

        formData.append('departmentname', departmentName)
        formData.append('icon', depicon.byte)

        var result = await postDataAndImage("department/adddepartment", formData)
        if (result.result) {
            Swal.fire({
                title: 'LMS',
                text: 'Department Submitted Succesfully',
                imageUrl: '/lms.png',
                imageWidth: 150,
                imageHeight: 150,
                icon: 'success',
                imageAlt: 'Custom image',
            })

        }
        else {
            Swal.fire({
                title: 'LMS',
                text: 'Faied to Submit',
                imageUrl: '/lms.png',
                imageWidth: 150,
                imageHeight: 150,
                icon: 'error',
                imageAlt: 'Custom image',
            })
        }
        // setTimeout(function () {
        //     { window.location.reload(false) }
        // }, 2000);
    }


    return (
        <div className={classes.root}>
            <div className={classes.subdiv}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <div style={{ fontSize: 20, fontWeight: 'bold', letterSpacing: 1, display: "flex", alignItems: "center" }} >
                            <img src="/dep.png" style={{ height: 60, width: 60, }} />
                            Department Interface

                            <div style={{ marginLeft: 'auto' }}>
                                <Button variant="contained" component="span" onClick={() => props.setView(<DisplayAllDepartment />)}>
                                    List Department
                                </Button>
                            </div>
                        </div>

                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant='outlined' onChange={(event) => setDepartmentName(event.target.value)} fullWidth label='Department Name' />
                    </Grid>

                    <Grid item xs={12} sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                        <label htmlFor="contained-button-file">
                            <input onChange={(event) => handleIconChange(event)} accept="image/*" className={classes.inputClasses} id="contained-button-file" multiple type="file" />
                            <Button variant="contained" color="warning" component="span">
                                Upload Department Icon
                            </Button>
                        </label>
                    </Grid>

                    <Grid item xs={12} sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                        <Avatar
                            alt="Upload Image"
                            variant="square"
                            src={depicon.file}
                            sx={{ width: 150, height: 150 }}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <Button variant="contained" onClick={() => handleSubmit()} color="success" fullWidth component="span">
                            Save Details
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={() => window.location.reload(false)} variant="contained" type="reset" fullWidth component="span" color="error">
                            Reset All
                        </Button>
                    </Grid>

                </Grid>
            </div>
        </div>
    )
}
import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Grid, TextField, Button } from "@mui/material"
import { fontSize, padding } from "@mui/system";
import Avatar from '@mui/material/Avatar';
import { ServerURL, postData, postDataAndImage, getData } from "./FetchNodeServices";
import Swal from "sweetalert2";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


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
        width: 550
    },

    inputClasses: {
        display: 'none'
    },


}))


export default function Units(props) {

    const classes = useStyles()

    const [listDepartment, setListDepartment] = useState([])
    const [listCourses, setListCourses] = useState([])

    const [courses, setCourses] = useState('')
    const [department, setDepartment] = useState('')

   

    const [subject, setSubject] = useState('')
    const [unitNo, setUnitNo] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [listSubjects, setListSubjects] = useState([])





    const handleDepartmentChange = (event) => {
        setDepartment(event.target.value)
        fetchAllCourses(event.target.value)
    }

    const handleCoursesChange = (event) => {
        setCourses(event.target.value)
        fetchAllSubjects(event.target.value)
    }



    const handleSubjectChange = (event) => {
        setSubject(event.target.value)
    }

    const fetchAllSubjects = async (courses) => {

        var result = await postData("subjects/displaysubjectsbycourses", {courses:courses})
        setListSubjects(result.result)
    }


    const fetchAllDepartments = async () => {

        var result = await getData("department/displayall")
        setListDepartment(result.result)
    }

    useEffect(function () {
        fetchAllDepartments()
    }, [])

    const fillDepartment = () => {

        return (listDepartment.map((item) => {
            return (<MenuItem value={item.departmentid}>{item.departmentname}</MenuItem>)
        }))
    }

    const fetchAllCourses = async (department) => {

        var result = await postData("subjects/displayallcoursesbyid", { departmentid: department })
        setListCourses(result.result)
    }

 

    const fillSubjects = () => {

        return (listSubjects.map((item) => {
            return (<MenuItem value={item.subjectid}>{item.subjectname} [{item.type}]</MenuItem>)
        }))
    }

    const fillCourses = () => {

        return (listCourses.map((item) => {
            return (<MenuItem value={item.courseid}>{item.coursename}</MenuItem>)
        }))
    }


    const handleSubmit = async () => {


        var body = { departmentid: department, courseid: courses, subjectid: subject, unitno: unitNo, title: title, description: description }

        var result = await postData("units/addunits", body)
        if (result.result) {
            Swal.fire({
                title: 'LMS',
                text: 'Unit Submitted Succesfully',
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
        setTimeout(function () {
            { window.location.reload(false) }
        }, 2000);
    }







    return (

        <div className={classes.root}>
            <div className={classes.subdiv}>
                <Grid container spacing={1}>
                    <Grid item xs={12} >
                        <div style={{ fontSize: 20, fontWeight: 'bold', letterSpacing: 1, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }} >
                            <img src="/units.png" style={{ height: 50, width: 50, padding: 10 }} />
                            Units Details
                        </div>
                    </Grid>


                    <Grid item xs={4} >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Department</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={department}
                                label="Department"
                                onChange={handleDepartmentChange}
                            >
                                {fillDepartment()}

                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={4} >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label1">Courses</InputLabel>
                            <Select
                                labelId="demo-simple-select-label1"
                                id="demo-simple-select"
                                value={courses}
                                label="Courses"
                                onChange={handleCoursesChange}
                            >
                                {fillCourses()}

                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={4} >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label4">Subjects</InputLabel>
                            <Select
                                labelId="demo-simple-select-label4"
                                id="demo-simple-select"
                                value={subject}
                                label="Semester"
                                onChange={handleSubjectChange}
                            >
                                {fillSubjects()}

                            </Select>
                        </FormControl>
                    </Grid>


                    <Grid item xs={3} >
                        <TextField variant='outlined' fullWidth label='Unit No' onChange={(event) => setUnitNo(event.target.value)} />
                    </Grid>

                    <Grid item xs={3} >
                        <TextField variant='outlined' fullWidth label='Title' onChange={(event) => setTitle(event.target.value)} />
                    </Grid>


                    <Grid item xs={6} >
                        <TextField variant='outlined' fullWidth label='Description' onChange={(event) => setDescription(event.target.value)} />
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
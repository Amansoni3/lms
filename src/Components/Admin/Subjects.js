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


export default function Subjects(props) {

    const classes = useStyles()

    const [courses, setCourses] = useState('')
    const [department, setDepartment] = useState('')
    const [semester, setSemester] = useState('')
    const [subjectName, setSubjectName] = useState('')
    
    const [subjectMarks, setSubjectMarks] = useState('')
    const [type,setType] = useState('')
    const [listDepartment, setListDepartment] = useState([])
    const [listCourses, setListCourses] = useState([])

    const handleDepartmentChange = (event) => {
        setDepartment(event.target.value)
        fetchAllCourses(event.target.value)
    }

    const handleCoursesChange = (event) => {
        setCourses(event.target.value)
        fetchAllSemester(event.target.value)
       
    }

    const handleSemesterChange = (event) =>{
        setSemester(event.target.value)
    }

    const handleTypeChange = (event) => {
        setType(event.target.value)
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

    const fetchAllCourses = async(department) => {
        
        var result = await postData("subjects/displayallcoursesbyid",{departmentid:department})
        setListCourses(result.result)
    }

    const fetchAllSemester = async(courses) => {
        
        var result = await postData("subjects/displaysemesterbycoursesid",{courseid:courses})
        setSemester(result.result[0].nosemester)
    }

    const fillCourses = () => {

        return (listCourses.map((item) => {
            return (<MenuItem value={item.courseid}>{item.coursename}</MenuItem>)
        }))
    }

    const fillSemester = () => {

        var x = []

        for(var i=1; i<=semester;i++)
        {x.push(i)}
        
        return (x.map((item) => {
            return (<MenuItem value={item}>{item}</MenuItem>)
        }))
    }

    const handleSubmit = async() => {
        
       
       var body = { departmentid:department, courseid:courses, semester:semester, subjectname:subjectName, type:type, subjectsmarks:subjectMarks}
        
        var result = await postData ("subjects/addsubjects",body)
        if(result.result)
        {
            Swal.fire({
                title: 'LMS',
                text: 'Subject Submitted Succesfully',
                imageUrl: '/lms.png',
                imageWidth: 150,
                imageHeight: 150,
                icon:'success',
                imageAlt: 'Custom image',
            })

        }
        else
        {
            Swal.fire({
                title: 'LMS',
                text: 'Faied to Subject',
                imageUrl: '/lms.png',
                imageWidth: 150,
                imageHeight: 150,
                icon:'error',
                imageAlt: 'Custom image',
            })
        }
        setTimeout(function() {
            {window.location.reload(false)}
         }, 2000);
    }





    return (
        <div className={classes.root}>
            <div className={classes.subdiv}>
                <Grid container spacing={1}>
                    <Grid item xs={12} >
                        <div style={{ fontSize: 20, fontWeight: 'bold', letterSpacing: 1, display: "flex", alignItems: "center", justifyContent: "center",marginBottom:10 }} >
                        <img src="/subject.png" style={{ height: 50, width: 50, padding: 10 }} />
                            Subject Details
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
                            <InputLabel id="demo-simple-select-label2">Semester</InputLabel>
                            <Select
                                labelId="demo-simple-select-label2"
                                id="demo-simple-select"
                                value={semester}
                                label="Semester"
                                onChange={handleSemesterChange}
                            >
                                {fillSemester()}

                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={4} >
                        <TextField variant='outlined' fullWidth label='Subject Name' onChange={(event) => setSubjectName(event.target.value)} />
                    </Grid>
                     
                    <Grid item xs={4} >
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type}
                            label="Type"
                            onChange={handleTypeChange}
                        >
                            <MenuItem value={"Practical"}>Practical</MenuItem>
                            <MenuItem value={"Theory"}>Theory</MenuItem>
                        </Select>
                    </FormControl>
                    </Grid>

                    <Grid item xs={4} >
                        <TextField variant='outlined' fullWidth label='Subjects Marks' onChange={(event) => setSubjectMarks(event.target.value)} />
                    </Grid>

                   

                    <Grid item xs={6}>
                        <Button variant="contained"  onClick={() => handleSubmit() } color="success" fullWidth component="span">
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


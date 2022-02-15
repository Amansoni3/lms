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
import DisplayAllUnits from "./DisplayAllUnits";
import { LocalParking } from "@material-ui/icons";
import { set } from "date-fns";
import DisplayAllCreateset from "./DisplayAllCreateset";

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

export default function Createset(props) {

    const classes = useStyles()

    const [facultyId, setFacultyId] = useState('')

    const [departmentId, setDepartmentId] = useState('')

    const [listCourses, setListCourses] = useState([])

    const [courses, setCourses] = useState('')

    const [subject, setSubject] = useState('')

    const [listSubjects, setListSubjects] = useState([])

    const [status, setStatus] = useState('')

    const [setNo, setSetNo] = useState('')
    const [time, setTime] = useState('')
    const [marks, setMarks] = useState('')

    const [semester, setSemester] = useState('')

    const [totalSemester, setTotalSemester] = useState('')

    const [faculty, setFaculty] = useState([])

    const handleCoursesChange = (event) => {

        setCourses(event.target.value)

        fetchAllSemester(event.target.value)

    }
    const handleStatusChange = (event) => {
        setStatus(event.target.value)
    }

    const handleSubjectChange = async (event) => {
        
        setSubject(event.target.value)
          
        var result = await getData('createset/generateset')
        

        setSetNo(faculty.department+"-"+courses+"-"+(event.target.value)+"-"+semester+"-"+result.result)
    }

    const fetchAllSubjects = async (semester) => {

        var result = await postData("subjects/displaysubjectsbysemester", { courses: courses , semester:semester })
        setListSubjects(result.result)
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

    useEffect(function () {

        var data = JSON.parse(localStorage.getItem("SES_FACULTY"))
        setFaculty(data)

        fetchAllCourses(data.department)


    }, [])

    const fillSemester = () => {

        var x = []

        for(var i=1; i<=totalSemester;i++)
        {x.push(i)}
        
        return (x.map((item) => {
            return (<MenuItem value={item}>{item}</MenuItem>)
        }))
    }

    const fetchAllSemester = async(courses) => {
        
        var result = await postData("subjects/displaysemesterbycoursesid",{courseid:courses})
        setTotalSemester(result.result[0].nosemester)
    }

    const handleSemesterChange = (event) =>{

        setSemester(event.target.value)

        fetchAllSubjects(event.target.value)
    }


    const fetchAllCourses = async (departmentid) => {

        var result = await postData("subjects/displayallcoursesbyid", { departmentid: departmentid })
        setListCourses(result.result)
    }

    const handleSubmit = async () => {


        var body = { facultyid: faculty.facultyid, departmentid: faculty.department, courseid: courses, subjectid: subject, setno: setNo, time: time, status: status, marks: marks, semester:semester}

        var result = await postData("createset/addset", body)

        if (result.result) {
            Swal.fire({
                title: 'LMS',
                text: 'Create Set Submitted Succesfully',
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
        
    }





    return (
        <div className={classes.root}>
            <div className={classes.subdiv}>

                <Grid container spacing={1}>

                    <Grid item xs={12}>

                        <div style={{ fontSize: 20, fontWeight: 'bold', letterSpacing: 1, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }} >
                            Create Set Interface

                            <div style={{ marginLeft: 'auto' }}>
                                <Button variant="contained" component="span" onClick={() => props.setView(<DisplayAllCreateset />)}>
                                    List Sets
                                </Button>
                            </div>
                        </div>

                        

                    </Grid>

                    <Grid item xs={6}>
                        <TextField variant='outlined' aria-readonly fullWidth label='Faculty Id' value={faculty.facultyid}  />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField variant='outlined' aria-readonly value={faculty.departmentname} fullWidth label='Department' onChange={(event) => setDepartmentId(event.target.value)} />
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

                    <Grid item xs={6}>
                        <TextField variant='outlined' value={setNo} fullWidth label='Set Number'  />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField variant='outlined' fullWidth label='Time' onChange={(event) => setTime(event.target.value)} />
                    </Grid>

                    <Grid item xs={6} >
                        <FormControl fullWidth>

                            <InputLabel id="demo-simple-select-label">Status</InputLabel>

                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={status}
                                label="Status"
                                onChange={handleStatusChange}
                            >
                                <MenuItem value={'Enabled'}>Enabled</MenuItem>
                                <MenuItem value={'Disabled'}>Disabled</MenuItem>

                            </Select>
                        </FormControl>
                    </Grid>


                    <Grid item xs={6}>
                        <TextField variant='outlined' fullWidth label='Marks' onChange={(event) => setMarks(event.target.value)} />
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
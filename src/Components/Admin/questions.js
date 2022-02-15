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
        width: 1000
    },

    inputClasses: {
        display: 'none'
    },


}))

export default function Question(props) {

    const classes = useStyles()


    const [faculty, setFaculty] = useState([])
    const [departmentId, setDepartmentId] = useState('')
    const [listCourses, setListCourses] = useState([])

    const [courses, setCourses] = useState('')

    const [subject, setSubject] = useState('')

    const [listSubjects, setListSubjects] = useState([])
    const [semester, setSemester] = useState('')

    const [totalSemester, setTotalSemester] = useState('')
    const [setId, setSetId] = useState('')

    const [unit, setUnits] = useState('')
    const [listUnits, setListUnits] = useState([])

    const [listSets, setListSets] = useState([])

    const [questionNumber, setQuestionNumber] = useState('')
    const [question, setQuestion] = useState('')

    const [questionImage, setQuestionImage] = useState({ byte: '', file: '/uploadicon.png' })

    const [option1, setOption1] = useState('')
    const [option1Image, setoption1Image] = useState({ byte: '', file: '/uploadicon.png' })

    const [option2, setOption2] = useState('')
    const [option2Image, setoption2Image] = useState({ byte: '', file: '/uploadicon.png' })

    const [option3, setOption3] = useState('')
    const [option3Image, setoption3Image] = useState({ byte: '', file: '/uploadicon.png' })

    const [option4, setOption4] = useState('')
    const [option4Image, setoption4Image] = useState({ byte: '', file: '/uploadicon.png' })
    
    const [correctAnswer, setCorrectAnswer] = useState('')

    const handleCoursesChange = (event) => {

        setCourses(event.target.value)

        fetchAllSemester(event.target.value)

    }

    const handleUnitChange = (event) => {

        setUnits(event.target.value)
    }

    const handleSetChange = (event) => {

        setSetId(event.target.value)

        fetchAllQuestionNumber(event.target.value)
    }

    const handleSubjectChange = (event) => {

        setSubject(event.target.value)
        fetchAllUnits(event.target.value)
        fetchAllSets(event.target.value)
    }

    const fetchAllSubjects = async (semester) => {

        var result = await postData("subjects/displaysubjectsbysemester", { courses: courses, semester: semester })
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

    const fillSemester = () => {

        var x = []

        for (var i = 1; i <= totalSemester; i++) { x.push(i) }

        return (x.map((item) => {
            return (<MenuItem value={item}>{item}</MenuItem>)
        }))
    }

    const fetchAllSemester = async (courses) => {

        var result = await postData("subjects/displaysemesterbycoursesid", { courseid: courses })
        setTotalSemester(result.result[0].nosemester)
    }

    const handleSemesterChange = (event) => {

        setSemester(event.target.value)

        fetchAllSubjects(event.target.value)
    }


    const fetchAllCourses = async (departmentid) => {

        var result = await postData("subjects/displayallcoursesbyid", { departmentid: departmentid })
        setListCourses(result.result)
    }

    const fetchAllUnits = async (subject) => {

        var result = await postData('question/fetchallunits', { subjectid: subject })
        setListUnits(result.result)
    }

    const fillUnits = () => {

        return (listUnits.map((item) => {
            return (<MenuItem value={item.unitid}>{item.title}</MenuItem>)
        }))
    }

    const fetchAllSets = async (subject) => {

        var result = await postData('question/fetchallsets', { subjectid: subject })
        setListSets(result.result)
    }

    const fillSets = () => {

        return (listSets.map((item) => {
            return (<MenuItem value={item.setid}>{item.setno}</MenuItem>)
        }))
    }

    const fetchAllQuestionNumber = async (setId) => {

        var result = await postData('question/generatequestionnumber', { setid: setId })
        setQuestionNumber(result.result)
    }

    const handleQuestionImageChange = (event) => {
        if (event.target.files.length) {
            setQuestionImage({ byte: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) })
        }
    }

    const handleOption1ImageChange = (event) => {
        if (event.target.files.length) {
            setoption1Image({ byte: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) })
        }
    }

    const handleOption2ImageChange = (event) => {
        if (event.target.files.length) {
            setoption2Image({ byte: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) })
        }
    }

    const handleOption3ImageChange = (event) => {
        if (event.target.files.length) {
            setoption3Image({ byte: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) })
        }
    }

    const handleOption4ImageChange = (event) => {
        if (event.target.files.length) {
            setoption4Image({ byte: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) })
        }
    }





    useEffect(function () {

        var data = JSON.parse(localStorage.getItem("SES_FACULTY"))
        setFaculty(data)

        fetchAllCourses(data.department)


    }, [])

    const handleSubmit = async () => {

        //  facultyid, departmentid, courseid,
        //  semester, subjectid, setno, unitid, questionnumber,
        //  question, questionimage, option1, image1, option2,
        //   image2, option3, image3, option4, image4, correctanswer

        var formData = new FormData()

        formData.append('facultyid',faculty.facultyid)
        formData.append('departmentid',faculty.department)
        
        formData.append('courseid',courses)
        formData.append('semester',semester)
        formData.append('subjectid',subject)
        formData.append('setid',setId)
        formData.append('unitid',unit)
        formData.append('questionnumber',questionNumber)
        formData.append('question',question)
        
        formData.append('questionimage',questionImage.byte)
        
        formData.append('option1',option1)
        formData.append('option2',option2)
        formData.append('option3',option3)
        formData.append('option4',option4)

        formData.append('correctanswer',correctAnswer)

        formData.append('image1',option1Image.byte)
        formData.append('image2',option2Image.byte)
        formData.append('image3',option3Image.byte)
        formData.append('image4',option4Image.byte)
        


        

        var result = await postDataAndImage("question/addquestion", formData)

        if (result.result) {
            Swal.fire({
                title: 'LMS',
                text: 'Question Submitted Succesfully',
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
                            Question Interface
                        </div>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField variant='outlined' aria-readonly fullWidth label='Faculty Id' value={faculty.facultyid} />
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
                                label="Subject"
                                onChange={handleSubjectChange}
                            >
                                {fillSubjects()}

                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={4} >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label4">Units</InputLabel>
                            <Select
                                labelId="demo-simple-select-label4"
                                id="demo-simple-select"
                                value={unit}
                                label="Units"
                                onChange={handleUnitChange}
                            >
                                {fillUnits()}

                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={4} >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label4">Set Number</InputLabel>
                            <Select
                                labelId="demo-simple-select-label4"
                                id="demo-simple-select"
                                value={setId}
                                label="Set Number"
                                onChange={handleSetChange}
                            >
                                {fillSets()}

                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                        <TextField variant='outlined' value={questionNumber} aria-readonly fullWidth label='Question Number' onChange={(event) => setQuestionNumber(event.target.value)} />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField variant='outlined' aria-readonly fullWidth label='Question' onChange={(event) => setQuestion(event.target.value)} />
                    </Grid>

                    <Grid item xs={3} sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                        <label htmlFor="contained-button-file">

                            <input onChange={(event) => handleQuestionImageChange(event)} accept="image/*" className={classes.inputClasses} id="contained-button-file" multiple type="file" />

                            <Button variant="contained" component="span">
                                Upload Question Image
                            </Button>
                        </label>
                    </Grid>

                    <Grid item xs={3} sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                        <Avatar
                            alt="Upload Image"
                            variant="square"
                            src={questionImage.file}
                            sx={{ width: 90, height: 65 }}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField variant='outlined' aria-readonly fullWidth label='Option 1' onChange={(event) => setOption1(event.target.value)} />
                    </Grid>

                    <Grid item xs={3} sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                        <label htmlFor="contained-button-file1">

                            <input onChange={(event) => handleOption1ImageChange(event)} accept="image/*" className={classes.inputClasses} id="contained-button-file1" multiple type="file" />

                            <Button variant="contained" component="span">
                                Upload Option 1 Image
                            </Button>
                        </label>
                    </Grid>

                    <Grid item xs={3} sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                        <Avatar
                            alt="Upload Image"
                            variant="square"
                            src={option1Image.file}
                            sx={{ width: 90, height: 65 }}
                        />
                    </Grid>
 
                    <Grid item xs={6}>
                        <TextField variant='outlined' aria-readonly fullWidth label='Option 2' onChange={(event) => setOption2(event.target.value)} />
                    </Grid>

                    <Grid item xs={3} sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                        <label htmlFor="contained-button-file2">

                            <input onChange={(event) => handleOption2ImageChange(event)} accept="image/*" className={classes.inputClasses} id="contained-button-file2" multiple type="file" />

                            <Button variant="contained" component="span">
                                Upload Option 2 Image
                            </Button>
                        </label>
                    </Grid>

                    <Grid item xs={3} sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                        <Avatar
                            alt="Upload Image"
                            variant="square"
                            src={option2Image.file}
                            sx={{ width: 90, height: 65 }}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField variant='outlined' aria-readonly fullWidth label='Option 3' onChange={(event) => setOption3(event.target.value)} />
                    </Grid>

                    <Grid item xs={3} sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                        <label htmlFor="contained-button-file3">

                            <input onChange={(event) => handleOption3ImageChange(event)} accept="image/*" className={classes.inputClasses} id="contained-button-file3" multiple type="file" />

                            <Button variant="contained" component="span">
                                Upload Option 3 Image
                            </Button>
                        </label>
                    </Grid>

                    <Grid item xs={3} sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                        <Avatar
                            alt="Upload Image"
                            variant="square"
                            src={option3Image.file}
                            sx={{ width: 100, height: 70 }}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField variant='outlined' aria-readonly fullWidth label='Option 4' onChange={(event) => setOption4(event.target.value)} />
                    </Grid>

                    <Grid item xs={3} sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                        <label htmlFor="contained-button-file4">

                            <input onChange={(event) => handleOption4ImageChange(event)} accept="image/*" className={classes.inputClasses} id="contained-button-file4" multiple type="file" />

                            <Button variant="contained" component="span">
                                Upload Option 4 Image
                            </Button>
                        </label>
                    </Grid>

                    <Grid item xs={3} sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                        <Avatar
                            alt="Upload Image"
                            variant="square"
                            src={option4Image.file}
                            sx={{ width: 100, height: 70 }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField variant='outlined' aria-readonly fullWidth label='Correct Answer' onChange={(event) => setCorrectAnswer(event.target.value)} />
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
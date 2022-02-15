import React, { useEffect, useState } from "react"
import MaterialTable from '@material-table/core';
import { makeStyles, styled } from "@mui/styles";
import { ServerURL, postData, postDataAndImage, getData } from "./FetchNodeServices";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import { Grid, TextField } from "@mui/material"
import Avatar from '@mui/material/Avatar';
import Swal from "sweetalert2";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

const useStyles = makeStyles((theme) => ({

  root: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 40,

  },
  subdiv: {

    background: '#f5f6fa',
    padding: 10,
    width: 1400
  },

  inputClasses: {
    display: 'none'
  },
}))

export default function DisplayAllCreateset(props) {

  const classes = useStyles()

  const [listCreateSet, setCreateList] = useState([])


  const [open, setOpen] = useState(false)


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


    setSetNo(faculty.department + "-" + courses + "-" + (event.target.value) + "-" + semester + "-" + result.result)
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

  useEffect(function () {

    var data = JSON.parse(localStorage.getItem("SES_FACULTY"))
    setFaculty(data)

    fetchAllCourses(data.department)


  }, [])

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




  const fetchAllCreateSet = async (facultyid) => {

    var result = await postData('createset/displayallcreateset', { facultyid: facultyid })

    setCreateList(result.result)
  }

  useEffect(function () {

    var data = JSON.parse(localStorage.getItem("SES_FACULTY"))
    setFaculty(data)

    fetchAllCreateSet(data.facultyid)

  }, [])

  const handleEdit = (rowData) => {

    setSetNo(rowData.setno)
    setTime(rowData.time)
    setStatus(rowData.status)
    setMarks(rowData.marks)
    setOpen(true)
    setCourses(rowData.courseid)
    fetchAllSemester(rowData.courseid)
    setSemester(rowData.semester)
    
  }

  const handleClose = () => {
    setOpen(false)
  }

  const showDialog = () => {

    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >

        <DialogContent>
          <Grid container spacing={1}>

            <Grid item xs={12}>

              <div style={{ fontSize: 20, fontWeight: 'bold', letterSpacing: 1, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }} >
                Edit Set Interface
              </div>



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

           

            <Grid item xs={4}>
              <TextField variant='outlined' fullWidth label='Time' value={time} onChange={(event) => setTime(event.target.value)} />
            </Grid>

            <Grid item xs={4} >
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


            <Grid item xs={4}>
              <TextField variant='outlined' fullWidth label='Marks' value={marks} onChange={(event) => setMarks(event.target.value)} />
            </Grid>



          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Edit</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  function DisplayAllCreateset() {

    return (

      <MaterialTable

        title="List of Set"

        columns={[

          { title: 'Set Id', field: 'setid' },
          { title: 'Faculty Id', field: 'facultyid' },
          { title: 'Department', field: 'departmentname' },
          { title: 'Courses', field: 'coursename' },
          { title: 'Semester', field: 'semester' },
          { title: 'Subject', field: 'subjectname' },
          { title: 'Set No', field: 'setno' },
          { title: 'Time', field: 'time' },
          { title: 'Status', field: 'status' },
          { title: 'Marks', field: 'marks' },


        ]}
        data={listCreateSet}

        actions={[

          {
            icon: 'edit',
            tooltip: 'Edit Department',
            onClick: (event, rowData) => handleEdit(rowData)
          },
          {
            icon: 'delete',
            tooltip: 'Delete Department',
            // onClick: (event, rowData) => handleDeleteData(rowData.departmentid)
          }

        ]}
      />
    )
  }






  return (
    <div className={classes.root}>
      <div className={classes.subdiv}>
        {DisplayAllCreateset()}
        {showDialog()}

      </div>
    </div>
  )
}
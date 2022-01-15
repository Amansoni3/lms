import React, { useEffect, useState } from "react"
import MaterialTable from "material-table"
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
        width: 1300
    },

    inputClasses: {
        display: 'none'
    },
}))

export default function DisplayAllSubjects(props) {

    const classes = useStyles()

    const [courses, setCourses] = useState('')
    const [department, setDepartment] = useState('')
    const [semester, setSemester] = useState('')
    const [subjectName, setSubjectName] = useState('')

    const [subjectMarks, setSubjectMarks] = useState('')
    const [type, setType] = useState('')
    const [listDepartment, setListDepartment] = useState([])
    const [listCourses, setListCourses] = useState([])
    const [ open , setOpen] = useState(false)   
    const[listSubjects,setListsubjects] = useState([])
    const [subjectId , setSubjectId] = useState('')

    const handleEdit = (rowData) => {
        setSubjectId(rowData.subjectid)
        setCourses(rowData.courseid)
        setDepartment(rowData.departmentid)
        setSemester(rowData.semester)
        setSubjectName(rowData.subjectname)
        setSubjectMarks(rowData.subjectsmarks)
        setType(rowData.type)

        fetchAllCourses(rowData.departmentid)

        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    
    const fetchAllSubjects = async() => {
        
        var result = await getData("subjects/displayallsubjects")
        setListsubjects(result.result)
    }

    useEffect( function() {
       fetchAllSubjects() 
    },[])

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

    const handleEditData = async() =>{
      
        setOpen(false)

        var body = {departmentid:department, courseid:courses, semester:semester, subjectname:subjectName, type:type, subjectsmarks:subjectMarks,subjectid:subjectId}
        
        var result = await postData("subjects/editsubjects",body)
        if(result.result)
        {
            Swal.fire({
                title: 'LMS',
                text: 'Subject Edited Succesfully',
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
                text: 'Faied to Edit',
                imageUrl: '/lms.png',
                imageWidth: 150,
                imageHeight: 150,
                icon:'error',
                imageAlt: 'Custom image',
            })
        }
        
        fetchAllSubjects()
      }

      const handleDeleteData = async(subjectid) =>{
     
     

        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then(async(result) => {
          if (result.isConfirmed) {
  
            var body = {subjectid:subjectid}
        
            var result = await postData("subjects/deletesubjects",body)
            
            if(result.result)
            Swal.fire(
              'Deleted!',
              'Subjects has been deleted.',
              'success'
            )
          
          else
          Swal.fire(
            'Deleted!',
            'Fail To Delete Subjects',
            'error'
          )
          }
          fetchAllSubjects()
        })
        
      }
  
  


    function showDialog() {
        
        return(
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            
            <DialogContent>
              
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
                        <TextField variant='outlined' value={subjectName} fullWidth label='Subject Name' onChange={(event) => setSubjectName(event.target.value)} />
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
                        <TextField variant='outlined' value={subjectMarks} fullWidth label='Subjects Marks' onChange={(event) => setSubjectMarks(event.target.value)} />
                    </Grid>

                </Grid>

            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} onClick={()=>handleEditData()} >Edit</Button>
              <Button onClick={handleClose} autoFocus>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        )
    }




    
   
   
    function DisplayAll() {
        return (
          <MaterialTable
            title="List of Subjects"
            columns={[
              { title: 'Subject Id', field: 'subjectid' },
              { title: 'Department Name', field: 'departmentname' },
              { title: 'Course Name', field: 'coursename' },
              { title: 'Semester', field: 'semester' },
              { title: 'Subject Name', field: 'subjectname' },
              { title: 'Subject Type', field: 'type' },
              { title: 'Subject Marks', field: 'subjectsmarks' },
            ]}
            data={listSubjects}  
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Subjects',
                onClick: (event, rowData) => handleEdit(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Subjects',
                onClick: (event, rowData) => handleDeleteData(rowData.subjectid)
              }

            ]}
          />
        )
      }

   

    return (
        <div className={classes.root}>
            <div className={classes.subdiv}>
                {DisplayAll()}
                {showDialog()}
            </div>
        </div>
    )



}
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
        width: 1300
    },

    inputClasses: {
        display: 'none'
    },
}))

export default function DisplayAllUnits(props) {

    const classes = useStyles()

    const[listUnits,setListUnits] = useState([])

    const [listDepartment, setListDepartment] = useState([])
    const [listCourses, setListCourses] = useState([])

    const [courses, setCourses] = useState('')
    const [department, setDepartment] = useState('')

   
    const [unitId,setUnitId] = useState('')
    const [subject, setSubject] = useState('')
    const [unitNo, setUnitNo] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [listSubjects, setListSubjects] = useState([])

    const[open,setOpen] = useState(false)

    const fetchAllUnits = async() => {
        
        var result = await getData("units/displayallunits")
        setListUnits(result.result)
    }

    
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




    useEffect(function() {
       fetchAllUnits() 
    },[])
    

    const handleEdit = (rowData) => {
        
       setUnitId(rowData.unitid)
       setDepartment(rowData.departmentid)
       setCourses(rowData.courseid)
       setSubject(rowData.subjectid)
       setUnitNo(rowData.unitno)
       setTitle(rowData.title)
       setDescription(rowData.description)
       fetchAllCourses(rowData.departmentid)
       fetchAllSubjects(rowData.courseid)

        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const handleEditData = async() =>{
      
        setOpen(false)

        var body = {departmentid:department, courseid:courses, subjectid:subject, unitno:unitNo, title:title, description:description,unitid:unitId}
        
        var result = await postData("units/editunits",body)

        if(result.result)
        {
            Swal.fire({
                title: 'LMS',
                text: 'Units Edited Succesfully',
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
        
        fetchAllUnits()
      }

      const handleDeleteData = async(unitid) =>{
     
     

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
  
            var body = {unitid:unitid}
        
            var result = await postData("units/deleteunits",body)
            
            if(result.result)
            Swal.fire(
              'Deleted!',
              'Units has been deleted.',
              'success'
            )
          
          else
          Swal.fire(
            'Deleted!',
            'Fail To Delete Department.',
            'error'
          )
          }
          fetchAllUnits()
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
                        <TextField variant='outlined' fullWidth label='Unit No' value={unitNo} onChange={(event) => setUnitNo(event.target.value)} />
                    </Grid>

                    <Grid item xs={3} >
                        <TextField variant='outlined' fullWidth label='Title' value={title} onChange={(event) => setTitle(event.target.value)} />
                    </Grid>


                    <Grid item xs={6} >
                        <TextField variant='outlined' fullWidth label='Description' value={description} onChange={(event) => setDescription(event.target.value)} />
                    </Grid>

                </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditData}>Edit</Button>
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
                title="Units"
                columns={[
                    { title: 'Unit Id', field: 'unitid' },
                    { title: 'Department Name', field: 'departmentname' },
                    { title: 'Course Name', field: 'coursename' },
                    
                    { title: 'Subject Name', field: 'subjectname' },
                    { title: 'Subject Type', field: 'subjecttype' },
                    { title: 'Semester', field: 'semester' },
                    { title: 'Unit Number', field: 'unitno' },
                    { title: 'Title', field: 'title' },
                    { title: 'Description', field: 'description' },
                    
                ]}
                 data={listUnits}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit',
                        onClick: (event, rowData) =>  handleEdit(rowData)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete',
                         onClick: (event, rowData) =>  handleDeleteData(rowData.unitid)
                    },
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
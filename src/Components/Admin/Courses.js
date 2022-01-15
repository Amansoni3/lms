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
        width: 600
    },

    inputClasses: {
        display: 'none'
    },


}))



export default function Courses(props) {

    const classes = useStyles()

    const [courseIcon, setCourseIcon] = useState({ byte: '', file: '/uploadicon.png' })
    const[courseName,setCourseName] = useState('')
    const[noSemester,setNoSemester] = useState('')
    const[department,setDepartment] = useState('')
    const[feePerSemester,setFeePerSemester] = useState('')

    const[listDepartment,setListDepartment] = useState([])


    const handleIconChange = (event) => {
        if (event.target.files.length) {
            setCourseIcon({ byte: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) })
        }
    }

    const fetchAllDepartments = async () => {

        var result = await getData("department/displayall")
        setListDepartment(result.result)
     }

     useEffect(function(){
        fetchAllDepartments()
     },[])

     const fillDepartment=()=>{

    return(listDepartment.map((item)=>{
       return(<MenuItem value={item.departmentid}>{item.departmentname}</MenuItem> )
    }))  }   

    const handleDepartmentChange=(event)=>{
        setDepartment(event.target.value)
      }


    const handleSubmit = async()=>{
         
        var formData = new FormData()
        
        formData.append('icon',courseIcon.byte)
        formData.append('coursename',courseName)
        formData.append('nosemester',noSemester)
        formData.append('feepersemester',feePerSemester)
        formData.append('departmentid',department)

        var result = await postDataAndImage("courses/addcourses", formData)

        if (result.result) {
           Swal.fire({
              title: 'LMS',
              text: 'Courses Submitted Succesfully',
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
              text: 'Failed to Submit Courses',
              imageUrl: '/lms.png',
              imageWidth: 150,
              imageHeight: 150,
              icon: 'error',
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
                    <Grid item xs={12}>
                        <div style={{ fontSize: 25, fontWeight: 'bold', letterSpacing: 1, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }} >

                            Course Interface
                        </div>

                    </Grid>

                    <Grid item xs={6} sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                        <Avatar
                            alt="Upload Image"
                            variant="square"
                            src={courseIcon.file}
                            sx={{ width: 80, height: 80 }}
                        />
                    </Grid>

                    <Grid item xs={6} sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                        <label htmlFor="contained-button-file">

                            <input onChange={(event) => handleIconChange(event)} accept="image/*" className={classes.inputClasses} id="contained-button-file" multiple type="file" />

                            <Button variant="contained" color="warning" component="span">
                                Upload Course Icon
                            </Button>
                        </label>
                    </Grid>

                    <Grid item xs={6}>
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
                    <Grid item xs={6} >
                  <TextField variant='outlined' fullWidth label='Course Name' value={courseName} onChange={(event) => setCourseName(event.target.value)} />
               </Grid>
               <Grid item xs={6} >
                  <TextField variant='outlined' fullWidth label='Number of Semester' value={noSemester} onChange={(event) => setNoSemester(event.target.value)} />
               </Grid>
               <Grid item xs={6} >
                  <TextField variant='outlined' fullWidth label='Per Semester Fees' value={feePerSemester}  onChange={(event) => setFeePerSemester(event.target.value)} />
               </Grid>

               <Grid item xs={6}>
                    <Button variant="contained" onClick={() => handleSubmit() } color="success" fullWidth component="span">
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
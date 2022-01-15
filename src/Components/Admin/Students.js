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
        width: 1000
    },

    inputClasses: {
        display: 'none'
    },


}))




export default function Students(props) {


    const [enrollMentNo, setEnrollMentNo] = useState('')
    const [studentName, setStudentName] = useState('')
    const [fatherName, setFatherName] = useState('')
    const [motherName, setMotherName] = useState('')
    const [category, setCategory] = useState('')
    const [nationality, setNationality] = useState('')
    const [gender, setGender] = useState('')
    const [dob, setDob] = useState('')
    const [mobileNo, setMobileNo] = useState('')
    const [parentMobileNo, setParentMobileNo] = useState('')
    const [cState, setCstate] = useState('')
    const [cCity, setCcity] = useState('')
    const [cAddress, setCaddress] = useState('')
    const [pState, setPstate] = useState('')
    const [pCity, setPcity] = useState('')
    const [pAddress, setPaddress] = useState('')
    const [emailId, setEmailId] = useState('')
    const [parentOccupation, setParentOccupation] = useState('')
    const [annualIncome, setAnnualIncome] = useState('')
    const [aadhaarno, setAadhaarno] = useState('')

    const [uploadAadhaar, setUploadAadhaar] = useState({ byte: '', file: '/uploadicon.png' })
    
    const [domicileState, setDomicileState] = useState('')
    
    const [uploadDomicle, setuploadDomicle] = useState({ byte: '', file: '/uploadicon.png' })
    
    const [department, setDepartment] = useState('')
    const [courses, setCourses] = useState('')

    const [password, setPassword] = useState('')

    const [picture, setPicture] = useState({ byte: '', file: '/facultyicon.png' })

    const [currentListCities, setCurrentListCities] = useState([])
    const [currentListStates,setCurrentListStates] = useState([])

    const [permanentListCities, setPermanentListCities] = useState([])
    const [permanentListStates,setPermanentListStates] = useState([])
    const [domicileListStates,setDomicileListStates] = useState([])

    const [listDepartment, setListDepartment] = useState([])
    const [listCourses, setListCourses] = useState([])

    const classes = useStyles()

    const handleCategoryChange = (event) => {
        setCategory(event.target.value)
    }
    const handleNationalityChange = (event) => {
        setNationality(event.target.value)
    }

    const handleGender = (gen) => {
        setGender(gen)
     }

     const handleCurrentStateChange= (event)=>{
        setCstate(event.target.value)
        fetchAllCurrentCities(event.target.value)
     }
  
     const handleCurrentCityChange= (event)=>{
        setCcity(event.target.value)
     } 
     const fetchAllCurrentStates = async () => {

        var result = await getData("statecity/displayallstates")
        setCurrentListStates(result.result)
     }
  
     const fetchAllCurrentCities = async (cState) => {
  
        var result = await postData("statecity/displayallcities",{stateid:cState})
        setCurrentListCities(result.result)
     }

     const fillCurrentState=()=>{

        return(currentListStates.map((item)=>{
           return(<MenuItem value={item.stateid}>{item.statename}</MenuItem> )
        }))
     }
  
     const fillCurrentCities=()=>{
  
        return(currentListCities.map((item)=>{
           return(<MenuItem value={item.cityid}>{item.cityname}</MenuItem> )
        }))
     }

     







     const handlePermanentStateChange= (event)=>{
        setPstate(event.target.value)
        fetchAllPermanentCities(event.target.value)
     }

     const handleDomicileStateChange= (event)=>{
      setDomicileState(event.target.value)
      
   }
   
   const fetchAllDomicileStates = async () => {

      var result = await getData("statecity/displayallstates")
      setDomicileListStates(result.result)
   }

   const fillDomicileState=()=>{

      return(domicileListStates.map((item)=>{
         return(<MenuItem value={item.stateid}>{item.statename}</MenuItem> )
      }))
   }

     const handlePermanentCityChange= (event)=>{
        setPcity(event.target.value)
     } 
     const fetchAllPermanentStates = async () => {

        var result = await getData("statecity/displayallstates")
        setPermanentListStates(result.result)
     }
  
     const fetchAllPermanentCities = async (pState) => {
  
        var result = await postData("statecity/displayallcities",{stateid:pState})
        setPermanentListCities(result.result)
     }

     const fillPermanentState=()=>{

        return(permanentListStates.map((item)=>{
           return(<MenuItem value={item.stateid}>{item.statename}</MenuItem> )
        }))
     }
  
     const fillPermanentCities=()=>{
  
        return(permanentListCities.map((item)=>{
           return(<MenuItem value={item.cityid}>{item.cityname}</MenuItem> )
        }))
     }

     const handleDepartmentChange = (event) => {
      setDepartment(event.target.value)
      fetchAllCourses(event.target.value)
  }

  const handleCoursesChange = (event) => {
   setCourses(event.target.value)
}

const fetchAllDepartments = async () => {

   var result = await getData("department/displayall")
   setListDepartment(result.result)
}

const fillDepartment = () => {

   return (listDepartment.map((item) => {
       return (<MenuItem value={item.departmentid}>{item.departmentname}</MenuItem>)
   }))
}

const fetchAllCourses = async(department) => {
        
   var result = await postData("subjects/displayallcoursesbyid",{departmentid:department})
   setListCourses(result.result)
}

const fillCourses = () => {

   return (listCourses.map((item) => {
       return (<MenuItem value={item.courseid}>{item.coursename}</MenuItem>)
   }))
}

  
  
  
  
     useEffect(function () {
       
        fetchAllCurrentStates()
        fetchAllPermanentStates()
        fetchAllDomicileStates()
        fetchAllDepartments()
     }, []) 


     const handleAadhaarImageChange = (event) => {
      if (event.target.files.length) {
         setUploadAadhaar({ byte: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) })
      }
   }

   const handleDomicileImageChange = (event) => {
      if (event.target.files.length) {
         setuploadDomicle({ byte: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) })
      }
   }

   const handlePictureChange = (event) => {
      if (event.target.files.length) {
         setPicture({ byte: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) })
      }
   }

   const handleGeneratePassword = ()=>{
      
      var list = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','@','*','#','@','*','#','@','*','#']
        var pwd = ""
        
        for( var i=1; i<=8;i++)
        {
           var c = list[Math.floor(Math.random()*28)]
          
           pwd+= c
        }
        setPassword(pwd) 
    }

    
    const handleSubmit = async () => {

      var formData = new FormData()

      formData.append('enrollmentno',enrollMentNo)
      formData.append('studentname',studentName)
      formData.append('fathername',fatherName)
      formData.append('mothername',motherName)
      formData.append('category',category)
      formData.append('nationality',nationality)
      formData.append('gender',gender)
      formData.append('dob',dob)
      formData.append('mobileno',mobileNo)
      formData.append('parentmobileno',parentMobileNo)
      formData.append('cstate',cState)
      formData.append('ccity',cCity)
      formData.append('caddress',cAddress)
      formData.append('pstate',pState)
      formData.append('pcity',pCity)
      formData.append('paddress',pAddress)
      formData.append('emailid',emailId)
      formData.append('parentoccupation',parentOccupation)
      formData.append('annualincome',annualIncome)
      formData.append('aadhaarno',aadhaarno)
      formData.append('uploadaadhaar',uploadAadhaar.byte)
      formData.append('domicilestate',domicileState)
      formData.append('uploaddomicle',uploadDomicle.byte)
      formData.append('departmentid',department)
      formData.append('courseid',courses)
      formData.append('password',password)
      formData.append('picture',picture.byte)
      
     

      var result = await postDataAndImage("students/addstudents", formData)

      if (result.result) {
         Swal.fire({
            title: 'LMS',
            text: 'Student Submitted Succesfully',
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
            text: 'Failed to Submit Student',
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
                <Grid container spacing={2}>

                <Grid item xs={12} >
                  <div style={{ fontSize: 20, fontWeight: 'bold', letterSpacing: 1, display: "flex", alignItems: "center", justifyContent: "center",fontStyle:'italic' }} >
                     <img src="/student.png" style={{ height: 50, width: 50, padding: 10 }} />
                     <u>Students Interface</u>
                  </div>
               </Grid>

               <Grid item xs={12} >
                  <div style={{ fontSize: 20,fontStyle:"italic", fontWeight: 'bold', letterSpacing: 1, display: "flex", alignItems: "center",marginBottom:5,textDecorationLine:'underline'}} >
                     Personal Information
                    
                  </div>
               </Grid>
               <Grid item xs={3} >
                  <TextField variant='outlined' fullWidth label='Enrollment Number' value={enrollMentNo} onChange={(event) => setEnrollMentNo(event.target.value)} />
               </Grid>
               
                  
               <Grid item xs={3} >
                  <TextField variant='outlined' fullWidth label='Student Name' value={studentName} onChange={(event) => setStudentName(event.target.value)} />
               </Grid>
               <Grid item xs={3} >
                  <TextField variant='outlined' fullWidth label='Father Name' value={fatherName} onChange={(event) => setFatherName(event.target.value)} />
               </Grid>
               <Grid item xs={3} >
                  <TextField variant='outlined' fullWidth label='Mother Name' value={motherName} onChange={(event) => setMotherName(event.target.value)} />
               </Grid>

               <Grid item xs={2} >
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Category"
                            onChange={handleCategoryChange}
                        >
                            <MenuItem value={"GENERAL"}>General</MenuItem>
                            <MenuItem value={"OBC"}>Other Backward Caste</MenuItem>
                            <MenuItem value={"SC"}>Scheduled Castes</MenuItem>
                            <MenuItem value={"ST"}>Scheduled Tribes</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={2} >
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label1">Nationality</InputLabel>
                        <Select
                            labelId="demo-simple-select-label1"
                            id="demo-simple-select"
                            value={nationality}
                            label="Nationality"
                            onChange={handleNationalityChange}
                        >
                            <MenuItem value={"INDIAN"}>Indian</MenuItem>
                            <MenuItem value={"NRI"}>Non Resident Indian (NRI)</MenuItem>
                        </Select>
                    </FormControl>
                    </Grid>

                    <Grid item xs={4} >

                  <FormControl component="fieldset">

                     <FormLabel component="legend">Gender</FormLabel>
                     <RadioGroup row aria-label="gender"  name="row-radio-buttons-group">

                        <FormControlLabel value="female"  control={<Radio />} onClick={() => handleGender("Female")} label="Female" />
                        <FormControlLabel value="male"  control={<Radio />} onClick={() => handleGender("Male")} label="Male" />
                        <FormControlLabel value="other"  control={<Radio />} onClick={() => handleGender("Other")} label="Other" />

                     </RadioGroup>
                  </FormControl>
               </Grid>
               
               <Grid item xs={4} >
               <div style={{ fontSize: 15,fontStyle:"italic", letterSpacing: 1, display: "flex", alignItems: "center", justifyContent: "left" }} >
                     
                     Date of Birth
                  </div>
                  <TextField variant='outlined' type="date" fullWidth  value={dob} onChange={(event) => setDob(event.target.value)} />
               </Grid>

               <Grid item xs={3} >
               <FormControl fullWidth>
                     <InputLabel id="demo-simple-select-label1">Current State</InputLabel>
                     <Select
                        labelId="demo-simple-select-label1"
                        id="demo-simple-select" 
                        value={cState}
                        label="Current State"
                        onChange={handleCurrentStateChange}
                     >
                        {fillCurrentState()}
                        
                     </Select>
                  </FormControl>
               </Grid>
               <Grid item xs={3} >
               <FormControl fullWidth>
                     <InputLabel id="demo-simple-select-label2">City</InputLabel>
                     <Select
                        labelId="demo-simple-select-label2"
                        id="demo-simple-select" 
                        value={cCity}
                        label="City"
                        onChange={handleCurrentCityChange}
                     >
                        {fillCurrentCities()}
                        
                     </Select>
                  </FormControl>
               </Grid>

               
               <Grid item xs={6} >
                  <TextField variant='outlined' fullWidth label='Current Address' value={cAddress} onChange={(event) => setCaddress(event.target.value)} />
               </Grid>


               <Grid item xs={3} >
               <FormControl fullWidth>
                     <InputLabel id="demo-simple-select-label1">Permanent State</InputLabel>
                     <Select
                        labelId="demo-simple-select-label1"
                        id="demo-simple-select" 
                        value={pState}
                        label="Permanent State"
                        onChange={handlePermanentStateChange}
                     >
                        {fillPermanentState()}
                        
                     </Select>
                  </FormControl>
               </Grid>
               <Grid item xs={3} >
               <FormControl fullWidth>
                     <InputLabel id="demo-simple-select-label2">Permanent City</InputLabel>
                     <Select
                        labelId="demo-simple-select-label2"
                        id="demo-simple-select" 
                        value={pCity}
                        label="Permanent City"
                        onChange={handlePermanentCityChange}
                     >
                        {fillPermanentCities()}
                        
                     </Select>
                  </FormControl>
               </Grid>

               <Grid item xs={6} >
                  <TextField variant='outlined' fullWidth label='Permanent Address' value={pAddress} onChange={(event) => setPaddress(event.target.value)} />
               </Grid>

               <Grid item xs={12} >
                  <div style={{ fontSize: 20, fontWeight: 'bold', letterSpacing: 1, display: "flex", alignItems: "center",fontStyle:'italic'}} >
                  
                    <u>Contact Information</u>
                    <i class="far fa-phone-alt" styles={{paddingLeft:4}}></i>
                  </div>
               </Grid>
                

               <Grid item xs={4} >
                  <TextField variant='outlined' fullWidth label='Mobile Number' value={mobileNo} onChange={(event) => setMobileNo(event.target.value)} />
               </Grid>
               <Grid item xs={4} >
                  <TextField variant='outlined' fullWidth label='Parent Mobile Number' value={parentMobileNo} onChange={(event) => setParentMobileNo(event.target.value)} />
               </Grid>

               <Grid item xs={4} >
                  <TextField variant='outlined' fullWidth label='Email Id' value={emailId} onChange={(event) => setEmailId(event.target.value)} />
               </Grid>
                

               <Grid item xs={12} >
                  <div style={{ fontSize: 20, fontWeight: 'bold', letterSpacing: 1, display: "flex", alignItems: "center",marginBottom:5,textDecorationLine:'underline',fontStyle:"italic"}} >
                     Documentation
                  </div>
               </Grid>
                
              

               <Grid item xs={4} >
                  <TextField variant='outlined' fullWidth label='Parent Occupation' value={parentOccupation} onChange={(event) => setParentOccupation(event.target.value)} />
               </Grid>
               <Grid item xs={4} >
                  <TextField variant='outlined' fullWidth label='Annual Income' value={annualIncome} onChange={(event) => setAnnualIncome(event.target.value)} />
               </Grid>
               <Grid item xs={4} >
                  <TextField variant='outlined' fullWidth label='Aadhaar No' value={aadhaarno} onChange={(event) => setAadhaarno(event.target.value)} />
               </Grid>
               
               <Grid item xs={3} sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                  <label htmlFor="contained-button-file">

                     <input onChange={(event) => handleAadhaarImageChange(event)} accept="image/*" className={classes.inputClasses} id="contained-button-file" multiple type="file" />

                     <Button variant="contained" color="warning" component="span">
                        Upload Aadhaar
                     </Button>
                  </label>
               </Grid>

               <Grid item xs={3} sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                  <Avatar
                     alt="Upload Image"
                     variant="square"
                     src={uploadAadhaar.file}
                     sx={{ width: 100, height: 70 }}
                  />
               </Grid>

               <Grid item xs={3} sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                  <label htmlFor="contained-button-file1">

                     <input onChange={(event) => handleDomicileImageChange(event)} accept="image/*" className={classes.inputClasses} id="contained-button-file1" multiple type="file" />

                     <Button variant="contained" color="warning" component="span">
                        Upload Domicile
                     </Button>
                  </label>
               </Grid>

               <Grid item xs={3} sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                  <Avatar
                     alt="Upload Image"
                     variant="square"
                     src={uploadDomicle.file}
                     sx={{ width: 100, height: 70 }}
                  />
               </Grid>
               

               <Grid item xs={4} >
               <FormControl fullWidth>
                     <InputLabel id="demo-simple-select-label1">Domicile State</InputLabel>
                     <Select
                        labelId="demo-simple-select-label6"
                        id="demo-simple-select6" 
                        value={domicileState}
                        label="Domicile State"
                        onChange={handleDomicileStateChange}
                     >
                        {fillDomicileState()}
                        
                     </Select>
                  </FormControl>
               </Grid>

               <Grid item xs={4} >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label8">Department</InputLabel>
                            <Select
                                labelId="demo-simple-select-label8"
                                id="demo-simple-select8"
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
                            <InputLabel id="demo-simple-select-label9">Courses</InputLabel>
                            <Select
                                labelId="demo-simple-select-label9"
                                id="demo-simple-select"
                                value={courses}
                                label="Courses"
                               onChange={handleCoursesChange}
                            >
                                {fillCourses()}

                            </Select>
                        </FormControl>
                    </Grid>

               <Grid item xs={3} sx={{ display:'flex',justifyContent:'center',alignItems:'center'}}>
                  <Button variant="contained"  onClick={() => handleGeneratePassword()}  fullWidth component="span">
                     Generate Password
                  </Button>
               </Grid>

               
               <Grid item xs={3} >
                  <TextField variant="outlined" type='password' focused value={password} fullWidth label='Password'  />
               </Grid>

               <Grid item xs={3} sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                  <label htmlFor="contained-button-file10">

                     <input onChange={(event) => handlePictureChange(event)} accept="image/*" className={classes.inputClasses} id="contained-button-file10" multiple type="file" />

                     <Button variant="contained" color="warning" component="span">
                        Upload Student Image
                     </Button>
                  </label>
               </Grid>
               
               <Grid item xs={3} sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                  <Avatar
                     alt="Upload Image"
                     variant="square"
                     src={picture.file}
                     sx={{ width: 70, height: 70 }}
                  />
               </Grid>

               <Grid item xs={6}>
                        <Button variant="contained"  onClick={() => handleSubmit()}  color="success" fullWidth component="span">
                            Save Details
                        </Button>
                    </Grid>

                    <Grid item xs={6}>
                        <Button variant="contained" onClick={() => window.location.reload(false)} type="reset" fullWidth component="span" color="error">
                            Reset All
                        </Button>
                    </Grid>



                </Grid>
            </div>
        </div>
    )
}
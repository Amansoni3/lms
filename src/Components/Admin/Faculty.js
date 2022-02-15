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
import DisplayAllFaculty from "./DisplayAllFaculty";


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
      width: 700
   },

   inputClasses: {
      display: 'none'
   },


}))


export default function Faculty(props) {

   const classes = useStyles()

   const [facultyicon, setfacultyicon] = useState({ byte: '', file: '/facultyicon.png' })
   const [firstname, setfirstname] = useState('')
   const [lastname, setlastname] = useState('')
   const [fathername, setfathername] = useState('')
   const [gender, setgender] = useState('')
   const [date, setdate] = useState('')
   const [qualification, setqualification] = useState('')
   const [department, setdepartment] = useState('')
   const [designation, setdesignation] = useState('')
   const [address, setaddress] = useState('')
   const [state, setstate] = useState('')
   const [city, setcity] = useState('')
   const [mobileno, setmobileno] = useState('')
   const [alternatemobileno, setalternatemobileno] = useState('')
   const [email, setemail] = useState('')
   const [password , setPassword] = useState('')

   const [listDepartment, setListDepartment] = useState([])
   const [listStates, setListStates] = useState([])
   const [listCities, setListCities] = useState([])

   const handleSubmit = async () => {

      var formData = new FormData()

      formData.append('icon', facultyicon.byte)
      formData.append('firstname', firstname)
      formData.append('lastname', lastname)
      formData.append('fathername', fathername)
      formData.append('gender', gender)
      formData.append('date', date)
      formData.append('qualification', qualification)
      formData.append('department', department)
      formData.append('address', address)
      formData.append('state', state)
      formData.append('city', city)
      formData.append('mobileno', mobileno)
      formData.append('alternatemobileno', alternatemobileno)
      formData.append('email', email)
      formData.append('designation', designation)
      formData.append('password',password)

      var result = await postDataAndImage("faculty/addfaculty", formData)

      if (result.result) {
         Swal.fire({
            title: 'LMS',
            text: 'Faculty Submitted Succesfully',
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
            text: 'Failed to Submit Faculty',
            imageUrl: '/lms.png',
            imageWidth: 150,
            imageHeight: 150,
            icon: 'error',
            imageAlt: 'Custom image',
         })
      }
      
   }





   const fetchAllDepartments = async () => {

      var result = await getData("department/displayall")
      setListDepartment(result.result)
   }

   const fetchAllStates = async () => {

      var result = await getData("statecity/displayallstates")
      setListStates(result.result)
   }

   const fetchAllCities = async (stateid) => {

      var result = await postData("statecity/displayallcities",{stateid:stateid})
      setListCities(result.result)
   }

   useEffect(function () {
      fetchAllDepartments()
      fetchAllStates()
      
   }, [])

   const handleIconChange = (event) => {
      if (event.target.files.length) {
         setfacultyicon({ byte: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) })
      }
   }

   const handleGender = (gen) => {
      setgender(gen)
   }
    
   const handleDepartmentChange= (event)=>{
         setdepartment(event.target.value)
   }

   const handleStateChange= (event)=>{
      setstate(event.target.value)
      fetchAllCities (event.target.value)
   }

   const handleCityChange= (event)=>{
      setcity(event.target.value)
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


   const fillDepartment=()=>{

      return(listDepartment.map((item)=>{
         return(<MenuItem value={item.departmentid}>{item.departmentname}</MenuItem> )
      }))
   }

   const fillState=()=>{

      return(listStates.map((item)=>{
         return(<MenuItem value={item.stateid}>{item.statename}</MenuItem> )
      }))
   }

   const fillCities=()=>{

      return(listCities.map((item)=>{
         return(<MenuItem value={item.cityid}>{item.cityname}</MenuItem> )
      }))
   }



   return (
      <div className={classes.root}>
         <div className={classes.subdiv}>
            <Grid container spacing={1}>
               <Grid item xs={12} >
                  <div style={{ fontSize: 20, fontWeight: 'bold', letterSpacing: 1, display: "flex", alignItems: "center", justifyContent: "center" }} >
                     <img src="/faculty.png" style={{ height: 50, width: 50, padding: 10 }} />
                     Faculty Interface

                     <div style={{ marginLeft: 'auto' }}>
                                <Button variant="contained" component="span" onClick={() => props.setView(<DisplayAllFaculty />)}>
                                    List Faculty
                                </Button>
                            </div>
                  </div>
               </Grid>

               <Grid item xs={6} sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                  <Avatar
                     alt="Upload Image"
                     variant="square"
                     src={facultyicon.file}
                     sx={{ width: 100, height: 100 }}
                  />
               </Grid>
               <Grid item xs={6} sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                  <label htmlFor="contained-button-file">

                     <input onChange={(event) => handleIconChange(event)} accept="image/*" className={classes.inputClasses} id="contained-button-file" multiple type="file" />

                     <Button variant="contained" color="warning" component="span">
                        Upload Faculty Icon
                     </Button>
                  </label>
               </Grid>

               <Grid item xs={4} >
                  <TextField variant='outlined' fullWidth label='First Name' value={firstname} onChange={(event) => setfirstname(event.target.value)} />
               </Grid>
               <Grid item xs={4} >
                  <TextField variant='outlined' fullWidth label='Last Name' value={lastname} onChange={(event) => setlastname(event.target.value)} />
               </Grid>
               <Grid item xs={4} >
                  <TextField variant='outlined' fullWidth label='Father Name' value={fathername} onChange={(event) => setfathername(event.target.value)} />
               </Grid>
               <Grid item xs={6} >

                  <FormControl component="fieldset">

                     <FormLabel component="legend">Gender</FormLabel>
                     <RadioGroup row aria-label="gender"  name="row-radio-buttons-group">

                        <FormControlLabel value="female"  control={<Radio />} onClick={() => handleGender("Female")} label="Female" />
                        <FormControlLabel value="male"  control={<Radio />} onClick={() => handleGender("Male")} label="Male" />
                        <FormControlLabel value="other"  control={<Radio />} onClick={() => handleGender("Other")} label="Other" />

                     </RadioGroup>
                  </FormControl>
               </Grid>
               <Grid item xs={6} >
                  <TextField variant='outlined' type="date" value={date} fullWidth onChange={(event) => setdate(event.target.value)} />
               </Grid>
               <Grid item xs={4} >
                  <TextField variant='outlined' fullWidth value={qualification} label='Qualification' onChange={(event) => setqualification(event.target.value)} />
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
                  <TextField variant='outlined' fullWidth label='Designation' value={designation} onChange={(event) => setdesignation(event.target.value)} />
               </Grid>
               <Grid item xs={12} >
                  <TextField variant='outlined' fullWidth label='Address' value={address} onChange={(event) => setaddress(event.target.value)} />
               </Grid>
               <Grid item xs={6} >
               <FormControl fullWidth>
                     <InputLabel id="demo-simple-select-label1">States</InputLabel>
                     <Select
                        labelId="demo-simple-select-label1"
                        id="demo-simple-select" 
                        value={state}
                        label="States"
                        onChange={handleStateChange}
                     >
                        {fillState()}
                        
                     </Select>
                  </FormControl>
               </Grid>
               <Grid item xs={6} >
               <FormControl fullWidth>
                     <InputLabel id="demo-simple-select-label2">City</InputLabel>
                     <Select
                        labelId="demo-simple-select-label2"
                        id="demo-simple-select" 
                        value={city}
                        label="City"
                        onChange={handleCityChange}
                     >
                        {fillCities()}
                        
                     </Select>
                  </FormControl>
                  
               </Grid>
               <Grid item xs={4} >
                  <TextField variant='outlined' fullWidth label='Mobile No' value={mobileno} onChange={(event) => setmobileno(event.target.value)} />
               </Grid>
               <Grid item xs={4} >
                  <TextField variant='outlined' fullWidth label='Alternative Mobile Number' value={alternatemobileno} onChange={(event) => setalternatemobileno(event.target.value)} />
               </Grid>
               <Grid item xs={4} >
                  <TextField variant='outlined' type='email' value={email} fullWidth label='Email Id' onChange={(event) => setemail(event.target.value)} />
               </Grid>

               <Grid item xs={8} >
                  <TextField variant="outlined" type='password' focused value={password} fullWidth label='Password'  />
               </Grid>

               <Grid item xs={4} sx={{ display:'flex',justifyContent:'center',alignItems:'center'}}>
                  <Button variant="contained"  onClick={() => handleGeneratePassword()}  fullWidth component="span">
                     Generate Password
                  </Button>
               </Grid>


               <Grid item xs={6}>
                  <Button variant="contained" onClick={() => handleSubmit()} color="success" fullWidth component="span">
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
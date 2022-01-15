import React, { useEffect, useState } from "react"
import MaterialTable from "material-table"
import { makeStyles } from "@mui/styles";
import { ServerURL, postData, postDataAndImage, getData } from "./FetchNodeServices";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Grid, TextField, Button } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Swal from "sweetalert2";
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';


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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function DisplayAllStudents(props) {

  const classes = useStyles()
  const theme = useTheme();

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
  const [currentListStates, setCurrentListStates] = useState([])

  const [permanentListCities, setPermanentListCities] = useState([])
  const [permanentListStates, setPermanentListStates] = useState([])
  const [domicileListStates, setDomicileListStates] = useState([])

  const [listDepartment, setListDepartment] = useState([])
  const [listCourses, setListCourses] = useState([])

  const [open, setOpen] = useState(false)

  const [tempPicture, setTempPicture] = useState({ byte: '', file: '' })
  const [uploadTempDomicle, setuploadTempDomicle] = useState({ byte: '', file: '' })
  const [uploadTempAadhaar , setUploadTempAadhaar] = useState({byte:'' , file:''})
  
  const [gt, setGt] = useState({ female: false, male: false, other: false })

  const [buttonstate1, setbuttonstate1] = useState(false)

  const [buttonstate2, setbuttonstate2] = useState(false)
  const [open1, setOpen1] = useState(false)

  const [buttonstate3, setbuttonstate3] = useState(false)
  const [open2, setOpen2] = useState(false)





  const [listStudents, setListStudents] = useState([])
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };


  const fetchAllStudents = async () => {

    var result = await getData("students/displayallstudents")
    setListStudents(result.result)
  }

  useEffect(function () {
    fetchAllStudents()
  }, [])


  const handleCategoryChange = (event) => {
    setCategory(event.target.value)
  }
  const handleNationalityChange = (event) => {
    setNationality(event.target.value)
  }

  const handleGender = (gen) => {
    if (gen == "Female")
      setGt({ female: true, male: false, other: false })
    else if (gen == "Male")
      setGt({ female: false, male: true, other: false })
    else
      setGt({ female: false, male: false, other: true })

    setGender(gen)
  }

  const handleCurrentStateChange = (event) => {
    setCstate(event.target.value)
    fetchAllCurrentCities(event.target.value)
  }

  const handleCurrentCityChange = (event) => {
    setCcity(event.target.value)
  }
  const fetchAllCurrentStates = async () => {

    var result = await getData("statecity/displayallstates")
    setCurrentListStates(result.result)
  }

  const fetchAllCurrentCities = async (cState) => {

    var result = await postData("statecity/displayallcities", { stateid: cState })
    setCurrentListCities(result.result)
  }

  const fillCurrentState = () => {

    return (currentListStates.map((item) => {
      return (<MenuItem value={item.stateid}>{item.statename}</MenuItem>)
    }))
  }

  const fillCurrentCities = () => {

    return (currentListCities.map((item) => {
      return (<MenuItem value={item.cityid}>{item.cityname}</MenuItem>)
    }))
  }









  const handlePermanentStateChange = (event) => {
    setPstate(event.target.value)
    fetchAllPermanentCities(event.target.value)
  }

  const handleDomicileStateChange = (event) => {
    setDomicileState(event.target.value)

  }

  const fetchAllDomicileStates = async () => {

    var result = await getData("statecity/displayallstates")
    setDomicileListStates(result.result)
  }

  const fillDomicileState = () => {

    return (domicileListStates.map((item) => {
      return (<MenuItem value={item.stateid}>{item.statename}</MenuItem>)
    }))
  }

  const handlePermanentCityChange = (event) => {
    setPcity(event.target.value)
  }
  const fetchAllPermanentStates = async () => {

    var result = await getData("statecity/displayallstates")
    setPermanentListStates(result.result)
  }

  const fetchAllPermanentCities = async (pState) => {

    var result = await postData("statecity/displayallcities", { stateid: pState })
    setPermanentListCities(result.result)
  }

  const fillPermanentState = () => {

    return (permanentListStates.map((item) => {
      return (<MenuItem value={item.stateid}>{item.statename}</MenuItem>)
    }))
  }

  const fillPermanentCities = () => {

    return (permanentListCities.map((item) => {
      return (<MenuItem value={item.cityid}>{item.cityname}</MenuItem>)
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

  const fetchAllCourses = async (department) => {

    var result = await postData("subjects/displayallcoursesbyid", { departmentid: department })
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
    setbuttonstate2(true)
  }

  const handleDomicileImageChange = (event) => {
    if (event.target.files.length) {
      setuploadDomicle({ byte: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) })
    }
    setbuttonstate3(true)
  }

  const handlePictureChange = (event) => {
    if (event.target.files.length) {
      setPicture({ byte: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) })
    }
    setbuttonstate1(true)
  }

  const handleGeneratePassword = () => {

    var list = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', '@', '*', '#', '@', '*', '#', '@', '*', '#']
    var pwd = ""

    for (var i = 1; i <= 8; i++) {
      var c = list[Math.floor(Math.random() * 28)]

      pwd += c
    }
    setPassword(pwd)
  }

  const handleCancel = () => {
    setPicture({ byte: '', file: `${tempPicture.file}` })
    setbuttonstate1(false)
  }




  const handleEdit = (rowData) => {

    // , , fathername, mothername, ,
    //  , , , , parentmobileno, , 
    //  , , pstate, pcity, paddress, , parentoccupation, 
    // annualincome, aadhaarno, uploadaadhaar, domicilestate, uploaddomicle, , courseid, password, picture

    setEnrollMentNo(rowData.enrollmentno)
    setStudentName(rowData.studentname)
    setCategory(rowData.category)
    setNationality(rowData.nationality)
    setGender(rowData.gender)
    setDob(rowData.dob)
    setMobileNo(rowData.mobileno)
    setCstate(rowData.cstate)
    setCcity(rowData.ccity)
    setCaddress(rowData.caddress)
    setEmailId(rowData.emailid)
    setDepartment(rowData.departmentid)
    setCourses(rowData.courseid)
    fetchAllCourses(rowData.departmentid)
    setPassword(rowData.password)
    fetchAllCurrentCities(rowData.cstate)

    setPicture({ byte: '', file: `${ServerURL}/images/${rowData.picture}` })

    setTempPicture({ byte: '', file: `${ServerURL}/images/${rowData.picture}` })


    if (rowData.gender == "Female")
      setGt({ female: true, male: false, other: false })
    else if (rowData.gender == "Male")
      setGt({ female: false, male: true, other: false })
    else
      setGt({ female: false, male: false, other: true })


    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  const handleEditIcon = async () => {
    var formData = new FormData()

    formData.append('enrollmentno', enrollMentNo)
    formData.append('icon', picture.byte)
    setOpen(false)
    var result = await postDataAndImage("students/editstudentpicture", formData)
    if (result.result) {
      Swal.fire({
        title: 'LMS',
        text: 'Picture Edited Succesfully',
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
        text: 'Faied to Edit Picture',
        imageUrl: '/lms.png',
        imageWidth: 150,
        imageHeight: 150,
        icon: 'error',
        imageAlt: 'Custom image',
      })
    }
    setbuttonstate1(false)
    fetchAllStudents()
  }

  const handleEditData = async () => {

    setOpen(false)

    var body = { enrollmentno: enrollMentNo, studentname: studentName, category: category, nationality: nationality, gender: gender, dob: dob, mobileno: mobileNo, cstate: cState, ccity: cCity, caddress: cAddress, emailid: emailId, departmentid: department, courseid: courses, password: password }

    var result = await postData("students/editstudents", body)
    if (result.result) {
      Swal.fire({
        title: 'LMS',
        text: 'Student Edited Succesfully',
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
        text: 'Faied to Edit',
        imageUrl: '/lms.png',
        imageWidth: 150,
        imageHeight: 150,
        icon: 'error',
        imageAlt: 'Custom image',
      })
    }

    fetchAllStudents()
  }

  const handleDeleteData = async (enrollMentNo) => {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {

        var body = { enrollmentno: enrollMentNo }

        var result = await postData("students/deletestudents", body)

        if (result.result)
          Swal.fire(
            'Deleted!',
            'Students has been deleted.',
            'success'
          )

        else
          Swal.fire(
            'Deleted!',
            'Fail To Delete Students',
            'error'
          )
      }
      fetchAllStudents()
    })
  }


  const handleParentClose = () => {
    setOpen1(false);
  };

  const handleEditParents = (rowData) => {

    // , , fathername, mothername, ,
    //  , , , , parentmobileno, , 
    //  , , pstate, pcity, paddress, , parentoccupation, 
    // annualincome, aadhaarno, uploadaadhaar, domicilestate, uploaddomicle, , courseid, password, picture

    setEnrollMentNo(rowData.enrollmentno)
    setFatherName(rowData.fathername)
    setMotherName(rowData.mothername)
    setParentMobileNo(rowData.parentmobileno)
    setPstate(rowData.pstate)
    setPcity(rowData.pcity)
    setPaddress(rowData.paddress)
    setParentOccupation(rowData.parentoccupation)
    setAnnualIncome(rowData.annualincome)
    setAadhaarno(rowData.aadhaarno)
    setDomicileState(rowData.domicilestate)

    fetchAllPermanentCities(rowData.pstate)
    


    
    setuploadDomicle({ byte: '', file: `${ServerURL}/images/${rowData.uploaddomicle}` })

    setUploadAadhaar({ byte: '', file: `${ServerURL}/images/${rowData.uploadaadhaar}` } )

    setuploadTempDomicle({ byte: '', file: `${ServerURL}/images/${rowData.uploaddomicle}` })

    setUploadTempAadhaar({ byte: '', file: `${ServerURL}/images/${rowData.uploadaadhaar}` } )

   
    setOpen1(true);
  };

  
  const handleCancelAadhaar = () => {
    setUploadAadhaar({ byte: '', file: `${uploadTempAadhaar.file}` })
    setbuttonstate2(false)
  }

  const handleCancelDomicile = () => {
    setuploadDomicle({ byte: '', file: `${uploadTempDomicle.file}` })
    setbuttonstate3(false)
  }


  const handleEditAadhaar = async () => {
    var formData = new FormData()

    formData.append('enrollmentno', enrollMentNo)
    formData.append('icon', uploadAadhaar.byte)
    setOpen1(false)

    var result = await postDataAndImage("students/editstudentaadhaar", formData)

    if (result.result) {
      Swal.fire({
        title: 'LMS',
        text: 'Aadhaar Edited Succesfully',
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
        text: 'Faied to Edit Aadhaar',
        imageUrl: '/lms.png',
        imageWidth: 150,
        imageHeight: 150,
        icon: 'error',
        imageAlt: 'Custom image',
      })
    }
    setbuttonstate2(false)
    fetchAllStudents()
  }

  const handleEditDomicile = async () => {
    var formData = new FormData()

    formData.append('enrollmentno', enrollMentNo)
    formData.append('icon', uploadDomicle.byte)
    setOpen1(false)

    var result = await postDataAndImage("students/editstudentdomicile", formData)

    if (result.result) {
      Swal.fire({
        title: 'LMS',
        text: 'Domicile Edited Succesfully',
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
        text: 'Faied to Edit Domicile',
        imageUrl: '/lms.png',
        imageWidth: 150,
        imageHeight: 150,
        icon: 'error',
        imageAlt: 'Custom image',
      })
    }
    setbuttonstate3(false)
    fetchAllStudents()
  }

  const handleParentDataEdit = async () => {
     

    setOpen1(false)

    var body = { enrollmentno: enrollMentNo, fathername:fatherName,mothername:motherName,parentmobileno:parentMobileNo,pstate:pState,pcity:pCity,paddress:pAddress,parentoccupation:parentOccupation,annualincome:annualIncome,aadhaarno:aadhaarno,domicilestate:domicileState}

    var result = await postData("students/editstudentparentsdata", body)
    if (result.result) {
      Swal.fire({
        title: 'LMS',
        text: 'Student Edited Succesfully',
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
        text: 'Faied to Edit',
        imageUrl: '/lms.png',
        imageWidth: 150,
        imageHeight: 150,
        icon: 'error',
        imageAlt: 'Custom image',
      })
    }

    fetchAllStudents()
   
  }


 



  const showDialogParents = () => {

    return (

      <Dialog
        open={open1}
        TransitionComponent={Transition}
        fullWidth
        maxWidth='md'
        keepMounted
        onClose={handleParentClose}
        aria-describedby="alert-dialog-slide-description"
      >
        
        <DialogContent>
              
        <Grid container spacing={1}>
        <Grid item xs={12} >
                  <div style={{ fontSize: 20, fontWeight: 'bold', letterSpacing: 1, display: "flex", alignItems: "center", justifyContent: "center",fontStyle:'italic' }} >
                     <img src="/student.png" style={{ height: 50, width: 50, padding: 10 }} />
                     <u>Students Interface</u>
                  </div>
               </Grid>

               
            
               <Grid item xs={3} >
                  <TextField variant='outlined' fullWidth label='Father Name' value={fatherName} onChange={(event) => setFatherName(event.target.value)} />
               </Grid>
               <Grid item xs={3} >
                  <TextField variant='outlined' fullWidth label='Mother Name' value={motherName} onChange={(event) => setMotherName(event.target.value)} />
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


            
               <Grid item xs={3} >
                  <TextField variant='outlined' fullWidth label='Parent Mobile Number' value={parentMobileNo} onChange={(event) => setParentMobileNo(event.target.value)} />
               </Grid>


               <Grid item xs={3} >
                  <TextField variant='outlined' fullWidth label='Parent Occupation' value={parentOccupation} onChange={(event) => setParentOccupation(event.target.value)} />
               </Grid>
               <Grid item xs={3} >
                  <TextField variant='outlined' fullWidth label='Annual Income' value={annualIncome} onChange={(event) => setAnnualIncome(event.target.value)} />
               </Grid>
               <Grid item xs={3} >
                  <TextField variant='outlined' fullWidth label='Aadhaar No' value={aadhaarno} onChange={(event) => setAadhaarno(event.target.value)} />
               </Grid>

               <Grid item xs={6} >
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

                {buttonstate2 ? <><Button onClick={() => handleEditAadhaar()}>Save</Button><Button onClick={() => handleCancelAadhaar()}>Cancel</Button></> : <></>}

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
                       
                       {buttonstate3 ? <><Button onClick={() => handleEditDomicile()}>Save</Button><Button onClick={() => handleCancelDomicile()}>Cancel</Button></> : <></>}


               </Grid>
               
              
        </Grid>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleParentDataEdit}>Edit</Button>
          <Button onClick={handleParentClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

    )
  }




  const showDialogStudent = () => {

    return (

      <div>

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          fullWidth
          maxWidth='md'
          maxHeight='80vh'
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >

          <DialogContent>


            <Grid container spacing={3}>

              <Grid item xs={12} >
                <div style={{ fontSize: 20, fontWeight: 'bold', letterSpacing: 1, display: "flex", alignItems: "center", justifyContent: "center", fontStyle: 'italic' }} >

                  <u>Edit Students Interface</u>
                </div>
              </Grid>


              <Grid item xs={4} >
                <TextField variant='outlined' fullWidth label='Student Name' value={studentName} onChange={(event) => setStudentName(event.target.value)} />
              </Grid>


              <Grid item xs={4} >
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

              <Grid item xs={4} >
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

              <Grid item xs={6} >

                <FormControl component="fieldset">

                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup row aria-label="gender" name="row-radio-buttons-group">

                    <FormControlLabel value="female" control={<Radio checked={gt.female} />} onClick={() => handleGender("Female")} label="Female" />
                    <FormControlLabel value="male" control={<Radio checked={gt.male} />} onClick={() => handleGender("Male")} label="Male" />
                    <FormControlLabel value="other" control={<Radio checked={gt.other} />} onClick={() => handleGender("Other")} label="Other" />

                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={6} >
                <div style={{ fontSize: 15, fontStyle: "italic", letterSpacing: 1, display: "flex", alignItems: "center", justifyContent: "left" }} >

                  Date of Birth
                </div>
                <TextField variant='outlined' type="date" fullWidth value={dob} onChange={(event) => setDob(event.target.value)} />
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
                <TextField variant='outlined' fullWidth label='Mobile Number' value={mobileNo} onChange={(event) => setMobileNo(event.target.value)} />
              </Grid>

              <Grid item xs={3} >
                <TextField variant='outlined' fullWidth label='Email Id' value={emailId} onChange={(event) => setEmailId(event.target.value)} />
              </Grid>

              <Grid item xs={3} >
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


              <Grid item xs={3} >
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

              <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button variant="contained" onClick={() => handleGeneratePassword()} fullWidth component="span">
                  Generate Password
                </Button>
              </Grid>


              <Grid item xs={3} >
                <TextField variant="outlined" type='password' focused value={password} fullWidth label='Password' />
              </Grid>

              <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <label htmlFor="contained-button-file10">

                  <input onChange={(event) => handlePictureChange(event)} accept="image/*" className={classes.inputClasses} id="contained-button-file10" multiple type="file" />

                  <Button variant="contained" fullWidth component="span">
                    Upload Image
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


                {buttonstate1 ? <><Button onClick={() => handleEditIcon()}>Save</Button><Button onClick={() => handleCancel()}>Cancel</Button></> : <></>}

              </Grid>

            </Grid>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditData}>Edit</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }

  function DisplayAll() {
    return (
      <Box sx={{ bgcolor: 'background.paper' }}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Student Details" {...a11yProps(0)} />
            <Tab label="Parents Detail" {...a11yProps(1)} />


          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <MaterialTable
              title="List of Students"
              columns={[
                { title: 'Enrollment No ', field: 'enrollmentno' },

                { title: 'Name', field: 'studentname' },

                { title: 'Nationality/Category', render: (rowData) => (<div>{rowData.nationality}<br />{rowData.category}</div>) },

                { title: 'Gender/DOB', render: (rowData) => (<div>{rowData.gender}<br />{rowData.dob}</div>) },

                { title: 'Address', render: (rowData) => (<div>{rowData.caddress}, {rowData.ccityname}, {rowData.cstatename}</div>) },

                { title: 'Contact Details', field: 'mobileno', render: (rowData) => (<div>{rowData.mobileno}<br />{rowData.emailid}</div>) },

                {
                  title: 'Student Image', field: 'picture',
                  render: rowData => <img src={`${ServerURL}/images/${rowData.picture}`} style={{ width: 70 }} />
                },


                { title: 'Department Name', field: 'departmentname' },

                { title: 'Course Name', field: 'coursename' },


              ]}
              data={listStudents}
              actions={[
                {
                  icon: 'edit',
                  tooltip: 'Edit Students',
                  onClick: (event, rowData) => handleEdit(rowData)
                },
                {
                  icon: 'delete',
                  tooltip: 'Delete',
                  onClick: (event, rowData) => handleDeleteData(rowData.enrollmentno)

                },

              ]}
            />

          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <MaterialTable
              title="Parents Details"
              columns={[
                { title: 'Enrollment No ', field: 'enrollmentno' },

                { title: 'Parents Name', render: (rowData) => (<div>Mr.{rowData.fathername}<br /><br />Mrs.{rowData.mothername}</div>) },

                { title: 'Permanent Address', render: (rowData) => (<div>{rowData.paddress}, {rowData.pcityname}, {rowData.pstatename}</div>) },
                { title: 'Occupation', field: 'parentoccupation' },
                { title: 'Annual Income', field: 'annualincome' },
                { title: 'Contact Details', field: 'parentmobileno' },

                { title: 'Aadhaar No', field: 'aadhaarno' },
                {
                  title: 'Aadhaar Image', field: 'picture',
                  render: rowData => <img src={`${ServerURL}/images/${rowData.uploadaadhaar}`} style={{ width: 80 }} />
                },

                { title: 'Domicile State', field: 'dstatename' },
                {
                  title: 'Domicile Image', field: 'picture',
                  render: rowData => <img src={`${ServerURL}/images/${rowData.uploaddomicle}`} style={{ width: 80 }} />
                },

              ]}
              data={listStudents}
              actions={[
                {
                  icon: 'edit',
                  tooltip: 'Edit Students',
                  onClick: (event, rowData) => handleEditParents(rowData)
                },
                {
                  icon: 'delete',
                  tooltip: 'Delete',
                  onClick: (event, rowData) => handleDeleteData(rowData.enrollmentno)
                },

              ]}
            />

          </TabPanel>
        </SwipeableViews>
      </Box>
    )
  }




  return (
    <div>
      {showDialogStudent()}
      {showDialogParents()}
      {DisplayAll()}

    </div>
  )
}
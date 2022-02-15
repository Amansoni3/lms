import React , {useEffect,useState} from "react"
import MaterialTable from '@material-table/core';
import { makeStyles } from "@mui/styles";
import { ServerURL,postData,postDataAndImage,getData } from "./FetchNodeServices";
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

export default function DisplayAllFaculty(props){

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
   const [facultyId,setFacultyId] = useState('')

   const [gt,setGt] = useState({female:false,male:false,other:false})
   
   const [tempicon , settempicon] = useState({byte:'',file:''})

   const [listDepartment, setListDepartment] = useState([])
   const [listStates, setListStates] = useState([])
   const [listCities, setListCities] = useState([])
    
    const [listfaculty,setlistfaculty] = useState([])

    const [open,setOpen]=useState()

    const [buttonstate,setbuttonstate] = useState(false)
    
    const fetchallfaculty = async() => {
        
        var result = await getData("faculty/displayallfaculty")
        setlistfaculty(result.result)
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
      setbuttonstate(true)
   }

   const handleGender = (gen) => {

      if(gen=="Female")
      setGt({female:true,male:false,other:false})
      else if(gen=="Male")
      setGt({female:false,male:true,other:false})
      else
      setGt({female:false,male:false,other:true})
      
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

   const handleCancel=()=>{
      setfacultyicon({byte:'',file:`${tempicon.file}`})
       setbuttonstate(false)
       
       
       
   }

   const handleEditIcon=async()=>{
      var formData = new FormData()
     
      formData.append('facultyid',facultyId)
      formData.append('icon',facultyicon.byte)
      setOpen(false)
      var result = await postDataAndImage("faculty/editfacultyicon",formData)
      if(result.result)
      {
          Swal.fire({
              title: 'LMS',
              text: 'Icon Edited Succesfully',
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
              text: 'Faied to Edit Icon',
              imageUrl: '/lms.png',
              imageWidth: 150,
              imageHeight: 150,
              icon:'error',
              imageAlt: 'Custom image',
          })
      }
      setbuttonstate(false)
      fetchallfaculty()
   }

   const handleEditData = async() =>{
      
      setOpen(false)

      var body = {facultyid:facultyId, firstname:firstname, lastname:lastname, fathername:fathername, gender:gender, dob:date, qualification:qualification, department:department, address:address, state:state, city:city, mobileno:mobileno, alternatemobileno:alternatemobileno, emailid:email, designation:designation, password:password}    
   
      var result = await postData("faculty/editfaculty",body)
      if(result.result)
      {
          Swal.fire({
              title: 'LMS',
              text: 'Faculty Edited Succesfully',
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
      
      fetchallfaculty()
   }

   const handleDeleteData =async(facultyid)=>{

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
 
           var body = {facultyid:facultyid}
       
           var result = await postData("faculty/deletefaculty",body)
           
           if(result.result)
           Swal.fire(
             'Deleted!',
             'Faculty has been deleted.',
             'success'
           )
         
         else
         Swal.fire(
           'Deleted!',
           'Fail To Delete faculty',
           'error'
         )
         }
         fetchallfaculty()
       })
       

   }


  
    useEffect(function(){
    fetchallfaculty()
    fetchAllDepartments()
    },[])

    const handleClose=()=>{
        setOpen(false)
    }

    const handleEdit=(rowData)=>{

      setFacultyId(rowData.facultyid)
      setfirstname(rowData.firstname)
      setlastname(rowData.lastname)
      setfathername(rowData.fathername)
      setgender(rowData.gender)
      setdate(rowData.dob)
      setqualification(rowData.qualification)
      setdepartment(rowData.department)
      setdesignation(rowData.designation)
      setaddress(rowData.address)
      setstate(rowData.state)
      setcity(rowData.city)
      setmobileno(rowData.mobileno)
      setalternatemobileno(rowData.alternatemobileno)
      setemail(rowData.emailid)
      setPassword(rowData.password)
      setfacultyicon({byte:'',file:`${ServerURL}/images/${rowData.picture}`})

      settempicon({byte:'',file:`${ServerURL}/images/${rowData.picture}`})

      fetchAllCities(rowData.state)

      if(rowData.gender=="Female")
      setGt({female:true,male:false,other:false})
      else if(rowData.gender=="Male")
      setGt({female:false,male:true,other:false})
      else
      setGt({female:false,male:false,other:true})

      setOpen(true)
    }


    const showDialog = () => {

      return(

        <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth='md'
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
        <DialogTitle id="alert-dialog-title">
          {"Edit Faculty"}
        </DialogTitle>
        <DialogContent>
          
        <Grid container spacing={1}>
               <Grid item xs={12} >
                  <div style={{ fontSize: 20, fontWeight: 'bold', letterSpacing: 1, display: "flex", alignItems: "center", justifyContent: "center" }} >
                     <img src="/faculty.png" style={{ height: 50, width: 50, padding: 10 }} />
                     Faculty Interface
                  </div>
               </Grid>

               <Grid item xs={6} sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                  <Avatar
                     alt="Upload Image"
                     variant="square"
                     src={facultyicon.file}
                     sx={{ width: 100, height: 100 }}
                  />
                  
               {buttonstate?<><Button onClick={() => handleEditIcon()}>Save</Button><Button onClick={() => handleCancel()}>Cancel</Button></>:<></>} 
               
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
                  <TextField variant='outlined' value={firstname} fullWidth label='First Name' onChange={(event) => setfirstname(event.target.value)} />
               </Grid>
               <Grid item xs={4} >
                  <TextField variant='outlined' fullWidth value={lastname} label='Last Name' onChange={(event) => setlastname(event.target.value)} />
               </Grid>
               <Grid item xs={4} >
                  <TextField variant='outlined' fullWidth label='Father Name' value={fathername} onChange={(event) => setfathername(event.target.value)} />
               </Grid>
               <Grid item xs={6} >

                  <FormControl component="fieldset">

                     <FormLabel component="legend">Gender</FormLabel>
                     <RadioGroup row aria-label="gender"  name="row-radio-buttons-group">

                        <FormControlLabel value="Female" control={<Radio checked={gt.female} />} onClick={() => handleGender("Female")} label="Female" />
                        <FormControlLabel value="Male" control={<Radio checked={gt.male} />} onClick={() => handleGender("Male")} label="Male" />
                        <FormControlLabel value="Other" control={<Radio checked={gt.other} />} onClick={() => handleGender("Other")} label="Other" />

                     </RadioGroup>
                  </FormControl>
               </Grid>
               <Grid item xs={6} >
                  <TextField variant='outlined' type="date" value={date} fullWidth onChange={(event) => setdate(event.target.value)} />
               </Grid>
               <Grid item xs={4} >
                  <TextField variant='outlined' fullWidth label='Qualification' value={qualification} onChange={(event) => setqualification(event.target.value)} />
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
                  <TextField variant='outlined' value={designation} fullWidth label='Designation' onChange={(event) => setdesignation(event.target.value)} />
               </Grid>
               <Grid item xs={12} >
                  <TextField variant='outlined' value={address} fullWidth label='Address' onChange={(event) => setaddress(event.target.value)} />
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
                  <TextField variant='outlined' value={mobileno} fullWidth label='Mobile No' onChange={(event) => setmobileno(event.target.value)} />
               </Grid>
               <Grid item xs={4} >
                  <TextField variant='outlined' value={alternatemobileno} fullWidth label='Alternative Mobile Number' onChange={(event) => setalternatemobileno(event.target.value)} />
               </Grid>
               <Grid item xs={4} >
                  <TextField variant='outlined' value={email} type='email' fullWidth label='Email Id' onChange={(event) => setemail(event.target.value)} />
               </Grid>

               <Grid item xs={8} >
                  <TextField variant="outlined" type='password' focused value={password} fullWidth label='Password'  />
               </Grid>

               <Grid item xs={4} sx={{ display:'flex',justifyContent:'center',alignItems:'center'}}>
                  <Button variant="contained"  onClick={() => handleGeneratePassword()}  fullWidth component="span">
                     Generate Password
                  </Button>
               </Grid>


            </Grid>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} onClick={() => handleEditData()} >Edit</Button>
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
            title="List of Faculties"
            columns={[
              { title: 'Faculty Id', field: 'facultyid' },
              
              { title: 'Name',   render:(rowData)=>(<div>{rowData.firstname} {rowData.lastname}</div>)},

              { title: 'Father Name', field: 'fathername' },

              { title: 'Gender/DOB', render:(rowData)=>(<div>{rowData.gender}<br/>{rowData.dob}</div>)},
        
              { title: 'Qualification/Designation', render:(rowData)=>(<div>{rowData.qualification}<br/>{rowData.departmentname}<br/>{rowData.designation}</div>)},
              
              { title: 'Address', render:(rowData)=>(<div>{rowData.address}, {rowData.cityname}, {rowData.statename}</div>)},
            
              { title: 'Contact Details', field: 'mobileno' , render:(rowData)=>(<div>{rowData.mobileno}<br/>{rowData.alternatemobileno}<br/>{rowData.emailid}</div>)},
              
              
              
              { title: 'Faculty Icon', field: 'picture',
              render: rowData => <img src={`${ServerURL}/images/${rowData.picture}`} style={{width: 70}}/>          
            },

            ]}
            data={listfaculty}  
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Faculty',
                onClick: (event, rowData) => handleEdit(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete',
                onClick: (event, rowData) => handleDeleteData(rowData.facultyid)
              },
              
            ]}
          />
        )
      }

      
      return(
          <div className={classes.root}>
              <div className={classes.subdiv}>
              {DisplayAll()}
              {showDialog()}
              </div>
          </div>
      )
}
import React , {useEffect,useState} from "react"
import MaterialTable from "material-table"
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


export default function DisplayAllCourses(props) {
    const classes = useStyles()

    const [listCourses,setListCourses] = useState([])
    const [courseId,setCourseId] = useState('')
    const [courseIcon, setCourseIcon] = useState({ byte: '', file: '/uploadicon.png' })
    const [tempicon , settempicon] = useState({byte:'',file:''})
    const [courseName,setCourseName] = useState('')
    const [noSemester,setNoSemester] = useState('')
    const [department,setDepartment] = useState('')
    const [feePerSemester,setFeePerSemester] = useState('')
    const [open,setOpen] = useState(false)
    

    const[listDepartment,setListDepartment] = useState([])

    const [buttonstate,setbuttonstate] = useState(false)
    
    const handleIconChange = (event) => {
        if (event.target.files.length) {
            setCourseIcon({ byte: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) })
            setbuttonstate(true)
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
      
      const handleCancel = () =>{
        setCourseIcon({byte:'',file:`${tempicon.file}`})
         setbuttonstate(false)
         
      }


    const fetchAllCourses = async() => {
        
        var result = await getData("courses/displayallcourses")
        setListCourses(result.result)
    }

    const handleEdit=(rowData)=>{

        setCourseId(rowData.courseid)
        setDepartment(rowData.departmentid)
        setNoSemester(rowData.nosemester)
        setFeePerSemester(rowData.feepersemester)
        setCourseName(rowData.coursename)
        setCourseIcon({byte:'',file:`${ServerURL}/images/${rowData.icon}`})
        settempicon({byte:'',file:`${ServerURL}/images/${rowData.icon}`})

        setOpen(true)
    }


    const handleEditIcon = async() =>{
      var formData = new FormData()
     
      formData.append('courseid',courseId)
      formData.append('icon',courseIcon.byte)
      setOpen(false)
      var result = await postDataAndImage("courses/editcoursesicon",formData)
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
      fetchAllCourses()
    }


    const handleEditData = async() =>{
      
      setOpen(false)

      var body = {courseid:courseId, departmentid:department, coursename:courseName, nosemester:noSemester, feepersemester:feePerSemester}    
   
      var result = await postData("courses/editcourses",body)
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
      
      fetchAllCourses()
   }


    const handleClose = () =>{
        setOpen(false)
      }
  

      const handleDeleteData =async(courseid)=>{

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
   
             var body = {courseid:courseid}
         
             var result = await postData("courses/deletecourses",body)
             
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
           fetchAllCourses()
         })
         
  
     }
  
  
    

    useEffect(function(){
        fetchAllCourses()
    },[])

    const showDialog = () =>{

        return(
          <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
               
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

                    <Grid item xs={12} sx={{ display:"flex" , justifyContent:"left", alignItems:"center",marginLeft:8 }}>
                    {buttonstate?<><Button onClick={()=>handleEditIcon()}>Save</Button><Button onClick={()=>handleCancel()}>Cancel</Button></>:<></>}
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
            title="List of Courses"
            columns={[
              { title: 'Course Id', field: 'courseid' },
              { title: 'Department Name', field: 'departmentname' },
              { title: 'No of Semester', field: 'nosemester' },
              { title: 'Course Name', field: 'coursename' },
              { title: 'Fees Per Semester', field: 'feepersemester' },
              { title: 'Courses Icon', field: 'icon',
              render: rowData => <img src={`${ServerURL}/images/${rowData.icon}`} style={{width: 70}}/>          
            },
              
            ]}

            data={listCourses}  
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Courses',
                onClick: (event, rowData) => handleEdit(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Courses',
                onClick: (event, rowData) => handleDeleteData(rowData.courseid)
              }

            ]}
          />
        )
      }


    return(
        <div>
             <div className={classes.root}>
              <div className={classes.subdiv}>
              {DisplayAll()}
              {showDialog()}
              </div>
          </div>
        </div>
    )
}
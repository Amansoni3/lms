import React , {useEffect,useState} from "react"
import MaterialTable from "material-table"
import { makeStyles , styled } from "@mui/styles";
import { ServerURL,postData,postDataAndImage,getData } from "./FetchNodeServices";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import { Grid, TextField} from "@mui/material"
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
        width: 1300
    },

    inputClasses: {
      display: 'none'
  },
}))

export default function DisplayAllDepartment(props){
    
    const classes = useStyles()
    
    const [listDepartment,setListDepartment] = useState([])
    const [open,setOpen] = useState(false)
    
    const [depid,setdepid] = useState()
    
    const [depicon , setdepicon] = useState({byte:'',file:'/department.png'})
    const [tempicon , settempicon] = useState({byte:'',file:''})

    const [departmentName,setDepartmentName] = useState()
    
    const [buttonstate,setbuttonstate] = useState(false)
    
    const fetchAllDepartments = async() => {
        
        var result = await getData("department/displayall")
        setListDepartment(result.result)
    }

     
    useEffect(function(){
    fetchAllDepartments()
    },[])

    

    const handleClose = () =>{
      setOpen(false)
    }

    const handleCancel = () =>{
      setdepicon({byte:'',file:`${tempicon.file}`})
       setbuttonstate(false)
    }

    const handleEdit = (rowData) =>{
        
        setdepid(rowData.departmentid)
        setDepartmentName(rowData.departmentname)
        setdepicon({byte:'',file:`${ServerURL}/images/${rowData.departmenticon}`})
        settempicon({byte:'',file:`${ServerURL}/images/${rowData.departmenticon}`})
        setOpen(true)
    }

    const handleEditData = async() =>{
      
      setOpen(false)
      var body = {departmentname:departmentName,departmentid:depid}
      
      var result = await postData("department/editdepartment",body)
      if(result.result)
      {
          Swal.fire({
              title: 'LMS',
              text: 'Department Edited Succesfully',
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
      
      fetchAllDepartments()
    }

    const handleDeleteData = async(depid) =>{
     
     

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

          var body = {departmentid:depid}
      
          var result = await postData("department/deletedepartment",body)
          
          if(result.result)
          Swal.fire(
            'Deleted!',
            'Department has been deleted.',
            'success'
          )
        
        else
        Swal.fire(
          'Deleted!',
          'Fail To Delete Department.',
          'error'
        )
        }
        fetchAllDepartments()
      })
      
    }

    const handleEditIcon = async() =>{
      var formData = new FormData()
     
      formData.append('departmentid',depid)
      formData.append('icon',depicon.byte)
      setOpen(false)
      var result = await postDataAndImage("department/editdepartmenticon",formData)
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
      fetchAllDepartments()
    }

    const handleIconChange = (event)=>{
      if(event.target.files.length){
          setdepicon({byte:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
          setbuttonstate(true)
      }
  }


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
                        <div style={{ fontSize: 20, fontWeight: 'bold', letterSpacing: 1, display: "flex", alignItems: "center" }} >
                            <img src="/dep.png" style={{ height: 60, width: 60, }} />
                            Department Interface
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField value={departmentName} variant='outlined' onChange={(event)=>setDepartmentName(event.target.value)} fullWidth label='Department Name' />
                    </Grid>

                    <Grid item xs={12} sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                        <label htmlFor="contained-button-file">
                            <input onChange={(event)=>handleIconChange(event)} accept="image/*" className={classes.inputClasses} id="contained-button-file" multiple type="file" />
                            <Button variant="contained" color="warning" component="span">
                                Edit Department Icon
                            </Button>
                        </label>
                    </Grid>

                    <Grid item xs={12} sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                        <Avatar
                            alt="Upload Image"
                            variant="square"
                            src={depicon.file}
                            sx={{ width: 150, height: 150 }}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ display:"flex" , justifyContent:"center", alignItems:"center" }}>
                    {buttonstate?<><Button onClick={()=>handleEditIcon()}>Save</Button><Button onClick={()=>handleCancel()}>Cancel</Button></>:<></>}
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
            title="List of Departments"
            columns={[
              { title: 'Department Id', field: 'departmentid' },
              { title: 'Department Name', field: 'departmentname' },
              { title: 'Department Icon', field: 'departmenticon',
              render: rowData => <img src={`${ServerURL}/images/${rowData.departmenticon}`} style={{width: 70}}/>          
            },
              
            ]}
            data={listDepartment}  
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Department',
                onClick: (event, rowData) => handleEdit(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Department',
                onClick: (event, rowData) => handleDeleteData(rowData.departmentid)
              }

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
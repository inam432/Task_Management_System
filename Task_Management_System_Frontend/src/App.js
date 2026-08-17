import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import { useEffect, useState } from 'react';
import axios from "axios";
function App() {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let [name,setNAME]=useState("")
  let [email,setEMAIL]=useState("")
  let [password,setPASSWORD]=useState("")
  let [phonenumber,setPHONENUMBER]=useState("")
  let [name2,setNAME2]=useState("")
  let [email2,setEMAIL2]=useState("")
  let [password2,setPASSWORD2]=useState("")
  let [phonenumber2,setPHONENUMBER2]=useState("")
  let [totalTasks,setTotalTasks]=useState([])
  let [taskIds,setTaskIds]=useState([])
  let [deadlines,setDeadlines]=useState([])
  let [completedTasks,setCompletedTasks]=useState([])
  let [pendingTasks,setPendingTasks]=useState([])
  const [taskCheck, setTaskCheck]=useState(''); 
  const [showLogin, setShowLogin]=useState(false);
  const [showDashboard, setShowDashboard]=useState(false);
  const [showTaskAdd, setShowTaskAdd]=useState(false);
  const [searchTask, setSearchTask]=useState("");
  let lowerTotalTasks=[]
  lowerTotalTasks=totalTasks.map((i)=>{return i.toLowerCase()})
  const searchDeadlineIndex=lowerTotalTasks.indexOf(searchTask.toLowerCase());
  async function getAllTasks(){
    const res = await axios.get(
      `https://task-management-system-g6of.onrender.com/api/getTasks/${email2}`
  );
  const taskNames = res.data.map((task)=>{return task.taskName});
  const taskDeadlines = res.data.map((task)=>{return task.deadline});
  const idsTask = res.data.map((task)=>{return task._id});
   var updatedDeadlines=taskDeadlines
var updatedTasks=taskNames;
var updatedIds=idsTask;
var indexArray=updatedDeadlines.map((d,i)=>{
return i;
});
indexArray.sort(function(a,b){
return new Date(updatedDeadlines[a])-new Date(updatedDeadlines[b]);
});
var sortedDeadlines=indexArray.map((i)=>{
return updatedDeadlines[i];
});
var sortedTasks=indexArray.map((i)=>{
return updatedTasks[i];
});
var sortedIds=indexArray.map((i)=>{
return updatedIds[i];
});
setDeadlines(sortedDeadlines);
setTotalTasks(sortedTasks);
setTaskIds(sortedIds);
  }
  async function updateTasks(v,i){
const taskName = prompt("Enter Task Name",v);
const taskDeadline = 
prompt("Enter Task Deadline",deadlines[i]);if(taskDeadline.value!==''&&taskName.value!==''){
  await axios.put(
    `https://task-management-system-g6of.onrender.com/api/updateTask/${taskIds[i]}`,
    {
        taskName,
        taskDeadline
    }
);
getAllTasks();}}
  async function validateSignUp(e){    
    if(!(/^[A-Za-z\s]{2,}$/.test(name))){
      e.preventDefault();
      alert("Your name should have more than one characters");
}     
   if(!(emailRegex.test(email))){
      e.preventDefault();
      alert("Your email must include “@” and end with a valid domain like .com or .net (e.g., name@332.com)");
    }   
    if (!(/^[0-9]{11}$/.test(phonenumber))) {
      e.preventDefault();
      alert("Phone number must be 11 digits");
    }    
    if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{7,}$/.test(password))) {
      e.preventDefault();
      alert("Password should be 7 characters long with one uppercase letter,one lowercase letter and one special symbol");
    }if((/^[A-Za-z\s]{2,}$/.test(name))&&(emailRegex.test(email))&&(/^[0-9]{11}$/.test(phonenumber))&&
    (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{7,}$/.test(password))){
      e.preventDefault()
      const response = await axios.post(
        "https://task-management-system-g6of.onrender.com/api/signup",
        {
          name,
          email,
          phonenumber,
          password,
        }
    );
    if(response.data.message==='Signup Successful'){
      setShowLogin(true)
      alert("Successful signup")
      document.getElementById("name").value="";
      document.getElementById("email").value="";
      document.getElementById("phoneNumber").value="";
      document.getElementById("password").value="";
    }else{
     alert("User with this email already exists. Please enter a different email"); 
    }}}
    async function validateSignin(event){
      event.preventDefault()
      const response = await axios.post(
        "https://task-management-system-g6of.onrender.com/api/signin",
        {
          name2,
          email2,
          phonenumber2,
          password2
        }
    );
if(response.data.message==='Login Successful'){
  alert('Successful Login')
  document.getElementById("name2").value="";
  document.getElementById("email2").value="";
  document.getElementById("phoneNumber2").value="";
  document.getElementById("password2").value="";
  setShowDashboard(!showDashboard)
  getAllTasks();
}else{
  alert("Invalid login")
}
    }
    async function addTask(){
      let task=document.getElementById('task');
      let deadline=document.getElementById('deadline');
      if(deadline.value!==''&&task.value!==''){
        const response = await axios.post(
                "https://task-management-system-g6of.onrender.com/api/insertTask",
                {
                    taskName:task.value,
                    deadline:deadline.value,
                    email2
                }
            );
        var updatedDeadlines=[...deadlines,deadline.value]
        var updatedTasks=[...totalTasks,task.value];
        var updatedIds=[...taskIds,response.data.task._id.toString()];
        var indexArray=updatedDeadlines.map((d,i)=>{
          return i;
        });
        indexArray.sort(function(a,b){
          return new Date(updatedDeadlines[a])-new Date(updatedDeadlines[b]);
        });
        var sortedDeadlines=indexArray.map((i)=>{
          return updatedDeadlines[i];
        });
        var sortedTasks=indexArray.map((i)=>{
          return updatedTasks[i];
        });
        var sortedIds=indexArray.map((i)=>{
          return updatedIds[i];
        });
        setDeadlines(sortedDeadlines);
        setTotalTasks(sortedTasks);
        setTaskIds(sortedIds);
        task.value = '';
        deadline.value = '';
      }else{
        alert("Please enter task with deadline")
      }
    } 
    useEffect(()=>{
      let newPending=totalTasks.filter((v)=>{return !completedTasks.includes(v)});
      setPendingTasks(newPending);
    },[totalTasks, completedTasks]);

    function viewTasks(e){
      setTaskCheck(e.target.value);
        }    
        function signUpFieldsEmpty(){
          document.getElementById("name").value="";
      document.getElementById("email").value="";
      document.getElementById("phoneNumber").value="";
      document.getElementById("password").value="";
        }
        function signInFieldsEmpty(){
          document.getElementById("name2").value="";
      document.getElementById("email2").value="";
      document.getElementById("phoneNumber2").value="";
      document.getElementById("password2").value="";
        }
  return(<div className='col-xs-12 col-md-12'>
    <div className="header"><h1 style={{display:'inline'}}>Task Management System</h1>
    {(showDashboard || showTaskAdd)?
    <div style={{float:'right'}}><button onClick={()=>{setShowTaskAdd(!showTaskAdd);
    setShowDashboard(!showDashboard);setShowLogin(!showLogin);}}
     style={{display:'inline',marginTop:'2%'}} class="btn btn-primary buttonClass2">
      {!(showTaskAdd)?"Add Tasks":"Dashboard"}</button>&nbsp;&nbsp;
      <button
  style={{ display: 'inline', marginTop: '2%' }}
  className="btn btn-primary buttonClass2"
  onClick={() => {if(showDashboard){setCompletedTasks([]);setShowDashboard(!showDashboard);}
  else if(showTaskAdd){setCompletedTasks([]);
      setShowTaskAdd(!showTaskAdd);setShowLogin(!showLogin);}}}>
      Log out</button></div>:""}</div>{!(showDashboard)&&!(showTaskAdd)?<h3 className="welcome">
        Welcome to Task Management System</h3>:""}{showLogin&&!(showTaskAdd)? 
        (<div className="card signupbox"><div className="card-body"><h1 className="card-title titlebox">
          Sign Up</h1><form onSubmit={validateSignUp} className="card-text"><label>Name: &nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <input type="text" id="name" onChange={(e) => setNAME(e.target.value)} required/>
  <br/> <br/><label>Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
  <input type="text" id="email" onChange={(e) => setEMAIL(e.target.value)} required/>
  <br/><br/><label>Phone Number: &nbsp;</label>
  <input type="tel" id="phoneNumber" onChange={(e) => setPHONENUMBER(e.target.value)} required/><br/><br/>
  <label>Password: &nbsp;</label>
  <input type="password" id="password" onChange={(e) => setPASSWORD(e.target.value)} required/>
  <br/><br/><div className="buttonbox"><button onClick={()=>validateSignUp} className="titlebox">Sign Up
  </button><button onClick={()=>{setShowLogin(!showLogin);signUpFieldsEmpty();}} className="titlebox">Sign In</button></div>
  </form>
  </div></div>):showDashboard?"":!(showTaskAdd)?(<div className="card signupbox"><div className="card-body">
<h1 className="card-title titlebox">Sign In</h1>
    <form onSubmit={validateSignin} className="card-text"><label>Name: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
    <input type="text" id="name2" onChange={(e) => setNAME2(e.target.value)}required/>
    <br/><br/> <label>Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
    <input type="text" id="email2" onChange={(e) => setEMAIL2(e.target.value)} required/>
    <br/><br/><label>Phone Number: &nbsp;</label><input type="tel" id="phoneNumber2"
     onChange={(e) => setPHONENUMBER2(e.target.value)}required/>
    <br/><br/><label>Password: &nbsp;</label><input id="password2" type="password" 
    onChange={(e) => setPASSWORD2(e.target.value)}required/>
    <br/><br/><div className="buttonbox"><button>Login</button><button onClick={()=>{
    setShowLogin(!showLogin);signInFieldsEmpty();}}>Create account</button></div>
    </form></div></div>):""}
    {showDashboard&&!(showTaskAdd)?<div><br/>
<h2 style={{display:'inline',color:'green',marginLeft:'37%'}}>Dashboard</h2>
<h6 style={{fontSize:'30px'}}>User Name:{name2}</h6><br/>
    <div style={{fontSize:'20px',border:'2px solid grey'}}>Total Tasks:
    {totalTasks.filter((item)=>{return item!==''}).map((v,i)=>{return <span key={i}>{v}
    {i===(totalTasks.length-1)?'':','}</span>})}</div><br/>
    <div style={{fontSize:'20px',border:'2px solid grey'}}>Completed Tasks:
    {completedTasks.filter((item)=>{return item!==''}).map((v,i)=>{return <span key={i}>{v}
    {i===(completedTasks.length-1)?'':','}</span>})}</div><br/>
    <div style={{fontSize:'20px',border:'2px solid grey'}}>Pending Tasks:
    {pendingTasks.map((v,i)=>{return (<span key={i}>
        {v}{i===pendingTasks.length - 1 ? '' : ', '}</span>)})}</div></div>:''}<br/>
  {showTaskAdd?<div><h3 style={{display:'inline',color:'green',marginLeft:'37%'}}>Add the Tasks</h3><br/><br/>
    <br/><div><label>Enter a Task: </label>&nbsp;&nbsp;<input id="task" type="text"/>
    <br/><br/><label>Enter a deadline: </label>&nbsp;&nbsp;
    <input id="deadline" type="date"/>&nbsp;&nbsp;&nbsp;&nbsp;<button className="buttonClass2" onClick={()=>
      {addTask();}}>Done</button></div></div>:''}
    {showDashboard?<div><table className="table table-bordered text-center">
      <thead className="table-primary"><tr><th>Tasks</th><th>Deadlines</th><th>Edit a task</th><th>Task Completion Status</th><th>Delete Task</th>
      </tr></thead>
    <tbody>{totalTasks.filter((item)=>{return item!==''}).map((v,i)=>{return <tr key={i}><td>{v}
    </td><td>{deadlines[i]}</td><td><button className="buttonClass2" onClick={()=>{updateTasks(v,i);}}>
      Edit</button></td>
    <td><input type="checkbox" onChange={(e)=>{e.target.checked?setCompletedTasks([...completedTasks,v]):
      setCompletedTasks([...completedTasks.filter((item)=>{return item !== v})])}}/></td><td>
    <button onClick={()=>{axios.delete(
            `https://task-management-system-g6of.onrender.com/api/deleteTask/${taskIds[i]}`
        );
        getAllTasks(); }}><i className="bi bi-trash"></i></button> 
</td></tr>})}</tbody>
    </table>
    <div style={{marginLeft:'44%'}}>
  <select id="taskCheck" onChange={viewTasks}>
    <option selected>View tasks by Status</option>
    <option value="completed">Completed Tasks</option>
    <option value="pending">Pending Tasks</option>
  </select>
</div><br/>
<h4 id="taskStatus">
  {taskCheck === 'completed' ? (
    <div style={{fontSize:'20px',border:'2px solid grey'}}>
      Completed Tasks:
      {completedTasks
        .filter((item)=>{return item!==''})
        .map((v, i)=>{return (
          <span key={i}>
            {v}{i === completedTasks.length - 1 ? '' : ', '}
          </span>
        )})}
    </div>
  ) : taskCheck === 'pending' ? (
    <div style={{fontSize:'20px',border:'2px solid grey'}}>
      Pending Tasks:
      {pendingTasks
        .filter((item)=>{return item!==''})
        .map((v, i)=>{return (
          <span key={i}>
            {v}{i === pendingTasks.length - 1 ? '' : ', '}
          </span>
        )})}
    </div>
  ):null}
</h4>
<br/>
<input style={{marginLeft:'44%'}} onChange={(e) => setSearchTask(e.target.value)} 
type="search" placeholder='Search your tasks'/><br/>
{lowerTotalTasks.includes(searchTask.toLowerCase())?
<span style={{marginLeft:'44%'}}>Task: </span>:searchTask===''?'':
<span style={{marginLeft:'44%'}}>'not found'</span>}
{searchDeadlineIndex!==-1?<span>{totalTasks[searchDeadlineIndex]}<br/>
<span style={{marginLeft:'44%'}}>Deadline: {deadlines[searchDeadlineIndex]}</span><br/></span>:''}</div>:""}
    </div>
  );
}
export default App;
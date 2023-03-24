import React,{useState} from "react";
import { CSVLink } from "react-csv";

const App = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [task,setTask] = useState('')
  const [desc,setDesc] = useState('')
  const [id,setId] = useState(0)
  const [editId,setEditId] = useState(null)
  const [toggle,setToggle] = useState(false)

  const addTask = ()=>{
    setId(id+1)
    setData1([...data1,{id:id, taskName: task,
      desc: desc}])
  }

  const addConfirmTask = (fetchId)=>{
    const newArr = data1.filter((item,index)=>{
      return item.id == fetchId
    })
    setData2([...data2,...newArr])
  }

  const removeTask = (fetchId)=>{
    const newArr = data1.filter((item,index)=>{
      return item.id != fetchId
    })
    setData1(newArr)
  }

  const editTask = (fetchId)=>{
    setEditId(fetchId)

    const newArr2 = data1.map(item=>{
      if(item.id == fetchId){
        setTask(item.taskName)
        setDesc(item.desc)
      }
    })
  }

  const updateTask = () =>{
      const newArr3 = data1.map(item=>{
        if(item.id == editId){
          return {
            taskName: task,
            desc : desc
          }
        }else{
          return item
        }
      })
      setEditId(null)

      setData1(newArr3)
  }

  return (
    <div>
      <div className="w-[50vw] mx-auto bg-blue-50"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "5px",
        }}
      >
        <h2 className="text-[26px]">Create Task form</h2>
        <div>
          <label>Task Name</label>
          <input
          onChange={(e)=>{
            setTask(e.target.value)
          }}
            className="border px-3"
            type={"text"}
            value={task}
            style={{ marginLeft: "20px" }}
          />
          
          <br />
          <label>Description</label>
          <textarea
          onChange={(e)=>{
            setDesc(e.target.value)
          }}
            className="border px-3"
            value={desc}
            style={{ height: "80px", marginTop: "20px", marginLeft: "20px" }}
          />


          <br />
          {toggle ?  
            <button onClick={()=>{updateTask(); setToggle(false)}} className="mx-24 border rounded px-3 py-1 bg-blue-100">
            update task
          </button>
          : 
          <button onClick={()=>{addTask()}} className="mx-24 border rounded px-3 py-1 bg-blue-100">
            Add task
          </button>
          }
          
          <CSVLink 
          className="border rounded px-3 py-1 bg-slate-200" data={data1} 
      filename={"test.csv"}>
        Download as CSV
      </CSVLink>
        </div>
      </div>
      <hr />
      <div className="flex justify-evenly pt-2">
        <div className="w-[450px] text-[18px] p-3 border rounded">
          <h4>Task list 1</h4>
          {data1.map((item,index)=>{
            return(
              <div key={index} className="relative border my-3 shadow p-3">
            <h4>Task Name:- {item.taskName}</h4>
            <p>Description:- {item.desc}</p>
            <button 
            onClick={()=>{
              addConfirmTask(item.id)
            }} className="border px-3 py-1 rounded bg-slate-200 shadow-md hover:bg-slate-300">
              Confirme
            </button>
            <i onClick={()=>{editTask(item.id); setToggle(true)}} className="absolute right-9 top-2 text-[22px] bi bi-pencil-square"></i>
            <i onClick={()=>{removeTask(item.id)}} className="absolute right-2 top-2 text-[22px] bi bi-trash3"></i>
          </div>
            )
          })}
        </div>

        <div className="w-[450px] text-[18px] p-3 border rounded">
          <h4>Confirmed Task list 2</h4>
          {data2.map(item=>{
            return(
              <div key={item.id} className="border shadow my-3 p-3">
            <h4>Task Name:- {item.taskName}</h4>
            <p>Description:-{item.desc}</p>
          </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default App;

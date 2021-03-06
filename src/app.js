import React, {useState, useEffect} from 'react';
import './app.scss';
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const API = 'http://x88l.us-east-2.elasticbeanstalk.com/tasks';
function Task(){
   const [task,setTask]=useState([]);

   const _getTask = () => {
     fetch(proxyurl+API)
    .then(data=>data.json())
    .then(tt=>{
      setTask(tt)
    })
    .catch(console.error);

   }


useEffect(_getTask,[]);

return(
<ul>
  {task.map((t)=>
  
  <li key={t.id}>
   <details>
     <summary>
       {t.imageUrl?
      (<img src={t.imageUrl} height="200px" width="200px" alt={t.id}/>)
      :
      (<p>This task doesn't have image</p>)
       }

{t.thumbnailUrl?
  (<img id="thumbnail" src={t.thumbnailUrl} alt={t.id}/>)
  :
  (<p>This task doesn't have resized image</p>)
   }


       <p>{t.title}</p>
       <p>{t.description}</p>
       <p>{t.status}</p>
     </summary>
     <Assignee assignee={t.assignee} />
     <form action={`${API}/${t.id}/images`} method="post" encType="multipart/form-data">
        <label>
          <span>Upload Image</span>
          <input name="file" type="file" />
        </label>
        <button>Save</button>
      </form>
   </details>

  </li>
    )}
  
</ul>

)
  }

function Assignee(props){
  let assignee= props.assignee;
  let name="";
    if(assignee!=null){
       name=assignee.name;
    }
    else name="unassigned";
  return (
    <section>
     <p>Assigned to: {name}</p>
    </section>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">All the Tasks</header>
      <main>
        <Task/>     
      </main>
      <footer>&copy; 2019 Taskstracker</footer>
    </div>
  );
}

export default App;

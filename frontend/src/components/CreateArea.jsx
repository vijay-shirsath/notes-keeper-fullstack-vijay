import React from "react";

function CreateArea(props) { //props comes here like add and many attributes we add on there

  const [noteTitle,setNoteTitle] = React.useState({
   title:"",
   content:""
  });

  function noteInputs(event){
    const {name,value} = event.target;
    console.log(name,value)
    setNoteTitle(prevValue => {
      return{
        ...prevValue,
        [name] : value
      };
    });
  }

  function addNote(event){
    props.add(noteTitle) //calling that equalent to the in the app we are calling the attribute add and then the function calls namely noteAdd and then that passes there in the nate parameter
    setNoteTitle({  //after pressing the add button the previous value should be add it is so we can add another thing there
      title:"",
      content:""
    });
    event.preventDefault();
  }

  return (
    <div>
      <form className="form">
        <input name="title" onChange={noteInputs} placeholder="Title" value={noteTitle.title} className="input"/>
        <textarea name="content" onChange={noteInputs} placeholder="Take a note..." rows="3" value={noteTitle.content} />
        <button onClick={addNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;

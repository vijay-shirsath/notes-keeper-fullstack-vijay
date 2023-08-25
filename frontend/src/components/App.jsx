import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { useDispatch, useSelector } from "react-redux";
import { addNotes, deleteNote, getNotes } from "../store/slices/noteSlice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth);
  const notesAdd = useSelector(state => state.notes.notes);
  const userId = user._id;
  const noteId = notesAdd;  //checking the _id

  function noteAdd(newNote){ //all the inputs are come here now we need to store it somewhere like an array that changes the State so we need here useState()...
    console.log(newNote);
    if(user._id){
      if(newNote.title === ""){
        alert("please enter Title")
      }else if(newNote.content === ""){
        alert("please enter content")
      }else{
        dispatch(addNotes({newNote, userId}));
      }
    }else{
      alert("please login or register to add the notes")
    }
  }

  function itemDelete(id){
    dispatch(deleteNote(id));
  }

  useEffect(() => {
    dispatch(getNotes(userId));
  },[dispatch,userId,noteId])  //if these value changes or something happends it will trigger and we dont need to refresh the page it will auto update 

  return (
    <div>
      <Header />
      <CreateArea 
      add={noteAdd}
      />
      {notesAdd.map((noteItems,index) => { //and in the map function we can pass the index so that it can check the index //every noteitems in notes like title and contents pass over that 
          return <Note 
          key={index}
          _id={noteItems._id}
          title={noteItems.title} 
          content={noteItems.content} 
          deleteById = {itemDelete} />
      })}
      <Footer/>
    </div>
  );
}

export default App;

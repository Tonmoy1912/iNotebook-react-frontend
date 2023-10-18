import NoteContext from "./NoteContext";
import { useState } from "react";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";

const NoteState = function (props) {
  // const host=process.env.REACT_APP_BACKEND_URL;
  // const host="http://localhost:8000";
  const host = "https://inotebookbackend-a8d5.onrender.com";


  const [notes, setNotes] = useState([]);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalFlag, setModalFlag] = useState(false);
  const [modalVal, setModalVal] = useState({ type: "", msg: "" })

  //fectch all note
  const getNotes = async function () {
    //TODO API CALL
    setIsLoading(true);
    let url = `${host}/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('inotebook_token')
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
      // body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
    });
    // console.log("fetch complete");
    // console.log(response);
    const json = await response.json(); // parses JSON response into native JavaScript objects
    // console.log(json);
    setIsLoading(false);
    setNotes(json.notes);
  };


  const fetchUserData = async function () {
    let url = `${host}/api/auth/getuser`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('inotebook_token')
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
      // body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
    });
    // console.log("fetch complete");
    // console.log(response);
    const json = await response.json();
    // console.log(json);
    setName(json.name);
  }


  //Add a note
  const addNote = async function (title, description, tag) {
    //TODO API CALL
    setIsLoading(true);
    let url = `${host}/api/notes/addnote`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('inotebook_token')
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    setIsLoading(false);
    if (json.success) {
      setNotes(notes.concat(json.note));
      setTimeout(() => {
        // alert("Note added successfully");
        setModalFlag(true);
        setModalVal({ type: "success", msg: "Note added successfully" })
      }, 300);
    }
    else {
      // alert("Some error occurs, note not added")
      setTimeout(() => {
        // alert("Note added successfully");
        setModalFlag(true);
        setModalVal({ type: "error", msg: "Some error occurs, note not added" })
      }, 300);
    }
  };


  //Delete a note
  const deleteNote = async function (id) {
    //TODO API CALL
    let a = window.confirm("Are you sure that you want to delete the note?");
    if (a) {
      setIsLoading(true);
      let url = `${host}/api/notes/deletenote/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('inotebook_token')
          // 'Content-Type': 'application/x-www-form-urlencoded',
        }
      });
      const json = await response.json(); // parses JSON response into native JavaScript objects
      // console.log(json);
      //function for client
      // console.log("Deleting note with id ",id);
      // setNotes(notes.filter((note)=>{return note._id!=id}));
      if (json.success) {
        getNotes();
        setIsLoading(false);
        setTimeout(() => {
          // alert(json.message);
          setModalFlag(true);
          setModalVal({ type: "success", msg: json.message })
        }, 300);

      }
      else {
        setIsLoading(false);
        // alert(json.error);
        setTimeout(() => {
          // alert(json.message);
          setModalFlag(true);
          setModalVal({ type: "error", msg: json.error })
        }, 300);
      }
    }

  };

  //Edit a note
  const editNote = async function (id, title, description, tag) {
    //TODO API CALL
    setIsLoading(true);
    let url = `${host}/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('inotebook_token')
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    //function for client
    // for(let index=0;index<notes.length;index++){
    //     const element=notes[index];
    //     if(element._id==id){
    //         element.title=title;
    //         element.description=description;
    //         element.tag=tag;
    //         break;
    //     }
    // }
    if (json.success) {
      getNotes();
      setIsLoading(false);
      setTimeout(() => {
        // alert(json.message);
        setModalFlag(true);
        setModalVal({ type: "success", msg: json.message })
      }, 300);

    }
    else {
      setIsLoading(false);
      // alert(json.error);
      
      setTimeout(() => {
        // alert(json.message);
        setModalFlag(true);
      setModalVal({ type: "error", msg: json.error })
      }, 300);
    }
  };


  return (
    <>
      <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes, name, setName, fetchUserData, isLoading, setIsLoading, setModalFlag, setModalVal }}>
        {props.children}
        {isLoading && <Loader />}
        {modalFlag && <Modal val={modalVal} />}
      </NoteContext.Provider>

      {/* <Loader></Loader> */}
    </>
  )
};

export default NoteState;
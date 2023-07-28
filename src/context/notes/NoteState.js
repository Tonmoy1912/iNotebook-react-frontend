import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState=function(props){
    const host="http://localhost:8000"

    const [notes,setNotes]=useState([]);
    

    //fectch all note
    const getNotes=async function(){
        //TODO API CALL
        let url=`${host}/api/notes/fetchallnotes`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjMjNkMjM0M2JiODAwYTc0NDM2OWI5In0sImlhdCI6MTY5MDQ1Mzk4Nn0.G-BI94k26yzuc8FzrFfYvYIoJ_C0nWpG5FN_Sr5GFnw"
              // 'Content-Type': 'application/x-www-form-urlencoded',
            }
            // body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
          });
          // console.log("fetch complete");
          // console.log(response);
          const json= await response.json(); // parses JSON response into native JavaScript objects
          // console.log(json);
          setNotes(json.notes);
    };



    //Add a note
    const addNote=async function(title,description,tag){
        //TODO API CALL
        let url=`${host}/api/notes/addnote`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjMjNkMjM0M2JiODAwYTc0NDM2OWI5In0sImlhdCI6MTY5MDQ1Mzk4Nn0.G-BI94k26yzuc8FzrFfYvYIoJ_C0nWpG5FN_Sr5GFnw"
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
          });
          const json=await response.json(); // parses JSON response into native JavaScript objects
          setNotes(notes.concat(json));
    };


    //Delete a note
    const deleteNote=async function(id){
        //TODO API CALL
        let url=`${host}/api/notes/deletenote/${id}`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjMjNkMjM0M2JiODAwYTc0NDM2OWI5In0sImlhdCI6MTY5MDQ1Mzk4Nn0.G-BI94k26yzuc8FzrFfYvYIoJ_C0nWpG5FN_Sr5GFnw"
              // 'Content-Type': 'application/x-www-form-urlencoded',
            }
          });
          const json= await response.json(); // parses JSON response into native JavaScript objects
          // console.log(json);
        //function for client
        // console.log("Deleting note with id ",id);
        // setNotes(notes.filter((note)=>{return note._id!=id}));
        getNotes();
    };

    //Edit a note
    const editNote=async function(id,title,description,tag){
        //TODO API CALL
        let url=`${host}/api/notes/updatenote/${id}`;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjMjNkMjM0M2JiODAwYTc0NDM2OWI5In0sImlhdCI6MTY5MDQ1Mzk4Nn0.G-BI94k26yzuc8FzrFfYvYIoJ_C0nWpG5FN_Sr5GFnw"
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
          });
          const json=await response.json(); // parses JSON response into native JavaScript objects
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
          getNotes();
    };


    return (
        <NoteContext.Provider value={{notes,addNote, deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
};

export default NoteState;
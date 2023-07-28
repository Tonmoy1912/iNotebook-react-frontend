import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState=function(props){

    let initialNotes= [
        {
          "_id": "64c27ab8126af46f0c10796d",
          "user": "64c23d2343bb800a744369b9",
          "title": "My Title",
          "description": "Please wake up early",
          "tag": "Personal",
          "date": "2023-07-27T14:10:00.021Z",
          "__v": 0
        },
        {
          "_id": "64c35a463fc4f1d97f01b238",
          "user": "64c23d2343bb800a744369b9",
          "title": "My Title 2",
          "description": "Please wake up early 2",
          "tag": "Personal",
          "date": "2023-07-28T06:03:50.360Z",
          "__v": 0
        },
        {
            "_id": "64c27ab8126af46f0c10796d",
            "user": "64c23d2343bb800a744369b9",
            "title": "My Title",
            "description": "Please wake up early",
            "tag": "Personal",
            "date": "2023-07-27T14:10:00.021Z",
            "__v": 0
          },
          {
            "_id": "64c35a463fc4f1d97f01b238",
            "user": "64c23d2343bb800a744369b9",
            "title": "My Title 2",
            "description": "Please wake up early 2",
            "tag": "Personal",
            "date": "2023-07-28T06:03:50.360Z",
            "__v": 0
          },
          {
            "_id": "64c27ab8126af46f0c10796d",
            "user": "64c23d2343bb800a744369b9",
            "title": "My Title",
            "description": "Please wake up early",
            "tag": "Personal",
            "date": "2023-07-27T14:10:00.021Z",
            "__v": 0
          },
          {
            "_id": "64c35a463fc4f1d97f01b238",
            "user": "64c23d2343bb800a744369b9",
            "title": "My Title 2",
            "description": "Please wake up early 2",
            "tag": "Personal",
            "date": "2023-07-28T06:03:50.360Z",
            "__v": 0
          },
          {
            "_id": "64c27ab8126af46f0c10796d",
            "user": "64c23d2343bb800a744369b9",
            "title": "My Title",
            "description": "Please wake up early",
            "tag": "Personal",
            "date": "2023-07-27T14:10:00.021Z",
            "__v": 0
          },
          {
            "_id": "64c35a463fc4f1d97f01b238",
            "user": "64c23d2343bb800a744369b9",
            "title": "My Title 2",
            "description": "Please wake up early 2",
            "tag": "Personal",
            "date": "2023-07-28T06:03:50.360Z",
            "__v": 0
          }
      ]

    const [notes,setNotes]=useState(initialNotes);
    
    return (
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
};

export default NoteState;
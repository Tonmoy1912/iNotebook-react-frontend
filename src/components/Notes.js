import React,{useContext} from 'react';
import NoteContext from '../context/notes/NoteContext';
import Noteitem from './Noteitem';

export default function Notes() {

    const context = useContext(NoteContext);
    const { notes, setNotes } = context;


    return (
        <div>
            <div className="container my-3">
                <h1>Your Notes</h1>
                <div className="row">
                    {notes.map((note) => {
                        return <Noteitem note={note} />
                    })}
                </div>
            </div>
        </div>
    )
}

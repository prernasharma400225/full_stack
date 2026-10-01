import { useState, useEffect } from 'react'
import axios from "axios"

function App() {

  const [notes, setNotes] = useState([]);

  // Popup ke liye
  const [showPopup, setShowPopup] = useState(false);

  const [editNotes, setEditNotes] = useState({
    _id: "",
    title: "",
    description: "",
  });

  console.log('hello');


  function fetchNotes() {

    axios.get('https://full-stack-8equ.onrender.com/api/notes')
      .then((res) => {
        // console.log(res.data);
        setNotes(res.data.notes)
      })
  }

  useEffect(() => {
    fetchNotes();
  }, [])

  function handleSubmit(e) {
    e.preventDefault();

    const { title, description } = e.target.elements
    console.log(title.value, description.value);

    axios.post('https://full-stack-8equ.onrender.com/api/notes', {
      title: title.value,
      description: description.value
    })
      .then(res => {
        console.log(res.data);
        fetchNotes();

        e.target.reset();
      })
  }

  function handleDeleteNote(noteId) {
    console.log(noteId);
    axios.delete("https://full-stack-8equ.onrender.com/api/notes/" + noteId)
      .then(res => {
        console.log(res.data);
        fetchNotes()

      })

  }

  function handleUpdateNote(note) {

    console.log(note);

    setEditNotes({
      _id: note._id,
      title: note.title,
      description: note.description,
    })
    setShowPopup(true)

  }

  function handleSaveUpdate(e) {
    e.preventDefault();
    axios.patch("https://full-stack-8equ.onrender.com/api/notes/" + editNotes._id,
      {
        title: editNotes.title,
        description: editNotes.description
      }
    )
      .then(res => {
        console.log(res.data);

        setShowPopup(false);
        fetchNotes()


      })

      .catch((err) => {
        console.log(err);

      });

  }







  return (

    <>
      <form action="" className='note-create-form' onSubmit={handleSubmit}>
        <input name='title' type="text" placeholder="title" />
        <input name='description' type="text" placeholder="description" />
        <button>create note</button>
      </form>

      <div className="notes">
        {
          notes.map(note => {
            return <div key={note._id} className='note'>
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <div className='flex '>
                <button onClick={() => { handleDeleteNote(note._id) }}>Delete</button>
                <button onClick={() => { handleUpdateNote(note) }}>Update</button>
              </div>
            </div>
          })}

      </div>

      {/* update */}

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>Update Note</h2>

            <form onSubmit={handleSaveUpdate}>

              <input type="text" value={editNotes.title}
                onChange={(e) =>
                  setEditNotes({
                    ...editNotes,
                    title: e.target.value,
                  })
                }
                placeholder='Title' />

              <input type="text"
                value={editNotes.description}
                onChange={(e) =>
                  setEditNotes({
                    ...editNotes,
                    description: e.target.value,
                  })
                } placeholder='Description' />

              <div className='popup-button'>
                <button type='button' onClick={() => setShowPopup(false)}>cancel</button>
                <button type='submit'>save</button>
              </div>
            </form>
          </div>

        </div>
      )}
    </>

  )
}

export default App

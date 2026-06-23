import "../component/editNotes.css"

function EditNotes(){
    return(
        <>
        <div className="edit-box">
            <input type="text" className="new-title" />
            <input type="text" className="new-content" />
        </div>
        </>
    )
}
import Layout from "../../components/adminLayout";
import styles from "../../styles/App.module.css";
import { useState, useContext, useEffect } from "react";
import EntryAdmin from "../../components/entryAdmin";
import LexicalFormat from "../../components/LexicalFormat";
import axios from "axios";
import Swal from "sweetalert2";
import BlogContext from "../../context/BlogProvider";

export async function getStaticProps(){
   const data = await axios.get(`https://brandon-data.onrender.com/api/blog`);
   const entriesAPI = data.data.data;
   return{
       props: {
           entriesAPI
       },
       revalidate: 30
   }
}

const BlogAdmin = ({entriesAPI}) => {

    const { entries, createEntry, setCreateEntry, setEntries, newEntryDB, entryDelete, setEntryDelete, deleteEntry, editEntryDB } = useContext(BlogContext);
    useEffect(() => {
        setEntries(entriesAPI);
    }, []);

    const [ newEntry, setNewEntry ] = useState(false);
    const [ formLoading, setFormLoading ] = useState(false);
    const [ deleteAsk, setDeleteAsk ] = useState(false);
    const [ editEntry, setEditEntry ] = useState(false);
    const [ entryId, setEntryId ] = useState("");
    const [ editName, setEditName ] = useState("");

    useEffect(() => {
        if(deleteAsk){
            Swal.fire({
                title: 'Alert',
                text: `¿Are you sure do you want to delete the entry "${entryDelete.nombre}"?`,
                icon: "question",
                confirmButtonColor: '#ffcc00',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: "No",
                cancelButtonColor: "#ff0000"
              }).then((result) => {
                if(result.isDismissed){
                    setDeleteAsk(false);
                    setEntryDelete({});
                }
                if(result.isConfirmed){
                    setDeleteAsk(false);
                    deleteEntry();
                }
              })
        }
    }, [deleteAsk]);

    const manageCancel = () => {
        setNewEntry(false);
        setEditName("");
        setCreateEntry({
            nombre: "",
            intro: "",
            time: "",
            image: null,
            postDate: "",
            text: [  {
                type: "paragraph",
                children: [
                  { text: "Its time to write some text..." }
                ]
              }],
        });
        setEditEntry(false);
    }

    const prepareEdit = entry => {
        setNewEntry(true);
        setEditEntry(true);
        setEntryId(entry._id);
        let date = entry.postDate.split("T")[0];
        setCreateEntry({
            nombre: entry.nombre,
            image: null,
            time: entry.time,
            intro: entry.intro,
            text: entry.text,
            postDate: date,
        });
    }

    const createNewEntry = async e => {
        e.preventDefault();
        setFormLoading(true);
        if(editEntry){
            if(createEntry.nombre === "" || createEntry.intro === "" || createEntry.time === "" || createEntry.postDate === ""){
                setFormLoading(false);
                return Swal.fire({
                    title: "Error",
                    icon: "error",
                    text: "All fields are required",
                    confirmButtonColor: "#ffcc00"
                });
            }
            await editEntryDB(setNewEntry, setFormLoading, setEditEntry, entryId);
        } else {
            if(createEntry.nombre === "" || createEntry.image === null || createEntry.intro === "" || createEntry.time === "" || createEntry.postDate === ""){
                setFormLoading(false);
                return Swal.fire({
                    title: "Error",
                    icon: "error",
                    text: "All fields are required",
                    confirmButtonColor: "#ffcc00"
                });
            }
            await newEntryDB(createEntry, setNewEntry, setFormLoading);
        }
    }

    return(
        <Layout>
            { !newEntry ? 
            <>  <div className={styles.skillAdd}>
                    <button onClick={() => setNewEntry(true)} className={`${styles.btn1} ${styles.adminBtn}`}><span className={styles.btnText}>Add new blog entry</span></button>
                </div>
                <section className={styles.adminEntriesContainer}>
                    { entries.length !== 0 ? entries.map(entry => <EntryAdmin setEditName={setEditName} prepareEdit={prepareEdit} setDeleteAsk={setDeleteAsk} key={entry._id} entry={entry}/>) : <p className={styles.textEmpty}>There are no entries, start by creating one...</p> }
                </section>
            </> 
            : <>
                <h2 className={styles.newSkillTitle}>{ editEntry ? `Editing entry ${editName}` : "Create a new blog entry"}</h2>
                <form onSubmit={e => createNewEntry(e)} className={styles.newSkillForm}>
                    <div className={styles.newSkillForm_field}>
                        <label className={styles.newSkillForm_label}>Entry Title:</label>
                        <input name="nombre" value={createEntry.nombre} onChange={e => setCreateEntry({ ...createEntry, [e.target.name]: e.target.value })} className={styles.newSkillForm_input}/>
                    </div>
                    <div className={styles.newSkillForm_field}>
                        <label className={styles.newSkillForm_label}>Entry Introduction:</label>
                        <input name="intro" value={createEntry.intro} onChange={e => setCreateEntry({ ...createEntry, [e.target.name]: e.target.value })} className={styles.newSkillForm_input}/>
                    </div>
                    <div className={styles.newSkillForm_field}>
                        <label className={styles.newSkillForm_label}>Time needed to read:</label>
                        <input name="time" value={createEntry.time} onChange={e => setCreateEntry({ ...createEntry, [e.target.name]: e.target.value })} className={styles.newSkillForm_input}/>
                    </div>
                    <div className={styles.newSkillForm_field}>
                        <label className={styles.newSkillForm_label}>Entry thumbnail:</label>
                        <input className={styles.newSkillForm_file} onChange={e => setCreateEntry({ ...createEntry, image: e.target.files[0] })} type="file"/>
                    </div>
                    <div className={styles.newSkillForm_field}>
                        <label className={styles.newSkillForm_label}>Entry Date:</label>
                        <input type={"date"}  name="postDate" value={createEntry.postDate} onChange={e => setCreateEntry({ ...createEntry, [e.target.name]: e.target.value })} className={styles.newSkillForm_input}/>
                    </div>
                    <div className={styles.newSkillForm_field}>
                        <label className={styles.newSkillForm_label}>Entry text:</label>
                        <LexicalFormat createProject={createEntry} setCreateProject={setCreateEntry}/>
                    </div> 
                    <div className={styles.newSkillBtns}>
                        <button onClick={() => manageCancel()} className={`${styles.btn1} ${styles.adminBtn}`}><span className={styles.btnText}>Cancel action</span></button>
                        { !formLoading 
                        ?<button type="submit" className={`${styles.btn1} ${styles.adminBtn}`}><span className={styles.btnText}>{editEntry ? "Modify entry" : "Create New Entry"}</span></button>                      
                        :<button disabled type="submit" className={`${styles.btn1} ${styles.adminBtn}`}><span className={styles.btnText}>{editEntry ? "Editing Entry..." : "Creating Entry..."}</span></button> } </div>
                    </form></>}
        </Layout>
    );
}
export default BlogAdmin;
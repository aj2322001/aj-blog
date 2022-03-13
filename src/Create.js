import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('archit');
    const [isPending, setIsPending] = useState(false);
    // const [body, seBody] = useState('');
    const history = useHistory(); // helps us go back and forth in page

    const handleSubmit = (e) => {
        e.preventDefault(); //prevent refresh when submit(add blog) button is clicked
        const blog = {title, body, author}; //our blog object, this is how we will input our data for sending it to json
        setIsPending(true);
        // console.log(blog);
        fetch('http://localhost:8000/blogs',{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(blog)
        }).then(() => {
            console.log('new blog added');
            setIsPending(false);
            history.push('/'); 
        })
    }

    return ( 
        <div className="create">
            <h2>Add a New Blog</h2>

            <form onSubmit={handleSubmit}>
                <label>Blog Title:</label>
                <input
                    type='text'
                    required
                    value={title} // saves the last set data
                    onChange={(e) => setTitle(e.target.value)} //update val
                />
                <label>Blog body:</label>
                <textarea 
                    required
                    value={body} // saves the last set data
                    onChange={(e) => setBody(e.target.value)} //update val
                ></textarea>
                <label>Blog auhor:</label>
                <select 
                    value={body} // saves the last set data
                    onChange={(e) => setAuthor(e.target.value)} //update val
                >
                    <option value="archit">archit</option>
                    <option value="dhruv">dhruv</option>
                </select>
                {!isPending && <button>add Blog</button>}
                {isPending && <button disabled>adding blog ...</button>}
            </form>

        </div>
     );
}
 
export default Create;
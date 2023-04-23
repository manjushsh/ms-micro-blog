import { useState } from 'react';
import axios from 'axios';
import GlobalConfig from '../configs';
import './styles.css';

const CreateAPost = () => {

    const [title, setTitle] = useState('');
    const onPostCreate = e => {
        e?.preventDefault();
        if (title?.length) {
            axios.post(`${GlobalConfig.POSTS_ENDPOINT}/posts`, { title })
                .then(() => setTitle(''))
                .catch(err => console.error("Caught Error while creating a post"))
        }
    }

    return (
        <form className="container create_post_container" onSubmit={onPostCreate}>
            <h1>Create Post</h1>
            <div className="form-group">
                <label className="my-1">Post title</label>
                <input
                    value={title}
                    onChange={e => setTitle(e?.target?.value)}
                    className="form-control my-1"
                />
            </div>
            <button className="btn btn-primary my-2" disabled={!title?.length}>Create</button>
        </form>
    )
}

export default CreateAPost;

import { useState } from 'react';
import axios from 'axios';
import GlobalConfig from '../configs';
import './styles.css';

const CreateAComment = (props) => {

    const [content, setContent] = useState('');
    const onCommentCreate = e => {
        e?.preventDefault();
        if (content?.length && props?.postId?.length) {
            axios.post(`${GlobalConfig.COMMENTS_ENDPOINT}/${props?.postId}/comments`, { content })
                .then(() => setContent(''))
                .catch(err => console.error("Caught Error while creating the comment"))
        }
    }

    return (
        <form className="container create_comment_container" onSubmit={onCommentCreate}>
            <div className="form-group">
                <label className="my-1">Add new comment</label>
                <input
                    value={content}
                    onChange={e => setContent(e?.target?.value)}
                    className="form-control my-1"
                />
            </div>
            <button
                className="btn btn-primary my-2"
                // onClick={onCommentCreate}
                disabled={!content?.length}>Comment</button>
        </form>
    )
}

export default CreateAComment;

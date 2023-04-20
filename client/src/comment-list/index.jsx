/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import axios from 'axios';
import BasicCard from '../common/card';
import GlobalConfig from '../configs';
import CreateAComment from '../create-comment';
import './styles.css';

const CommentList = ({ postId }) => {

    const [comments, setComments] = useState([]);

    const getAllCommentsOfPost = () => {
        if (postId?.length) {
            axios.get(`${GlobalConfig.COMMENTS_ENDPOINT}/${postId}/comments`)
                .then(data => setComments(data?.data || {}))
                .catch(err => console.error("Caught Error while fetching comments of the post."));
        }
    }

    useEffect(() => { getAllCommentsOfPost() }, []);

    return (
        <div className="container">
            <div className='post_list_container'>
                <span>{comments?.length || 'No'} Comments</span>
                <ul>
                    {comments?.length ? (
                        comments?.map(comment => (
                            <li>{comment?.content}</li>
                        ))
                    ) : ''}
                </ul>
            </div>
        </div>
    )
}

export default CommentList;

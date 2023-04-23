/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import axios from 'axios';
import BasicCard from '../common/card';
import GlobalConfig from '../configs';
import CreateAComment from '../create-comment';
import CommentList from '../comment-list';
import './styles.css';

const PostList = () => {

    const [posts, setPosts] = useState({});

    const getAllPosts = () => {
        axios.get(`${GlobalConfig.QUERY_BASE_ENDPOINT}/posts`)
            .then(data => setPosts(data?.data || {}))
            .catch(err => console.error("Caught Error while fetching posts."));
    }

    useEffect(() => { getAllPosts() }, []);

    return (
        <div className="container">
            <div className='title_container'>
                <h1>All Posts</h1>
                <label className='link-primary' onClick={getAllPosts}>&ensp;Refresh</label>
            </div>
            <div className='post_list_container'>
                {posts && Object.keys(posts)?.length ? (
                    Object.values(posts)?.map(post => (
                        <BasicCard key={post?.id}>
                            <h5 className="card-title">{post?.title}</h5>
                            <hr className='my-4' />
                            <CommentList comments={post.comments || []} />
                            <CreateAComment postId={post?.id} />
                        </BasicCard>
                    ))
                ) : 'Nothing to display'}
            </div>
        </div>
    )
}

export default PostList;

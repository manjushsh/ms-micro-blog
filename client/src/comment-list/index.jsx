/* eslint-disable jsx-a11y/anchor-is-valid */
import './styles.css';

const CommentList = ({ comments }) => {

    // const [comments, setComments] = useState([]);
    // const getAllCommentsOfPost = () => {
    //     if (postId?.length) {
    //         axios.get(`${GlobalConfig.COMMENTS_ENDPOINT}/posts/${postId}/comments`)
    //             .then(data => setComments(data?.data || {}))
    //             .catch(err => console.error("Caught Error while fetching comments of the post."));
    //     }
    // }
    // useEffect(() => { getAllCommentsOfPost() }, []);

    return (
        <div className="container">
            <div className='comment_list_container'>
                <div>{comments?.length || 'No'} Comments</div>
                <div>
                    <ul>
                        {comments?.length ? (
                            comments?.map(comment => (
                                <li>{comment?.content}</li>
                            ))
                        ) : ''}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CommentList;

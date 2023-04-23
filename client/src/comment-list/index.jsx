/* eslint-disable jsx-a11y/anchor-is-valid */
import GlobalConfig from '../configs';
import './styles.css';

const CommentList = ({ comments }) => {

    const moderateComment = (comment) => {
        switch (comment?.status) {
            case GlobalConfig.COMMENT_STATUS.PENDING:
                return 'This comment is awaiting moderation';
            case GlobalConfig.COMMENT_STATUS.APPROVED:
                return comment?.content || '';
            case GlobalConfig.COMMENT_STATUS.REJECTED:
                return 'This comment has been rejected';
            default:
                return ''
        }
    }

    return (
        <div className="container">
            <div className='comment_list_container'>
                <div>{comments?.length || 'No'} Comments</div>
                <div>
                    <ul>
                        {comments?.length ? (
                            comments?.map(comment => (
                                <li>{moderateComment(comment)}</li>
                            ))
                        ) : ''}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CommentList;

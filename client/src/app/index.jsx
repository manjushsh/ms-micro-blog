import CreateAPost from '../create-post';
import PostList from '../post-list';

const App = () => (
    <div className='my-2'>
        <CreateAPost />
        <hr className='my-5' />
        <PostList />
    </div>
)

export default App;

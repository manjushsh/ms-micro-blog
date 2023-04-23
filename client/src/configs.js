const PORTS = {
    POSTS: process.env.POSTS || 4000,
    COMMENTS: process.env.COMMENTS || 4001,
    QUERY: process.env.QUERY || 4002,
    EVENTS: process.env.EVENTS || 4005,
};

const COMMENT_STATUS = {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected'
};

const GlobalConfig = {
    POSTS_ENDPOINT: process.env?.POSTS_BASE_ENDPOINT || `http://localhost:${PORTS.POSTS}`,
    COMMENTS_ENDPOINT: process.env?.COMMENTS_BASE_ENDPOINT || `http://localhost:${PORTS.COMMENTS}`,
    QUERY_BASE_ENDPOINT: 'http://localhost:4002',
    COMMENT_STATUS,
}

export default GlobalConfig;

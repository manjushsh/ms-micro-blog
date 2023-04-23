const PORTS = {
    POSTS: process.env.POSTS || 4000,
    COMMENTS: process.env.COMMENTS || 4001,
    QUERY: process.env.QUERY || 4002,
    MODERATION: process.env.MIDERATION || 4003,
    EVENTS: process.env.EVENTS || 4005,
};

const COMMENT_STATUS = {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected'
};

const EVENT_TYPES={
    POST_CREATED: 'PostCreated',
    COMMENT_CREATED: 'CommentCreated',
    COMMENT_UPDATED: 'CommentUpdated',
    COMMENT_MODERATED: 'CommentModerated',
};

const GlobalConfig = {
    POSTS_BASE_ENDPOINT: process.env?.POSTS_BASE_ENDPOINT || `http://localhost:${PORTS.POSTS}`,
    COMMENTS_BASE_ENDPOINT: process.env?.COMMENTS_BASE_ENDPOINT || `http://localhost:${PORTS.COMMENTS}`,
    QUERY_BASE_ENDPOINT: process.env?.QUERY_BASE_ENDPOINT || `http://localhost:${PORTS.QUERY}`,
    MODERATION_BASE_ENDPOINT: process.env?.MODERATION_BASE_ENDPOINT || `http://localhost:${PORTS.MODERATION}`,
    EVENT_BASE_ENDPOINT: process.env?.EVENT_BASE_ENDPOINT || `http://localhost:${PORTS.EVENTS}`,
    PORTS,
    COMMENT_STATUS,
    EVENT_TYPES,
}

module.exports = GlobalConfig;

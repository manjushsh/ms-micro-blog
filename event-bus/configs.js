const PORTS = {
    POSTS: process.env.POSTS || 4000,
    COMMENTS: process.env.COMMENTS || 4001,
    QUERY: process.env.QUERY || 4002,
    EVENTS: process.env.EVENTS || 4005,
};

const GlobalConfig = {
    POSTS_BASE_ENDPOINT: process.env?.POSTS_BASE_ENDPOINT || `http://localhost:${PORTS.POSTS}`,
    COMMENTS_BASE_ENDPOINT: process.env?.COMMENTS_BASE_ENDPOINT || `http://localhost:${PORTS.COMMENTS}`,
    QUERY_BASE_ENDPOINT: process.env?.QUERY_BASE_ENDPOINT || `http://localhost:${PORTS.QUERY}`,
    EVENT_BASE_ENDPOINT: process.env?.EVENT_BASE_ENDPOINT || `http://localhost:${PORTS.EVENTS}`,
    PORTS,
}

module.exports = GlobalConfig;

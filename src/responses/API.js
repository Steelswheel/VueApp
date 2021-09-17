import axios from 'axios';

export const API = {
    async fetchPosts({state}) {
        try {
            state.isPostsLoading = true;
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    _page: state.page,
                    _limit: state.limit
                }
            });
            state.totalPages = Math.ceil(response.headers['x-total-count'] / state.limit);
            state.posts = response.data;
        } catch (e) {
            alert('Ошибка: ' + e);
        } finally {
            state.isPostsLoading = false;
        }
    },
    async loadMorePosts({state}) {
        try {
            state.page += 1;
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    _page: state.page,
                    _limit: state.limit
                }
            });
            state.totalPages = Math.ceil(response.headers['x-total-count'] / state.limit);
            state.posts = [...state.posts, ...response.data];
        } catch (e) {
            alert('Ошибка: ' + e);
        }
    }
}
import axios from 'axios';

export const API = {
    async fetchPosts(page, limit) {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    _page: page,
                    _limit: limit
                }
            });

            return response;
        } catch (e) {
            alert('Ошибка: ' + e);
        }
    },
    async loadMorePosts(page, limit) {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    _page: page,
                    _limit: limit
                }
            });

            return response;
        } catch (e) {
            alert('Ошибка: ' + e);
        }
    }
}
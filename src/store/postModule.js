import {API} from '@/responses/API';

export const postModule = {
    state: () => ({//здесь данные, которые будут использоваться в приложении
        posts: [],//это модель
        modificatorValue: '',
        isPostsLoading: false,
        selectedSort: '',
        searchQuery: '',
        page: 1,
        limit: 10,
        totalPages: 0,
        sortOptions: [
            {value: 'title', name: 'По названию'},
            {value: 'body', name: 'По описанию'},
        ]
    }),
    getters: {//computed-свойства
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]));
        },
        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()));
        }
    },
    mutations: {//методы, которые изменяют поля в state
        setPosts(state, posts) {
            state.posts = posts;
        },
        setLoading(state, bool) {
            state.isPostsLoading = bool;
        },
        setPage(state, page) {
            state.page = page;
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort;
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages;
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery;
        }
    },
    actions: {//функции, использующие внутри себя мутации, получаем данные с сервера и сохраняем данные в state
        fetchPosts(context) {
            context.commit('setLoading', true);
            API.fetchPosts(context.state.page, context.state.limit).then(result => {
                const total = Math.ceil(result.headers['x-total-count'] / context.state.limit);
                context.commit('setTotalPages', total);
                context.commit('setPosts', result.data);
            }).finally(() => context.commit('setLoading', false));
        },
        loadMorePosts(context) {
            context.commit('setPage', context.state.page++);
            API.loadMorePosts(context.state.page, context.state.limit).then(result => {
                const total = Math.ceil(result.headers['x-total-count'] / context.state.limit);
                context.commit('setTotalPages', total);
                context.commit('setPosts', [...context.state.posts, ...result.data]);
            });
        }
    },
    namespaced: true
}
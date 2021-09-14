//Single file component

//Шаблон компонента
<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input v-focus v-model="searchQuery" placheholder="Поиск..."/>
        <div class="app__btns">
            <my-button class="create-post" @click="showDialog">Создать пост</my-button>
            <my-select v-model="selectedSort" :options="sortOptions"/>
        </div>
        <my-dialog v-model:show="dialogVisible">
            <post-form  @create="createPost"/>
        </my-dialog>
        <post-list v-if="!isPostsLoading" :posts="sortedAndSearchedPosts" @remove="removePost"/><!-- Привязываем porps для списка постов. Аналогично v-bind:posts="posts" -->
        <div v-else>Идет загрузка</div>
        <div v-intersection="loadMorePosts" class="observer"></div>
        <!-- <div class="page__wrapper">
            <div class="page" v-for="pageNumber in totalPages" :key="pageNumber" :class="{'current-page': page === pageNumber}" @click="changePage(pageNumber)">
                {{pageNumber}}
            </div>
        </div> -->
    </div>
</template>

//Логика компонента
<script>
    import PostList from '@/components/PostList';
    import PostForm from '@/components/PostForm';
    import axios from 'axios';

    export default {
        components: {//здесь регистрируем используемые компоненты
            PostList, PostForm
        },
        data() {//здесь хранятся данные
            return {
                posts: [],//это модель
                dialogVisible: false,
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
            }
        },
        methods: {//здесь объявляются методы компонента
            createPost(post) {
                this.posts.push(post);
                this.dialogVisible = false;
            },
            removePost(post) {
                this.posts = this.posts.filter(p => {
                    return p.id !== post.id;
                });
            },
            showDialog() {
                this.dialogVisible = true;
            },
            /*changePage(pageNumber) {
                this.page = pageNumber;
            },*/
            async fetchPosts() {
                try {
                    this.isPostsLoading = true;
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _page: this.page,
                            _limit: this.limit
                        }
                    });
                    this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
                    this.posts = response.data;
                } catch (e) {
                    alert('Ошибка: ' + e);
                } finally {
                    this.isPostsLoading = false;
                }
            },
            async loadMorePosts() {
                try {
                    this.page += 1;
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _page: this.page,
                            _limit: this.limit
                        }
                    });
                    this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
                    this.posts = [...this.posts, ...response.data];
                } catch (e) {
                    alert('Ошибка: ' + e);
                }
            }
        },
        mounted() {
            this.fetchPosts();
        },
        computed: {
            sortedPosts() {
                return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]));
            },
            sortedAndSearchedPosts() {
                return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
            }
        },
        watch: {//функция-наблюдатель
            // page() {//должна называться так же, как модель и получает измененное значение модели как аргумент
            //     this.fetchPosts();
            // }
        }
    }
</script>

//Стили компонента.
//Атрибут scoped - стили применяются только к этому компоненту и недоступны извне
<style>
    .create-post {
        margin: 7px 0;
    }
    .app__btns {
        display: flex;
        justify-content: space-between;
    }
    .page__wrapper {
        display: flex;
        margin: 7px 0;
    }
    .page {
        cursor: pointer;
        border: 1px solid black;
        padding: 10px;
        margin: 15px 2px 2px 2px;
    }
    .current-page {
        border: 2px solid teal;
    }
    .observer {
        height: 30px;
        background: green;
    }
</style>
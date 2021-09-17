//Single file component

//Шаблон компонента
<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input v-focus :model-value="searchQuery" @update:model-value="setSearchQuery" placheholder="Поиск..."/>
        <div class="app__btns">
            <my-button class="create-post" @click="showDialog">Создать пост</my-button>
            <my-select :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOptions"/>
        </div>
        <my-dialog v-model:show="dialogVisible">
            <post-form  @create="createPost"/>
        </my-dialog>
        <post-list v-if="!isPostsLoading" :posts="sortedAndSearchedPosts" @remove="removePost"/> <!--  Привязываем porps для списка постов. Аналогично v-bind:posts="posts" -->
        <div v-else>Идет загрузка</div>
        <div v-intersection="loadMorePosts" class="observer"></div>
        <div class="page__wrapper">
            <div class="page" v-for="pageNumber in totalPages" :key="pageNumber" :class="{'current-page': page === pageNumber}" @click="changePage(pageNumber)">
                {{pageNumber}}
            </div>
        </div>
    </div>
</template>

//Логика компонента
<script>
    import PostList from '@/components/PostList';
    import PostForm from '@/components/PostForm';
    import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';//для сокращенного вызова

    export default {
        components: {//здесь регистрируем используемые компоненты
            PostList,
            PostForm
        },
        data() {//здесь хранятся данные
            return {
                dialogVisible: false,//это модель
            }
        },
        methods: {//здесь объявляются методы компонента
            ...mapMutations({
                setPage: 'post/setPage',
                setSearchQuery: 'post/setSearchQuery',
                setSelectedSort: 'post/setSelectedSort'
            }),
            ...mapActions({
                loadMorePosts: 'post/loadMorePosts',
                fetchPosts: 'post/fetchPosts'
            }),
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
            }
        },
        mounted() {
            this.fetchPosts(this);
        },
        computed: {
            ...mapState({
                posts: state => state.post.posts,
                modificatorValue: state => state.post.modificatorValue,
                isPostsLoading: state => state.post.isPostsLoading,
                selectedSort: state => state.post.selectedSort,
                searchQuery: state => state.post.searchQuery,
                page: state => state.post.page,
                limit: state => state.post.limit,
                totalPages: state => state.post.totalPages,
                sortOptions: state => state.post.sortOptions
            }),
            ...mapGetters({
                sortedPosts: 'post/sortedPosts',
                sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
            })
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
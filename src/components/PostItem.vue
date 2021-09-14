<template>
    <div class="post"><!-- Аналогично v-bind:key="post.title" -->
        <div>
            <div>{{ post.id }} likes = {{ $store.state.likes }}</div>
            <div>
                <strong>Название: </strong> {{ post.title }}
            </div>
            <div>
                <strong>Описание: </strong> {{ post.body }}
            </div>
        </div>
        <div class="post__btns">
            <my-button @click="$router.push(`/posts/${post.id}`)" class="post__btn">Открыть</my-button>
            <my-button @click="$emit('remove', post)" class="post__btn">Удалить</my-button>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            post: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>
    .post {
            padding: 15px;
            border: 2px solid teal;
            margin: 7px 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    .post__btns {
        display: flex;
    }
    .post__btn {
        margin: 0 2px;
    }
    .post__btn:last-child {
        margin-right: 0;
    }
</style>
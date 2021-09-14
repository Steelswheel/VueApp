<template>
    <!-- Модификаторы Vue - stop, prevent - аналоги event.preventDefault() и event.stopPropagation() в обработчике клика -->
    <form class="form" @submit.prevent>
        <h4>Создание поста</h4>
        <!-- Двустороннее связывание - привязали модель title к атрибуту value -->
        <!-- $event - зарезервированное слово для объекта события -->
        <!-- body = $event.target.value то же самое, что в methods прописать функцию, выполняющую this.body = event.target.value и передать её в @input -->
        <!-- v-model - синтаксический сахар, чтобы не морочиться с указанием типа события -->
        <my-input v-focus v-model="post.title" placeholder="Название"/>
        <my-input v-model="post.body" placeholder="Описание"/>
        <my-button class="post-button" @click="createPost">Опубликовать</my-button>
    </form>
</template>

<script>
    export default {
        data() {
            return {
                post: {
                    title: '',
                    body: ''
                }
            }
        },
        methods: {
            createPost() {
                this.post.id = Date.now();
                this.$emit('create', this.post);//создаем событие для передачи данных в родительский компонент
                this.post = {
                    title: '',
                    body: ''
                }
            }
        }
    }
</script>

<style scoped>
    .form {
        display: flex;
        flex-direction: column;
    }
    .post-button {
        align-self: flex-end;
        margin-top: 15px;
    }
</style>
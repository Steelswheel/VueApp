<template>
    <div class="navbar">
        <div @click="$router.push('/')">Vue 3</div>
        <div class="navbar__btns">
            <my-button class="navbar__btn" @click="$router.push('/posts')">Посты</my-button>
            <my-button class="navbar__btn" @click="$router.push('/about')">О приложении</my-button>
            <my-button class="navbar__btn" @click="$router.push('/store')">Посты с Vuex</my-button>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    .navbar {
        background: lightgray;
        height: 50px;
        box-shadow: 2px 2px 4px gray;
        display: flex;
        align-items: center;
        padding: 0 15px;
    }
    .navbar__btns {
        margin-left: auto;
    }
    .navbar__btn {
        margin: 4px;
    }
    .navbar__btn:last-child {
        margin-right: 0;
    }
</style>
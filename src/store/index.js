import {createStore} from 'vuex';
import {postModule} from '@/store/postModule';

export default createStore({//Является глобальным и доступно в любом месте приложения
    state: {
        isAuth: false
    },
    modules: {//модуль - изолированный кусок состояния со своими getters, actions
        post: postModule
    }
})
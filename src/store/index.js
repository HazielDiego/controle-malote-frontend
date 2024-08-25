import { createStore } from 'vuex';
import moduloUsers from './modules/user';


const store = createStore({
    modules: {
        userModule: moduloUsers

    }

})


export default store;

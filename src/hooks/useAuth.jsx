import store from '../store'


export const useAuth = () => {
    return store.getState().auth.user;
};
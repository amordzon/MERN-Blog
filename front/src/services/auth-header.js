import { store } from '../store';

export default function authHeader() {
    const currentUser = store.getState();
    const token = currentUser.persistedReducer.auth.user.token;
    if (token) {
        return { 'x-access-token': token };
    } else {
        return {};
    }
}

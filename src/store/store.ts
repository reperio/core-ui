import { configureStore } from "./configureStore";
import { observeStore } from "./observeStore";
import { localStorageService } from "../services/localStorageService";

export const store = configureStore({
    authSession: {
        reperioCoreJWT: localStorageService.getReperioCoreJWT(),
    }
});

observeStore(store, state => state.authSession.reperioCoreJWT, reperioCoreJWT => {
    localStorageService.setReperioCoreJWT(reperioCoreJWT);
});
export abstract class LocalStorage {

    static get(item: string): string | null {

        return localStorage.getItem(item);
    }

    static set(key: string, value: string): void {

        return localStorage.setItem(key, value);
    }

}

export abstract class LayoutState {

    static get_nav_state(): boolean {

        const currentState: string | null = LocalStorage.get("nav-state");
        /**
         * This is needed since the localStorage keeps the value as string
         * and the Boolean("any-string") always evalues to true.
         */
        const booleanState: boolean = currentState == "true" ? true : false;
        return booleanState;

    }

    static set_nav_state(state: boolean): void {

        return LocalStorage.set("nav-state", state.toString())
    }
}
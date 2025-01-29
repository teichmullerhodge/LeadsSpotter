
export function get_user_key(): string | null {

        return localStorage.getItem("UserKey");
}

export function logout(): void {

    localStorage.removeItem("UserKey");
    window.location.href = "/login";

}

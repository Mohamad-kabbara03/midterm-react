interface User {
    token: string;
}

interface ID {
    userid: number;
}

const USER_SESSION = "user_session"

const getLocalStorageUser = (): User | null => {
    const parseUser = JSON.parse(localStorage.getItem(USER_SESSION) || "null") as User | null;
    return parseUser;
};

const getLocalStorageUserID = (): ID | null => {
    const parseUserId = JSON.parse(localStorage.getItem(USER_SESSION) || "null") as ID | null;
    return parseUserId;
};

const setLocalStorageUser = (user: User): void => {
    localStorage.setItem(USER_SESSION, JSON.stringify(user));
};

const getToken = (): string | null => {
    const parsedUser = getLocalStorageUser();
    return parsedUser?.token || null;
};

const getUserId = (): number | null => {
    const parsedUserId = getLocalStorageUserID();
    return parsedUserId?.userid || null;
};

export {
    getLocalStorageUser,
    setLocalStorageUser,
    getToken,
    getUserId
};

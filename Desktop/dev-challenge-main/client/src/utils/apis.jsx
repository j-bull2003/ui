import apiUrl from '../Config/api'

const authApi = `${apiUrl}/api/user`
const getApi = `${apiUrl}/api/get`
const postApi = `${apiUrl}/api/post`

const AUTH = {
    LOGIN: `${authApi}/login`,
    SIGNUP: `${authApi}/signup`
}

const GET = {
    GET_PHOTOS: `${getApi}/get-photos`,
    GET_TASKS: `${getApi}/get-tasks`,
    GET_CLOTHES_DATA: `${getApi}/get-clothes-data`,
    GET_NEWS_DATA: `${getApi}/get-latest-news`,
}

const POST = {
    ADD_PHOTOS: `${postApi}/add-photo`,
    DELETE_PHOTOS: `${postApi}/delete-photo`,
    ADD_TASKS: `${postApi}/add-task`,
    UPDATE_TASKS: `${postApi}/update-task`
}

export {
    AUTH,
    GET,
    POST
}
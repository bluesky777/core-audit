import { PAGE_TYPES } from "src/auditorias/actions/PageTypes";

let sidebarShowInitial = "responsive";
const sidebarShowStorage = localStorage.getItem('sidebarShow');
if (sidebarShowStorage) {
    if (sidebarShowStorage == 'false') {
        sidebarShowInitial = false
    } else if (sidebarShowStorage == 'true') {
        sidebarShowInitial = true
    }
}
console.log(sidebarShowInitial);

const initialState = {
    sidebarShow: sidebarShowInitial,
};


export const PageReducer = (state = initialState, action) => {
    switch (action.type) {
        case PAGE_TYPES.SHOW_SIDEBAR:
            localStorage.setItem('sidebarShow', action.sidebarShow);
            state = {
                ...state,
                sidebarShow: action.sidebarShow,
            };
            break;

        default:
            break;
    }
    return state;
};

import { useState,useEffect,useReducer,createContext,useContext,memo } from "react";
const MyContext = createContext();

const InputBox = memo(({btn,name}) => {
    console.log("InputBox");
    const [inp,chInp] = useState(name ?? "");
    const {dispatch} = useContext(MyContext);
    useEffect(() => {
        chInp(name ?? "");
    },[name]);
    const submitForm = (e) => {
        e.preventDefault();
        if(inp.trim()){
            btn === "Add" && dispatch({type:"ADD",inp});
            btn === "Update" && dispatch({type:"UPDATE",inp});
            btn === "Search" && dispatch({type:"SEARCH",inp});
        }else{
            alert("Input field is invalid.");
        }
        chInp("");
    }
    return(
        <form className="d-flex" onSubmit={submitForm}>
            <input className="form-control me-2" name="item" type="text" value={inp} onChange={(e) => chInp(e.target.value)} />
            <button className="btn btn-light" type="submit">{btn}</button>
        </form>
    )
})
const Header = memo(() => {
    console.log("App > TodoApp > Header");
    const {showAll,search_term,dispatch} = useContext(MyContext);
    return(
        <div className="row p-2 py-3 text-bg-primary justify-content-around align-items-center">
            <div className="col-md-4">
                <h4>React TodoApp With Localstorage</h4>
            </div>
            {!showAll && <div className="col-md-4 d-flex">
                <h4 className="mb-0">Search For : {search_term}</h4>
                <button type="button" onClick={() => dispatch({type:"SHOWALL"})} className="ms-2 btn btn-light">Show All</button>
            </div>}
            <div className="col-md-4 align-self-center">
                <InputBox btn="Search" />
            </div>
        </div>
    )
})
const AddEditBox = memo(() => {
    console.log("App > TodoApp > AddEditBox");
    const {updtBox} = useContext(MyContext);
    return(
        <div className="row p-2 py-3 text-bg-info align-items-center justify-content-around">
            <div className="col-md-4 mb-md-0 mb-2">
                <InputBox btn="Add" />
            </div>
            <div className="col-md-4">
                {updtBox.show && <InputBox btn="Update" name={updtBox.name} />}
            </div>
        </div>
    )
})
const TodoItem = memo(({id,name}) => {
    console.log("App > TodoApp > Table > TodoItem");
    const {dispatch} = useContext(MyContext);
    return(
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td><button type="button" onClick={() => dispatch({type:"EDIT",payload:{id,name}})} className="btn btn-success">Edit</button></td>
            <td><button type="button" onClick={() => dispatch({type:"DELETE",payload:{id,name}})} className="btn btn-danger">Delete</button></td>
        </tr>
    )
})
const Table = () => {
    console.log("App > TodoApp > Table");
    const {showAll,all,search,page,limit,dispatch} = useContext(MyContext);
    const filteredItems = showAll ? all : search;
    const offset = (page - 1)*limit;
    const total_page = Math.ceil(filteredItems.length/limit);
    return(
        <div className="row mt-2">
            <table className="table text-center table-primary">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>List Item</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.length > 0 ? filteredItems.slice(offset,offset+limit).map((obj) => <TodoItem key={obj.id} {...obj} />) : (<tr><th colSpan="4">No items</th></tr>)}
                </tbody>
                <tfoot>
                    {filteredItems.length > limit && <tr>
                        <td colSpan="4">
                            <div className="btn-group" role="group" aria-label="Basic example">
                                {page > 1 && <button onClick={() => dispatch({type:"PREV_PAGE"})} type="button" className="btn btn-primary">Previous</button>}
                                {page < total_page && <button onClick={() => dispatch({type:"NEXT_PAGE"})} type="button" className="btn btn-primary">Next</button>}
                            </div>
                        </td>
                    </tr>}
                </tfoot>
            </table>
        </div>
    )
}
const randId = () => Math.floor(Math.random() * 901) + 99;
const reducer = (state,action) => {
    switch(action.type){
        case "ADD":
            return {...state,showAll:true,page:1,all:[...state.all,{id:randId(),name:action.inp}]}
        case "EDIT":
            return {...state,updtBox:{show:true,...action.payload}}
        case "UPDATE":
            return {...state,showAll:true,updtBox:{show:false,ind:null,val:""},all:state.all.map((obj) => obj.id === state.updtBox.id ? {...obj,name:action.inp}:obj)}
        case "DELETE":
            return {...state,showAll:true,page:1,all:state.all.filter((obj) => obj.id !== action.payload.id)}
        case "SEARCH":
            return {...state,page:1,showAll:false,search:state.all.filter((obj) => obj.name.includes(action.inp)),search_term:action.inp}
        case "SHOWALL":
            return {...state,page:1,showAll:true,search:[],search_term:""}
        case "NEXT_PAGE":
            return {...state,page:state.page + 1}
        case "PREV_PAGE":
            return {...state,page:state.page - 1}
        default:
            return state;
    }
}
const getInitialStateFromLocalStorage = () => {
    const storedState = localStorage.getItem('todoAppState');
    if (storedState) {
        try {
            return JSON.parse(storedState);
        } catch (error) {
            alert("Error in localstorage todoAppState value parsing");
        }
    }
    return {
        showAll: true,
        all: [],
        search: [],
        search_term: "",
        updtBox: {
            show: false,
            id: null,
            name: ""
        },
        page:1,
        limit:3
    }
}
const initialState = getInitialStateFromLocalStorage();
const TodoApp = () => {
    console.log("App > TodoApp");
    const [items,dispatch] = useReducer(reducer,initialState);
    useEffect(() => {
        localStorage.setItem('todoAppState', JSON.stringify(items));
    },[items]);
    return(
        <MyContext.Provider value={{...items,dispatch}}>
            <div className="container">
                <Header />
                <AddEditBox />
                <Table />
            </div>
        </MyContext.Provider>
    )
}

export default TodoApp;
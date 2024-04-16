import {useState,useEffect} from "react";
const User = ({login,avatar_url,html_url}) => {
    console.log("App > GithubUsers > User");
    return(
        <div className="col-lg-2 col-md-3 my-3">
            <div className="card">
                <img src={`${avatar_url}`} className="card-img-top" alt={`${login}`} />
                <div className="card-body">
                    <h5 className="card-title"><a target="_blank" href={`${html_url}`} rel="noreferrer" className="btn btn-primary text-capitalize">{login}</a></h5>
                </div>
            </div>
        </div>
    )
}
const Spinner = () => {
    console.log("App > GithubUsers > Spinner");
    return(
        <div className="d-flex justify-content-center my-3">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}
const GithubUsers = () => {
    console.log("App > GithubUsers");
    const [users,chUsers] = useState([]);
    const [loading,chLoading] = useState(false);
    const [isError,chError] = useState(false);
    const getUsers = async () => {
        try{
            const data = await (await fetch("https://api.github.com/users?per_page=50")).json();
            chUsers(data);
        }catch(err){
            chError("Data fetching error!");
        }finally{
            chLoading(false);
        }
    }
    useEffect(() => {
        getUsers();
        chLoading(true);
    },[]);
    return(
        <div className="container my-3">
            <div className="row py-2 text-bg-primary justify-content-around align-items-center">
                <div className="col-md-4 mx-auto text-center">
                    <h2>Github Users</h2>
                </div>
            </div>
            <div className="row">
                {users.length > 0 && users.map(user => <User key={user.id} {...user} />)}
                {loading && <Spinner />}
                {isError && <div className="alert alert-danger">{isError}</div>}
            </div>
        </div>
    )
}
export default GithubUsers;
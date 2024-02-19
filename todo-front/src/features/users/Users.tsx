import UsersForm from "./components/UsersForm.tsx";
import {useState} from "react";
import './components/UsersForm.scss';
import {User} from "../../types";
import {useAppDispatch} from "../../app/hooks.ts";
import {usersLogin, usersRegister} from "./usersThunk.ts";
import {useNavigate} from "react-router-dom";

const Users = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const createdUser = async (user: User) => {
        try {
           await dispatch(usersRegister(user));
            navigation('/tasks/new');
        } catch (e) {
            throw(e);
        }
    };
    const loginUser = async (user: User) => {
        try{
           await dispatch(usersLogin(user));
        }catch (e) {
            throw(e);
        }finally {
            navigation('/tasks');
        }
    }
    return (
        <>
            <div className="form-element form-submit">
                <button onClick={() => setShowForm(false)} className="signup">Sign up</button>
                <button onClick={() => setShowForm(true)} className="signup ">Log In</button>
            </div>
            <div className="formsDiv">
            <div id="back">
                <canvas id="canvas" className="canvas-back"></canvas>
                {!showForm ? <div className="backRight">
                    </div> :
                    <div className="backLeft">
                    </div>}
            </div>
            {showForm ?
                (<div className="right">
                    <div className="content">
                        <h2>Login</h2>
                        <UsersForm onSubmit={loginUser} show={showForm}/>
                    </div>
                </div>) :
                (<div className="left">
                    <div className="content">
                        <h2>Sign Up</h2>
                        <UsersForm onSubmit={createdUser} show={showForm}/>
                    </div>
                </div>)}
        </div>
            </>
    );
};

export default Users;
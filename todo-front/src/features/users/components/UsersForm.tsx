import React, {useState} from "react";
import {User} from "../../../types";
import './UsersForm.scss';

interface Props {
   onSubmit: (user: User) => void ;
   show: boolean;
}
const UsersForm: React.FC<Props> = ({show, onSubmit}) => {
    const [user, setUser] = useState<User>({
        username: "",
        password: ""
    });

    const changeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(user);
    };

    return (
        <>
            <form id="form-signup" method="post" >
                <div className="form-element form-stack">
                    <label htmlFor="username-signup" className="form-label">Username</label>
                    <input id="username-signup"
                           type="text"
                           name="username"
                           value={user.username}
                           onChange={changeUser}
                           required/>
                </div>
                <div className="form-element form-stack">
                    <label htmlFor="password-signup" className="form-label">Password</label>
                    <input id="password-signup"
                           type="password"
                           name="password"
                           value={user.password}
                           onChange={changeUser}
                           required
                    />
                </div>
                <button type='submit' className="signup" onClick={onFormSubmit}>{show ? 'Log in' : 'Sing up'}</button>
            </form>
        </>
    );
};

export default UsersForm;
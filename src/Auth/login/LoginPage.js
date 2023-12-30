import React, { Fragment, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useUsersContext } from '../../context/user_context'
import ButtonLoader from "../../Auth/loader/Loader";
import MetaData from "../../components/MetaData";
import styles from "./Login.module.scss";
import LoginValidations from "../../validations/LoginValidations";
import { useFormik } from "formik";
import { toast } from "react-toastify";

const Login = () => {
    const [remember,setRemember] = useState(false);
    const { clearErrors, login,isAuthenticated, error, loading} = useUsersContext()
    const navigate = useNavigate()
    const { values, handleSubmit, handleChange, resetForm,isValid } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: values => {
            const {email,password} = values
            const formData = {
                email,
                password,
                remember
            }
            console.log(formData)
            login(formData);
            resetForm();
        },
        validationSchema: LoginValidations
    });



    const handleCheckboxChange = () => {
        setRemember(!remember); 
    };

    // useEffect(() => {

        if (isAuthenticated) {
            toast.success("Sign In Successfully")
            setTimeout(() => window.location.href = '/', 3000);
        }

        if (error) {
            setTimeout(() => window.location.href = '/login', 3000);
            toast.error(error);
        }
    // }, [isAuthenticated, error]);

    return (
        <Fragment>
            <MetaData title={"Login"} />
            <div className={styles.login}>
                <div className={styles.login_container}>
                    <h3 className="text-center text-white mb-3">Login</h3>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.from_group}>
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email ..."
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.from_group}>
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password ..."
                                value={values.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.from_group}>
                            <button type="submit" disabled={!isValid} >
                                {loading ? <ButtonLoader /> : "Login"}
                            </button>
                        </div>
                        <p className="text-center text-white">
                            <input type="checkbox" id="myCheckbox" checked={remember}  onChange={handleCheckboxChange}/>
                            <label for="rememberCheckbox" >
                            Remember me</label>
                        </p>
                    </form>
                    <div className={styles.from_group}>
                        <p className="text-center text-white">
                            Dont Have Account ?{" "}
                            <Link to="/register">Signup</Link>
                        </p>
                        
                        <p className="text-center text-white">
                            <Link to="/password/forgot">Forgot Password?</Link>
                        </p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Login;
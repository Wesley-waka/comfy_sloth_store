import React, { Fragment, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonLoader from "../../Auth/loader/ButtonLoader";
import MetaData from "../../components/MetaData";
import styles from "./Signup.module.scss";
import { useUsersContext } from "../../context/user_context";
import { useFormik } from 'formik';
import RegisterValidations from "../../validations/RegisterValidations";
import { toast } from "react-toastify";

const Register = ({ history }) => {
    const { clearErrors, register,isAuthenticated,error,loading} = useUsersContext()
    const navigate = useNavigate
    const { values, handleSubmit, handleChange, isValid, resetForm } = useFormik({
        initialValues: {
            name:"",
            email: '',
            password: ''
        },
        onSubmit: values => {
            const {name,email,password} = values
            const formData = {
                name,
                email,
                password
            }
            register(formData);
            resetForm();
        },
        validationSchema: RegisterValidations
    });


    // useEffect(() => {
        if (isAuthenticated) {
            // window.location.href = '/login';
            toast.success("Sign Up Successfully");
            setTimeout(() => window.location.href = '/login', 3000);
        }

        if (error) {
            return toast.error(error);
            // clearErrors();
        }
    // }, [  isAuthenticated, error]);

    return (
        <Fragment>
            <MetaData title={"Register"} />
            <div className={styles.login}>
                <div className={styles.login_container}>
                    <h3 className="text-center text-white mb-3">Register</h3>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.from_group}>
                            <label htmlFor="anme_field">Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name ..."
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                            />
                        </div>
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
                                placeholder="Enter your password ..."
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.from_group}>
                            <button type="submit" disabled={!isValid} >
                                {loading ? <ButtonLoader /> : "Register"}
                            </button>
                        </div>
                    </form>
                    <div className={styles.from_group}>
                        <p className="text-center text-white">
                            Already Have Account ?{" "}
                            <Link to="/login">Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Register;

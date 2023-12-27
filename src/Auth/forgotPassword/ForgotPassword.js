import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../../components/MetaData";
import styles from "./ForgotPassword.module.scss";
import { useUsersContext } from "../../context/user_context";
import { useFormik } from "formik";
import { toast } from "react-toastify";

const ForgotPassword = () => {
    const { clearErrors, forgotPassword,loading, error, message} = useUsersContext()

    const { values, handleSubmit, handleChange, resetForm,isValid } = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: values => {
            const {email} = values
            const formData = {
                email,
            }
            forgotPassword(formData);
            resetForm();
        }
    });

    if (error) {
        return toast.error(error)
    }

    if (message) {
        return toast.error(message);
        // clearErrors();
    }

    return (
        <Fragment>
            <MetaData title={"Forgot Password"} />
            <div className={styles.forgot_password}>
                <div className={styles.forgot_password_container}>
                    <div className="col-10 col-lg-5">
                        <form className="shadow-lg" onSubmit={handleSubmit}>
                            <h3 className="text-center text-white mb-3">Forgot Password</h3>
                            <div className={styles.form_group} >
                                <label htmlFor="email_field">Enter Email</label>
                                <input
                                    type="email"
                                    id="email_field"
                                    className="form-control"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={styles.form_group}>
                                <button
                                    id="forgot_password_button"
                                    type="submit"
                                    disabled={loading ? true : false}
                                >
                                    Send Email
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ForgotPassword;

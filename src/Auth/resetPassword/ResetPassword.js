import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../../components/MetaData";

import styles from "./ResetPassword.module.scss";
import { useUsersContext } from "../../context/user_context";
import { useFormik } from "formik";

const ResetPassword = ({ history, match }) => {
    const { clearErrors, resetPassword, error, success} = useUsersContext()

    const { values, handleSubmit, handleChange, resetForm } = useFormik({
        initialValues: {
            password: '',
            confirmPassword: ''
        },
        onSubmit: values => {
            const {password,confirmPassword,} = values
            const formData = {
                password,
                confirmPassword,
            }
            resetPassword(match.params.token, formData)
            resetForm();
        }
    });

    useEffect(() => {
        if (error) {
            clearErrors();
        }

        if (success) {
            history.push("/login");
        }
    }, [error, success]);


    return (
        <Fragment>
            <MetaData title={"Reset Password"} />
            <div className={styles.reset_password}>
                <div className={styles.reset_password_container}>
                    <div className="col-10 col-lg-5">
                        <form  onSubmit={handleSubmit}>
                            <h3 className="text-center text-white mb-3">Forgot Password</h3>
                            <div className={styles.form_group}>
                                <label htmlFor="password_field">Password</label>
                                <input
                                    type="password"
                                    id="password_field"
                                    className="form-control"
                                    value={values.password}
                                    onChange={handleChange
                                    }
                                />
                            </div>

                            <div className={styles.form_group}>
                                <label htmlFor="confirm_password_field">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirm_password_field"
                                    className="form-control"
                                    value={values.confirmPassword}
                                    onChange={handleChange
                                    }
                                />
                            </div>
                            
                            <div className={styles.form_group}>
                                <button
                                    id="new_password_button"
                                    type="submit"
                                    >
                                    Set Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ResetPassword;
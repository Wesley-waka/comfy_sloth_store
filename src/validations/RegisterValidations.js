import * as yup from 'yup';

const RegisterValidations = yup.object().shape({
    name: yup.string().required("name is required").min(1).max(30),
    email: yup.string().required().email(),
    password: yup.string().required().min(5).max(20),
});

export default RegisterValidations;
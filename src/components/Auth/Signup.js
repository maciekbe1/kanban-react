import React, { useState } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import Error from "../Error";
const SIGNUP_MUTATION = gql`
    mutation signUpMutation(
        $login: String!
        $password: String!
        $email: String!
        $f_name: String!
        $l_name: String!
    ) {
        createUser(
            login: $login
            password: $password
            email: $email
            f_name: $f_name
            l_name: $l_name
        ) {
            _id
            login
            email
            f_name
            l_name
        }
    }
`;
const initialFormState = {
    login: "",
    password: "",
    confirm: "",
    email: "",
    f_name: "",
    l_name: ""
};

export default function Signup() {
    const [form, setForm] = useState(initialFormState);
    // const [user, setUser] = useState(null);

    const handleChange = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };
    const handleSubmit = (e, createUser) => {
        e.preventDefault();

        createUser().then(({ data }) => {
            // setUser(form);
            setForm(initialFormState);
        });
    };
    const validateForm = () => {
        const isInvalid =
            !form.login || !form.password || !form.confirm || !form.email;
        return isInvalid;
    };
    return (
        <div>
            <Mutation mutation={SIGNUP_MUTATION} variables={form}>
                {(createUser, { data, loading, error }) => {
                    return (
                        <form onSubmit={e => handleSubmit(e, createUser)}>
                            <input
                                type="text"
                                placeholder="login"
                                name="login"
                                onChange={handleChange}
                                value={form.login}
                            />
                            <input
                                type="password"
                                placeholder="password"
                                name="password"
                                onChange={handleChange}
                                value={form.password}
                            />
                            <input
                                type="confirm"
                                placeholder="confirm"
                                name="confirm"
                                onChange={handleChange}
                                value={form.confirm}
                            />
                            <input
                                type="email"
                                placeholder="email"
                                name="email"
                                onChange={handleChange}
                                value={form.email}
                            />
                            <button type="submit" disabled={validateForm()}>
                                {loading ? (
                                    <span
                                        className="spinner-border spinner-border-sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                ) : (
                                    "Sign up"
                                )}
                            </button>
                            {error && <Error error={error} />}
                        </form>
                    );
                }}
            </Mutation>

            {/* {user && JSON.stringify(user, null, 2)} */}
        </div>
    );
}

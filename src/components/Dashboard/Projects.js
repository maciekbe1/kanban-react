import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_PROJECTS } from "../../graphql";
import Error from "../Error";
import { useSelector } from "react-redux";

export default function Projects() {
    const user = useSelector(state => state.currentUser);
    const { data, loading, error } = useQuery(GET_PROJECTS, {
        variables: { userID: user.userID }
    });
    if (loading) return <div>Loading</div>;
    if (error) return <Error error={error} />;
    return (
        <div>
            {data.getAllUserProjects.projects.map((item, index) => {
                return <div key={index}>{item.name}</div>;
            })}
        </div>
    );
}

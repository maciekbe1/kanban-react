import React, { useContext } from "react";
import { useQuery } from "react-apollo-hooks";
import { GET_PROJECTS } from "../../graphql";
import Context from "../../context";
import Error from "../Error";
export default function Projects() {
	const context = useContext(Context);
	const { data, loading, error } = useQuery(GET_PROJECTS, {
		variables: { userID: context.state.userID }
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

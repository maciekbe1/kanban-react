import React, { useContext } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Context from "../../context";
import Error from "../Error";
export default function Projects() {
    const context = useContext(Context);
    const GET_PROJECTS = gql`
        query getAllUserProjectsQuery($userId: ID!) {
            getAllUserProjects(userId: $userId) {
                projects {
                    _id
                    name
                    users
                    status
                }
                totalProjects
            }
        }
    `;
    return (
        <Query
            query={GET_PROJECTS}
            variables={{ userId: context.state.userId }}
        >
            {({ data, loading, error }) => {
                return (
                    <div>
                        <p>Project names</p>
                        <div>
                            {!loading && data
                                ? data.getAllUserProjects.projects.map(
                                      (project, index) => {
                                          return (
                                              <p key={index}>{project.name}</p>
                                          );
                                      }
                                  )
                                : error && <Error error={error} />}
                        </div>
                    </div>
                );
            }}
        </Query>
    );
}

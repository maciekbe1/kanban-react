import gql from "graphql-tag";

export const MESSAGES_COUNTER = gql`
	subscription onCount($userID: ID!) {
		messageCounter(userID: $userID)
	}
`;
export const MESSAGE_SUB = gql`
	subscription onMessages($userID: ID!, $first: Int) {
		messageSub(userID: $userID, first: $first) {
			messages {
				_id
				userID
				message
				readed
				date
			}
			totalUnreadedMessage
			totalMessages
		}
	}
`;
export const GET_PROJECTS = gql`
	query getUserProjects($userID: ID!) {
		getAllUserProjects(userID: $userID) {
			projects {
				_id
				name
				users
			}
			totalProjects
		}
	}
`;
export const GET_MESSAGES = gql`
	query getAllMessages($first: Int, $userID: ID!, $readed: Boolean) {
		getAllUserMessages(first: $first, userID: $userID, readed: $readed) {
			messages {
				_id
				userID
				message
				readed
			}
			totalUnreadedMessage
			totalMessages
		}
	}
`;
export const GET_USERS = gql`
	query getUserQuery($_id: ID!) {
		getUser(_id: $_id) {
			login
		}
	}
`;
export const MARK_AS_READED = gql`
	mutation changeMessageStatusMutation($messageID: ID!) {
		changeMessageStatus(messageID: $messageID) {
			readed
		}
	}
`;

let authToken = null;

export const setAuthToken = (token) => {
	authToken = token;
};

export const getAuthToken = () => {
	return authToken;
};

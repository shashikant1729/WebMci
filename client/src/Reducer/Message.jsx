export const initialStateMessage = null;

export const reducerMessage = (stateMessage, actionMesssage) => {
	if (actionMesssage.type === "Message") {
		return actionMesssage.payload;
	}
	return stateMessage;
};

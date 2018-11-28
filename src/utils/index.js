export const getDomain = () => {
	const {protocol, host} = window.location;
	return protocol.concat("//").concat(host);
}
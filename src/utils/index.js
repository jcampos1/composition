import queryString from 'query-string';
import {REDIRECT_PARAMETER} from 'constants/index';

export const getDomain = () => {
	const {protocol, host} = window.location;
	return protocol.concat("//").concat(host);
}

export const getParseQueryParams = () => 
	queryString.parse(window.location.search)

export const getRedirectUrl = () => {
	let queryParsed = getParseQueryParams();
	const relativeUrl = queryParsed[REDIRECT_PARAMETER];
	delete queryParsed[REDIRECT_PARAMETER];
	const qs = queryString.stringify(queryParsed);
	return relativeUrl.concat(`?${qs}`);
}

export const getNextPage = () => {
	const {pathname, search} = window.location;
	let page = pathname;

	if (search) {
		const qs = queryString.stringify(queryString.parse(search));
		page = page.concat(`&${qs}`);
	}

	return page;
}
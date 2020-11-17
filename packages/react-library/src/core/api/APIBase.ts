const fetchHeaders: HeadersInit = {
	Accept: "application/json",
	"Content-Type": "application/json",
	// sample user id for making core service calls in the local dev environment - change as needed for desired roles/permissions
	USDA_USER_EAUTHID: "28200310160021033267",
	// sample X-App-ID for making core service calls in the local dev environment - change this to the application's X-App-Id if possible
	"X-App-ID": "43D906E9-2CAC-404D-9350-D7FB38FDA840",
};

type HttpMethodType = "GET" | "POST" | "PUT";

export function fetchData(
	url = "",
	method: HttpMethodType = "GET",
	body: string | undefined = undefined
) {
	const fetchInit: RequestInit = {
		method,
		//mode: "cors",
		cache: "no-cache",
		//referrerPolicy: "no-referrer",
		headers: fetchHeaders,
	};

	if (body) {
		fetchInit.body = body;
	}

	return fetch(url, fetchInit);
}

export function getData(url = "") {
	return fetchData(url);
}

export function postData(url = "", body: string = "") {
	return fetchData(url, "POST", body);
}

export function putData(url = "", body: string = "") {
	return fetchData(url, "PUT", body);
}

interface IProxyObject {
	url: string;
	requestType: HttpMethodType;
	requestObject?: string;
}

function invokeFetch(
	proxyObject: IProxyObject,
	onSuccess: (response: any) => void,
	onError: (response: any) => void
) {
	try {
		switch (proxyObject.requestType) {
			case "GET":
				getData(proxyObject.url)
					.then((r) => r.json())
					.then(onSuccess);
				break;

			case "POST":
			case "PUT":
				fetchData(proxyObject.url, proxyObject.requestType, proxyObject.requestObject)
					.then((r) => r.json())
					.then(onSuccess);
				break;
		}
	} catch (e) {
		onError(e);
	}
}

export class APIBase {
	constructor(
		coreservicesUrl?: string,
		invokeProxyService?: (
			proxyObject: any,
			onSuccess: (response: any) => void,
			onError: (response: any) => void
		) => any
	) {
		const w = window as any;

		this._coreservicesUrl =
			coreservicesUrl || (w && w.config && w.config.userPreferences.coreservicesUrl) || null;
		this._invokeProxyService =
			invokeProxyService ||
			(w && w.usda && w.usda.nrcs && w.usda.nrcs.events && w.usda.nrcs.events.invokeProxyService) ||
			null;
	}

	private _coreservicesUrl: string | null;
	private _invokeProxyService:
		| ((
				proxyObject: any,
				onSuccess: (response: any) => void,
				onError: (response: any) => void
		  ) => any)
		| null;

	private get coreservicesUrl(): string {
		// if _coreservicesUrl is null then try to get it from window.config.userPreferences
		if (this._coreservicesUrl === null) {
			const w = window as any;
			this._coreservicesUrl = (w && w.config && w.config.userPreferences.coreservicesUrl) || null;
		}

		return (
			this._coreservicesUrl ||
			// couldn't get it from global variable and it was never set in the constructor
			"url:unknown"
		);
	}

	private get invokeProxyService(): (
		proxyObject: any,
		onSuccess: (response: any) => void,
		onError: (response: any) => void
	) => any {
		// if _invokeProxyService is null then try to get it from window.usda.nrcs.events
		if (this._invokeProxyService === null) {
			const w = window as any;
			this._invokeProxyService =
				(w &&
					w.usda &&
					w.usda.nrcs &&
					w.usda.nrcs.events &&
					w.usda.nrcs.events.invokeProxyService) ||
				null;
		}

		return (
			this._invokeProxyService ||
			// use the default invokeFetch function - couldn't find the invokeProxyService in the global variables
			invokeFetch
		);
	}

	private constructUrl(endpoint: string) {
		const len = this.coreservicesUrl.length;
		if (endpoint[0] === "/") {
			if (this.coreservicesUrl[len - 1] === "/") {
				return this.coreservicesUrl + endpoint.substring(1);
			}

			return this.coreservicesUrl + endpoint;
		}

		if (this.coreservicesUrl[len - 1] === "/") {
			return this.coreservicesUrl + endpoint;
		}

		return this.coreservicesUrl + "/" + endpoint;
	}

	private processProxyResponse(response: any, resolver: (value: any) => void) {
		// the proxy returns a json object inside a string - this function will transform that into a proper json object
		if (response) {
			let c = 0;
			while (typeof response === "string" && c < 4) {
				response = JSON.parse(response);
				c += 1;
			}
		}

		resolver(response);
	}

	private callProxyService(endpoint: string, requestType: HttpMethodType, requestObject?: string) {
		const url = this.constructUrl(endpoint);
		const proxyObject: any = {
			url,
			requestType,
		};

		if (requestObject !== null && requestObject !== undefined) {
			proxyObject.requestObject = requestObject;
		}

		return new Promise((resolve, reject) => {
			this.invokeProxyService(
				proxyObject,
				// handle success
				(response) => {
					this.processProxyResponse(response, resolve);
				},
				// handle error
				// TODO: figure out how to handle errors - this currently does the same as CDSI Resources
				(response) => {
					this.processProxyResponse(response, resolve);
				}
			);
		});
	}

	protected httpGet(endpoint: string) {
		return this.callProxyService(endpoint, "GET");
	}

	protected httpPost(endpoint: string, requestObject?: object) {
		return this.callProxyService(endpoint, "POST", JSON.stringify(requestObject));
	}

	protected httpPut(endpoint: string, requestObject?: object) {
		return this.callProxyService(endpoint, "PUT", JSON.stringify(requestObject));
	}
}

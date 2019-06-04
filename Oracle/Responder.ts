/// wss://mainnet.infura.io/ws/v3/63dbbe242127449b9aeb061c6640ab95
const request = require('request');

function requestPromise(url: string, method: string = 'GET', headers: number = -1, data: number = -1) {
	var trans: any = {
		method: method,
		url: url
	};
	if (headers != -1) trans.headers = headers;
	if (data != -1) {
		trans.data = data;
		trans.json = true;
	}
	return new Promise((resolve, reject) => {
		request(trans, (err: any, response: any, data: any) => {
			if (err) {
				reject(err);
				return;
			}
			resolve(data);
		});
	});
}

export async function getResponse(query: string, params: any[]) {
	//Get data based on the query string and Parameters
	// console.log(params);
	try {
		const currency = params[0].toString();
		const priceOf = params[1].toString();
		var apiKey: string = '1ec7c9ecd157bbea';
		var URL: string =
			'https://coinlib.io/api/v1/coinlist?key=' + apiKey + '&pref=' + currency + '&symbol=' + priceOf;
		const body: any = await requestPromise(URL);
		const json: any = JSON.parse(body);
		const price: any = json['coins'][0]['price'];

		const output = 'The price of ' + priceOf + ' is ' + price + ' ' + currency;

		console.log(output);

		return [ '' + priceOf, '' + price, '' + currency ];
	} catch (error) {
		console.log('error');
		// If an error is encountered, returns an error message
		return [ '0', 'Unable to Access data. Try again later' ];
	}
}

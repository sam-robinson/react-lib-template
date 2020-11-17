// functions to use in Array.sort for comparing mixed string/numeric values
// for example, ["Land Unit 2", "Land Unit 10"] gets sorted incorrectly just using regular string sort
// but naturalCompare will sort it as expected

export const naturalCompare = (a: any, b: any) =>
	a
		.toString()
		.localeCompare(
			b.toString(),
			navigator.languages ? navigator.languages[0] : navigator.language,
			{
				numeric: true,
				ignorePunctuation: true,
			}
		);

export const naturalObjectPropertyCompare = (property: string) => (a: any, b: any) =>
	naturalCompare(a[property], b[property]);

export const naturalObjectCompare = <T>(getValue: (source: T) => string) => (a: T, b: T) =>
	naturalCompare(getValue(a), getValue(b));

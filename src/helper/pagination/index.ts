export interface IPagination {
	start: number;
	end: number;
	range: number[];
	totalPage: number;
	totalItem: number;
}

export interface IPaginationData<T> {
	data: T[];
	pagination: IPagination;
}

export function calculatePagination(
	page: number,
	numberOfItemInOnePage: number,
	totalItem: number,
) {
	const totalPage = Math.ceil(totalItem / numberOfItemInOnePage);

	const start = 1 + numberOfItemInOnePage * (page - 1);
	if (start > totalItem) {
		throw new Error(`page: ${page} is not available`);
	}
	let end = start + numberOfItemInOnePage - 1;

	if (end > totalItem) {
		end = totalItem;
	}

	const rangeMap = new Set<number>();
	for (let i = start; i <= end; i++) {
		rangeMap.add(i);
	}

	const pagination: IPagination = {
		start,
		end,
		range: Array.from(rangeMap),
		totalPage,
		totalItem,
	};

	return pagination;
}

export function calculatePaginationFromArray(page: number, numberOfItemInOnePage: number, array: number[]) {
	const totalPage = Math.ceil(array.length / numberOfItemInOnePage);
	let end = page * numberOfItemInOnePage
	const start = end - numberOfItemInOnePage
	if (end > array.length) {
		end = array.length
	}
	console.log(start, end)
	const copyArray = structuredClone(array)
	const range = copyArray.slice(start,end)
	const pagination: IPagination = {
		start,
		end,
		range,
		totalPage,
		totalItem: array.length
	};	
	return pagination
}

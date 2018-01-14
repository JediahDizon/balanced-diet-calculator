export function prepareFoodGroup(toPrepare) {
	return {
		"FoodGroupID": toPrepare["fgid"],
		"Name": toPrepare["foodgroup"],
		"Categories": toPrepare["categories"].map(category => ({
			"ID": category["fgcat_id"],
			"Name": category["fgcat"]
		}))
	};
}

export function prepareServing(toPrepare) {
	return {
		"FoodGroupID": toPrepare["fgid"],
		"Gender": toPrepare["gender"],
		"Ages": toPrepare["ages"],
		"Servings": toPrepare["servings"]
	};
}

export function prepareFood(toPrepare) {
	return {
		"FoodGroupID": toPrepare["fgid"],
		"Name": toPrepare["food"],
		"Serving Size": toPrepare["srvg_sz"],
		"Category": toPrepare["fgcat_id"]
	}
}

const { default: LHG } = require("@/utils/axios");

export const getCompanyList = (params) => {
	return LHG({
		method: "get",
		url: "/api/company/page",
		data: params,
	});
};

import LHG from "@/utils/axios";
export const getManagerList = (params = { pageIndex: 1, pageSize: 20 }) => {
	return LHG.get("/api/responsibleperson/page", {
		params: params,
	});
};

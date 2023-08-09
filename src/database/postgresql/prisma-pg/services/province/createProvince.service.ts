import Province from '../../repository/province';

const createProvinceService = async (provinceInput) => {
	return await Province.create(provinceInput);	
}

export default createProvinceService
export interface Soil {
  magnesuim: number; //마그네슘
  potassium: number; //칼륨
  calcium: number; // 칼슘
  silicon: number; // 규소
  phosphorus: number; // 유효 인산
  electricalConductivity: number; // 전기전도도
  organicMatter: number; // 유기물질
  pH: number; // pH
  soilType: string;
  gravel: number; // 자갈
  drainage: number; // 배수성
  soilHumidity10cm: number; // 토양습도
  soilHumidity30cm: number; // 토양습도
}

export interface SoilRecord {
  soil: Soil;
  date: Date;
  location: Location;
}

export interface Climate {
  averageTemp: number;
  lowestTemp: number;
  highestTemp: number;
  sunHours: number;
  sunAmount: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  windDirection: string;
  evaporation: number;
}

export interface ClimateRecord {
  date: Date;
  location: Location;
  climate: Climate;
}

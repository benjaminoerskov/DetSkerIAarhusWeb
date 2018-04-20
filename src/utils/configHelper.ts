interface IConfig {
  urls: {
    baseAPIURL: string;
    termsURL: string;
  };
}

const devConfig =  {
  
    urls: {

      baseAPIURL: "http://192.168.5.61:54382/api",
      termsURL: "https://www.google.com"
    }
  }


const getConfig = (): IConfig => {

  return devConfig; // releaseChannel does not exist in dev mode
};

export { getConfig, IConfig };

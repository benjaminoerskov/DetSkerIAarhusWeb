interface IConfig {
  urls: {
    baseAPIURL: string;
    termsURL: string;
  };
}

const devConfig =  

{
  
    urls: {

      baseAPIURL: "http://localhost:44345/api",
      termsURL: "https://www.google.com"
    }
  }


const getConfig = (): IConfig => {

  return devConfig; // releaseChannel does not exist in dev mode
};

export { getConfig, IConfig };

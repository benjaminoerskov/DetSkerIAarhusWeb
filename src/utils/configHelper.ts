interface IConfig {
  urls: {
    baseAPIURL: string;
    termsURL: string;
  };
}
const devConfig =  
{
    urls: {
      baseAPIURL: "https://dsia-web-api.herokuapp.com/api",
      termsURL: "https://www.google.com"
    }
  }

const getConfig = (): IConfig => {

  return devConfig; // releaseChannel does not exist in dev mode
};

export { getConfig, IConfig };

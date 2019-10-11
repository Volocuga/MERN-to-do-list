import ConfigProd from './configStore.prod';
import ConfigDev from './configStore.dev';

export default process.env.NODE_ENV === 'production' ? ConfigProd : ConfigDev;

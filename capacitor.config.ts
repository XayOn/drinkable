import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.xayon.mixology',
    appName: 'Mixology',
    webDir: 'dist',
    bundledWebRuntime: false,
    backgroundColor: '#161212',
    plugins: {
        CapacitorHttp: {
            enabled: true
        }
    }
};

export default config;

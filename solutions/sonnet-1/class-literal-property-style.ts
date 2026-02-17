class AppConfig {
    readonly appName: string = 'MyApp';
    readonly maxRetries: number = 3;
    readonly isProduction: boolean = false;
    readonly apiVersion: string = 'v1';

    constructor() {}
}

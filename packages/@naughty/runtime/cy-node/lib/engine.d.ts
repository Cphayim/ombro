declare type BootStrapOptions = {
    entry: string;
    babelConfig: string;
};
export default class Engine {
    private userRoot;
    private moduleRoot;
    constructor(userRoot: string, moduleRoot: string);
    bootstrap({ entry, babelConfig }: BootStrapOptions): void;
}
export {};

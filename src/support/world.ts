import { setWorldConstructor } from '@cucumber/cucumber';

export class CustomWorld {
    constructor() {
        // Initialize any shared variables or states
    }
}

setWorldConstructor(CustomWorld);
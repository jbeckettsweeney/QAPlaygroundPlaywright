import { Locator } from "@playwright/test";


export default class LocatorHelper {

    static getSelectorFromLocator(locator: Locator) {
        //@ts-ignore
        return locator._selector;
    }

}
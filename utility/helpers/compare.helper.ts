export default class CompareHelper {

    /**
     * Recursively clones input
     * - https://plainenglish.io/blog/deep-clone-an-object-and-preserve-its-type-with-typescript-d488c35e5574
     * @param source 
     * @returns 
     */
    static deepClone<T>(source: T) {
        return Array.isArray(source)
            ? source.map(item => CompareHelper.deepClone(item)) // deep clone of array
            : source instanceof Date
                ? new Date(source.getTime()) // clone of singular Date object
                : source && typeof source === 'object'
                    ? Object.getOwnPropertyNames(source).reduce((obj, prop) => { // deep clone of object, preserving type
                        obj[prop] = CompareHelper.deepClone(source[prop]);
                        return obj;
                    }, Object.create(Object.getPrototypeOf(source)))
                    : source as T; // simple return of primitive type
    }

    //
    static sort(input: any, targetKeys: string[] = [], deepSort: boolean = false) {

        // Make type-based sorting decision
        if (input == null || input instanceof Date || typeof input !== 'object') {
            console.log(`no need to sort ${JSON.stringify(input)}`)

            // No action needed

        } else if (!(Array.isArray(input)) && typeof input === 'object') {
            console.log(`sorting each key of object ${JSON.stringify(input)}`)

            // Sort each key of object
            let keys = Object.keys(input);
            for (const key of keys) {
                input[key] = CompareHelper.sort(input[key], targetKeys, deepSort);
            }

        } else if (Array.isArray(input)) {
            console.warn(`sorting each item of array ${JSON.stringify(input)}`)
            if (targetKeys.length > 0) console.warn(`will use keys: ${JSON.stringify(targetKeys)}`)

            // Ensure array has length
            let array: any[] = input;
            if (array.length > 0) {

                // Sort based on array type
                if (array[0] instanceof Date || typeof array[0] !== 'object') {

                    // Date or primitive type sort
                    array = array.sort((a, b) => {
                        console.log(`  primitive sort: ${JSON.stringify(a)} > ${JSON.stringify(b)}: ${JSON.stringify(a) > JSON.stringify(b)} `)
                        if (a < b) return -1;
                        if (a > b) return 1;
                        return 0;
                    });

                } else if (Array.isArray(array[0])) {

                    // Array; sort each contained array individually but do not attempt to sort This array
                    for (let i = 0; i < array.length; i++) {
                        array[i] = CompareHelper.sort(array[i], targetKeys, deepSort);
                    }

                } else {

                    // Object sort; need to find sortable key
                    if (deepSort) {

                        // implement later: search through ALL nested keys to find suitable sort key

                    } else {

                        // Get best key for sorting
                        let key = CompareHelper.getBestKeyForSorting(array, targetKeys);

                        // Sort by found key
                        array = array.sort((a, b) => {
                            let aValue = a[key];
                            let bValue = b[key];
                            console.warn(`comparing ${JSON.stringify(aValue)} and ${JSON.stringify(bValue)}`)
                            if (aValue != null && bValue != null) { // both values exist
                                console.warn(`    ${JSON.stringify(aValue)} > ${JSON.stringify(bValue)}: ${JSON.stringify(aValue) > JSON.stringify(bValue)}`)
                                if (aValue < bValue) return -1;
                                if (aValue > bValue) return 1;
                                return 0;
                            } else if (aValue == null && bValue != null) { // only second value exists
                                console.warn(`    float down: ${JSON.stringify(aValue)}`)
                                return 1;
                            } else if (aValue != null && bValue == null) { // only first value exists
                                console.warn(`    float up: ${JSON.stringify(aValue)}`)
                                return -1;
                            } else { // neither value exists
                                console.warn(`    no change between: ${JSON.stringify(aValue)} and ${JSON.stringify(bValue)}`)
                                return 0;
                            }
                        });
                    }

                    // Sort each item within array
                    for (let i = 0; i < array.length; i++) {
                        array[i] = CompareHelper.sort(array[i], targetKeys, deepSort);
                    }
                }
            }

            // Set return to sorted array
            input = array;
            console.warn(`    sorted: ${JSON.stringify(input, null, 2)}`)

        } else {
            throw new Error(`Error assessing input type for sorting\n - input: ${JSON.stringify(input, null, 2)}`);
        }

        // Return the sorted input
        return input;

    }

    /**
     * Check keys of all objects within an object array and return the key most appropriate for sorting
     * - optionally include list of target keys, each of which will be prioritized if a single instance is found
     * @param input 
     * @param targetKeys 
     * @returns 
     */
    static getBestKeyForSorting(input: object[], targetKeys: string[] = []) {

        // Get all keys from array
        let allKeys: string[] = [];
        for (const item of input) {
            let itemKeys = Object.keys(item);
            allKeys = allKeys.concat(itemKeys);
        }

        // Eject if list of keys is empty
        if (allKeys.length === 0) throw new Error('No keys found within input object array');

        // Get map of key occurrences and current best key
        let keyMap = {};
        let currentBestKey = allKeys[0];
        let currentBestCount = 1;
        for (const key of allKeys) {
            if (keyMap[key] == null) {
                keyMap[key] = 1;
            } else {
                keyMap[key]++;
            }
            if (keyMap[key] > currentBestCount) {
                currentBestCount = keyMap[key];
                currentBestKey = key;
            }
        }

        // Check if any target keys would be better
        currentBestCount = 0;
        for (const targetKey of targetKeys) {
            if (keyMap[targetKey] !== null && keyMap[targetKey] > currentBestCount) {
                currentBestCount = keyMap[targetKey];
                currentBestKey = targetKey;
            }
        }

        // Return the overall best key
        return currentBestKey;

    }

    /**
     * Prune objects for comparison, leaving only keys that appear in both
     * - assumes inputs have already been cloned and sorted
     * @param first 
     * @param second 
     */
    static prune(first: any, second: any) {

        // Initialize return object
        let returns = {
            first: first,
            second: second
        }

        // Check for un-prunable pairs
        if (
            (first == undefined || second == undefined) ||
            (typeof first !== typeof second) ||
            (this.isPrimitive(first)) ||
            (this.isPrimitive(second))
        ) {
            return returns;
        }

    }

    /**
     * Checks if an object is both defined And either Date, number, boolean, or string
     * @param input 
     * @returns 
     */
    static isPrimitive(input: any) {
        if (input == undefined) return false;
        return typeof input == 'object'
            ? input instanceof Date ? true : false
            : true;
    }

    /**
     * Compares two inputs using JSON.stringify and '==='
     * - sorts each input first
     * @param first 
     * @param second 
     * @returns 
     */
    static compareJSON(first: any, second: any, sortKeys?: string[]) {
        let firstSorted = this.sort(first, sortKeys);
        let secondSorted = this.sort(second, sortKeys);
        return (JSON.stringify(firstSorted) === JSON.stringify(secondSorted));
    }
}
export default class CompareHelper {

    //
    static arrayCompareAndReport(array1: any[], array2: any[]) {
        // Initialize
        let errorString = '';

        // Error checks
        if (array1.length !== array2.length || array1.length === 0 || array2.length === 0) {
            return `Length Error:\n
             - array1.length: ${array1.length}\n
             - array2.length: ${array2.length}\n
             -> Array lengths must be equal and non-zero`;
        }
    }

}
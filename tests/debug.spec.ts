import { test, expect } from '@playwright/test';
import { QAPlaygroundMainURL } from '../utility/data/qa-playground.data';
import QAPlaygroundMain from '../page-objects/qa-playground-main/qa-playground-main';
import CompareHelper from '../utility/helpers/compare.helper';

const qaplaygroundURL = QAPlaygroundMainURL;

test('debug test', async () => {

    let big = {
        one: {
            two: {
                three: {
                    four: {
                        five: 'cock'
                    },
                    penis: true
                },
                eleven: 10,
                list: [
                    { lock: 'y' },
                    { lock: 'z' },
                    { lock: 'x' },
                    { lock: 'a', key: 4 },
                    { lock: 'c', key: 5 },
                    { lock: 'b', key: 3 },
                ]
            },
            date: new Date()
        }
    }

    let arrays = {
        numArray: [5, 3, 5, 2, 7, 8, 1],
        numObjArray: [{c: 99}, {a: 5}, {a: 3}, {b: 10}, {c: 15}, {c: 1}],
        deepArray: {x: {y: {z: ['b', 'c', 'a']}, f: [false, true]}, g: [5, 5, 4]},
        arrayArrayArray:[
            [
                [
                    [7, 2, 1], [2, 1, 7]
                ],
                [
                    [3, 2, 1], [2, 7, 3]
                ]
            ], 
            [
                [
                    [3, 2, 1], [2, 1, 3]
                ],
                [
                    [3, 5, 1], [2, 7, 3]
                ]
            ]
        ]
    }

    let clone = CompareHelper.deepClone(big);
    let sorted = CompareHelper.sort(arrays, ['a']);
    //console.log(JSON.stringify(big, null, 2));
    console.log(JSON.stringify(sorted, null, 2));

    expect(true).toBe(true);
});
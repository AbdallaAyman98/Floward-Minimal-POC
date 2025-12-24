// utils/assert-helper.ts
import { expect } from 'expect-webdriverio';

export default class AssertHelper {

    /** ---------------------- Boolean Assertions ---------------------- */

    static assertTrue(condition: boolean, message?: string): void {
        if (!condition) {
            throw new Error(message || 'Expected condition to be true');
        }
    }

    static assertFalse(condition: boolean, message?: string): void {
        if (condition) {
            throw new Error(message || 'Expected condition to be false');
        }
    }

    /** ---------------------- Equality Assertions ---------------------- */

    static assertEqual<T>(actual: T, expected: T, message?: string): void {
        if (actual !== expected) {
            throw new Error(
                message || `Expected "${actual}" to equal "${expected}"`
            );
        }
    }

    static assertNotEqual<T>(actual: T, expected: T, message?: string): void {
        if (actual === expected) {
            throw new Error(
                message || `Expected "${actual}" to not equal "${expected}"`
            );
        }
    }

    static assertDeepEqual<T>(actual: T, expected: T, message?: string): void {
        try {
            expect(actual).toEqual(expected);
        } catch (e) {
            throw new Error(message || 'Expected values to be deeply equal');
        }
    }

    static assertDeepNotEqual<T>(actual: T, expected: T, message?: string): void {
        try {
            expect(actual).not.toEqual(expected);
        } catch (e) {
            throw new Error(message || 'Expected values to not be deeply equal');
        }
    }

    /** ---------------------- String Assertions ---------------------- */

    static assertContains(actual: string, expected: string, message?: string): void {
        if (!actual.includes(expected)) {
            throw new Error(
                message || `Expected "${actual}" to contain "${expected}"`
            );
        }
    }

    static assertNotContains(actual: string, unexpected: string, message?: string): void {
        if (actual.includes(unexpected)) {
            throw new Error(
                message || `Expected "${actual}" to not contain "${unexpected}"`
            );
        }
    }

    /** ---------------------- Collection Assertions ---------------------- */

    static assertContainsItem<T>(collection: T[], item: T, message?: string): void {
        if (!collection.includes(item)) {
            throw new Error(
                message || `Expected collection to contain "${item}"`
            );
        }
    }

    static assertNotContainsItem<T>(collection: T[], item: T, message?: string): void {
        if (collection.includes(item)) {
            throw new Error(
                message || `Expected collection to not contain "${item}"`
            );
        }
    }

    static assertCollectionEqual<T>(actual: T[], expected: T[], message?: string): void {
        try {
            expect(actual).toEqual(expected);
        } catch {
            throw new Error(message || 'Expected collections to be equal');
        }
    }

    static assertCollectionNotEqual<T>(actual: T[], expected: T[], message?: string): void {
        try {
            expect(actual).not.toEqual(expected);
        } catch {
            throw new Error(message || 'Expected collections to not be equal');
        }
    }
}

import {describe, expect, test} from '@jest/globals';

import { Main } from '../src/Main';
import { Algorithmen } from '../src/Algorithmen';
import { Zugstrecken } from '../src/Zugstrecken';

describe('Algorithmen', () => {
  const testAlgorithmen = new Algorithmen();

  describe('Datenreduktion1', () => {
    test('keine Duplikate', () => {
      const testStrecken = new Zugstrecken([['HH', 'FFM', 'M']]);

      testAlgorithmen.datenreduktion1(testStrecken);

      expect(testStrecken.getStrecken()).toStrictEqual([['HH', 'FFM', 'M']]);
    });
    test('Duplikate', () => {
      const testStrecken = new Zugstrecken([['HH', 'FFM', 'M', 'HH']]);

      testAlgorithmen.datenreduktion1(testStrecken);

      expect(testStrecken.getStrecken()).toStrictEqual([['HH', 'FFM', 'M']]);
    });
    test('meherere Duplikate', () => {
      const testStrecken = new Zugstrecken([['HH', 'FFM', 'M', 'HH', 'FFM']]);

      testAlgorithmen.datenreduktion1(testStrecken);

      expect(testStrecken.getStrecken()).toStrictEqual([['HH', 'FFM', 'M']]);
    });
    test('Mix', () => {
      const testStrecken = new Zugstrecken([['HH', 'FFM', 'M'], ['HH', 'FFM', 'M', 'HH'], ['HH', 'FFM', 'M', 'HH', 'FFM']]);

      testAlgorithmen.datenreduktion1(testStrecken);

      expect(testStrecken.getStrecken()).toStrictEqual([['HH', 'FFM', 'M'],['HH', 'FFM', 'M'],['HH', 'FFM', 'M']]);
    });
  });
  describe('Datenreduktion2', () => {
    test('ungleiche nachfolger', () => {
      const testStrecken = new Zugstrecken([
        ['HH', 'FFM', 'M'],
        ['M', 'K', 'H'],
        ['DA', 'HH', 'K']
      ]);

      testAlgorithmen.datenreduktion2(testStrecken);

      expect(testStrecken.getStrecken()).toStrictEqual([
        ['HH', 'FFM', 'M'],
        ['M', 'K', 'H'],
        ['DA', 'HH', 'K']
      ]);
    });
    test('gleiche Nachfolger', () => {
      const testStrecken = new Zugstrecken([
        ['HH', 'FFM', 'M'],
        ['M', 'K', 'HH', 'FFM'],
        ['DA', 'HH', 'FFM']
      ]);

      testAlgorithmen.datenreduktion2(testStrecken);

      expect(testStrecken.getStrecken()).toStrictEqual([
        ['FFM', 'M'],
        ['M', 'K', 'FFM'],
        ['DA', 'FFM']
      ]);
    });
    test('meherere gleiche Nachfolger', () => {
      const testStrecken = new Zugstrecken([
        ['HH', 'FFM', 'M'],
        ['FFM', 'M', 'K'],
        ['K', 'HH', 'FFM', 'M']
      ]);

      testAlgorithmen.datenreduktion2(testStrecken);

      expect(testStrecken.getStrecken()).toStrictEqual([
        ['M'],
        ['M', 'K'],
        ['K', 'M']
      ]);
    });
  });
  describe('Datenreduktion3', () => {
    test('keine Teilmenge', () => {
      const testStrecken = new Zugstrecken([
        ['HH', 'FFM', 'M'],
        ['FFM', 'M', 'K'],
        ['K', 'HH', 'FFM']
      ]);

      testAlgorithmen.datenreduktion3(testStrecken);

      expect(testStrecken.getStrecken()).toStrictEqual([
        ['HH', 'FFM', 'M'],
        ['FFM', 'M', 'K'],
        ['K', 'HH', 'FFM']
      ]);
    });
    test('Teilmenge', () => {
      const testStrecken = new Zugstrecken([
        ['HH', 'FFM', 'M'],
        ['FFM', 'M', 'K'],
        ['K', 'HH', 'FFM', 'M']
      ]);

      testAlgorithmen.datenreduktion3(testStrecken);

      expect(testStrecken.getStrecken()).toStrictEqual([
        ['HH', 'FFM', 'M'],
        ['FFM', 'M', 'K']
      ]);
    });
    test('meherere Teilmengen', () => {
      const testStrecken = new Zugstrecken([
        ['HH', 'FFM', 'M'],
        ['FFM', 'M', 'K'],
        ['K', 'HH', 'FFM', 'M'],
        ['HH', 'FFM', 'M', 'K']
      ]);

      testAlgorithmen.datenreduktion3(testStrecken);

      expect(testStrecken.getStrecken()).toStrictEqual([
        ['HH', 'FFM', 'M'],
        ['FFM', 'M', 'K']
      ]);
    });
  });
  describe('berechneServiceStationen', () => {
    test('Testfall 1', () => {
      let main = new Main('data/test/test.txt');
      
      main.berechneServiceStationen();
      main.schreibeDaten('ausgabe.txt');
  
      const {readFileSync, rmSync} = require('fs');
      expect(readFileSync('ausgabe.txt').toString()).toBe('Servicestationen in: FFM');
      rmSync('ausgabe.txt');
    });
  });

  describe('vorgegebene Testfälle', () => {
    test('Testfall 1', () => {
      const testStrecken = new Zugstrecken([['HH','H','K','HH']])

      testAlgorithmen.datenreduktion1(testStrecken);

      expect(testStrecken.getStrecken()).toStrictEqual([['HH','H','K']]);
    });
    test('Testfall 2', () => {
      const testStrecken = new Zugstrecken([
        ['S','DA','H','K'],
        ['FFM','DA','H','K'],
        ['M','DA','H','B'],
        ['C','M','H','E']
      ])

      testAlgorithmen.datenreduktion2(testStrecken);

      expect(testStrecken.getStrecken()).toStrictEqual([
        ['S','H','K'],
        ['FFM','H','K'],
        ['M','H','B'],
        ['C','M','H','E']
      ]);
    });
    test('Testfall 3', () => {
      const testStrecken = new Zugstrecken([
        ['S','DA','H','K','M'],
        ['DA','H'],
        ['M','N','DA','B'],
        ['C','M','E']
      ])

      testAlgorithmen.datenreduktion3(testStrecken);

      expect(testStrecken.getStrecken()).toStrictEqual([
        ['DA','H'],
        ['M','N','DA','B'],
        ['C','M','E']
      ]);
    });
  });
});

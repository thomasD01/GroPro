import { describe, expect, test } from '@jest/globals'
import { readFileSync, rmSync } from 'fs'

import { Main } from '../src/Main'
import { Zugstrecken } from '../src/Zugstrecken'

describe('IO', () => {
  test('einlesen', () => {
      const testStrecken = new Zugstrecken();
      testStrecken.leseDaten('data/test/testIO.txt');

      expect(testStrecken.getStrecken()).toStrictEqual([['HH'],['FFM']]);
  });
  test('leerzeichen entfernen', () => {
    const testStrecken = new Zugstrecken();
    testStrecken.leseDaten('data/test/testIO2.txt');

    expect(testStrecken.getStrecken()).toStrictEqual([['HH','K','FFM'],['FFM','HH','DA']]);
  });

  test('ausgeben', () => {
    const testMain = new Main('data/test/testIO.txt');

    testMain.berechneServiceStationen();
    testMain.schreibeDaten('ausgabe.txt');

    expect(readFileSync('ausgabe.txt').toString()).toBe('Servicestationen in: HH;FFM');

    rmSync('ausgabe.txt');
  });
});

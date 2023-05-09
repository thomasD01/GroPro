
export class Zugstrecken 
{
  #strecken: string[][] = [];
  public laenge: number = 0;

  constructor(){}

  public getStrecken(): string[][]
  {
    return this.#strecken;
  }
  public getStrecke(index: number): string[]
  {
    return this.#strecken[index];
  }
  public deleteStrecke(strecke: string[]): void
  {
    for (let i = 0; i < this.#strecken.length; i++)
    {
      if (this.#strecken[i].toString() == strecke.toString())
      {
        this.#strecken.splice(i, 1);
        this.laenge--;
        break;
      }
    }
  }
  public deleteStreckeIndex(index: number): void
  {
    this.#strecken.splice(index, 1);
    this.laenge--;
  }
  public deleteStation(station: string): void
  {
    for( let strecke of this.#strecken)
    {
      for(let i=0; i<strecke.length; ++i)
      {
        if(strecke[i] == station)
        {
          strecke.splice(i, 1);
          break;
        }
      }
    }
  }

  public leseDaten(eingabeDatei: string): void
  {
    const { readFileSync } = require('fs');
    const data: string = readFileSync(eingabeDatei, 'utf8');
    const zeilen = data.split('\n');
    this.laenge = zeilen.length;
    for(let zeile of zeilen)
    {
      if(zeile.startsWith('#'))
      {
        this.laenge--;
        continue;
      }
      this.#strecken.push(zeile.split(';'));
    }
  }
}

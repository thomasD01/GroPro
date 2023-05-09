import { Zugstrecken } from "./Zugstrecken"
import { Algorithmen } from "./Algorithmen"

export class Main 
{
  #zugstrecken: Zugstrecken;
  #algorithmen: Algorithmen;
  #serviceStationen: string[];

  constructor(eingabedatei: string)
  {
    this.#zugstrecken = new Zugstrecken();
    this.#algorithmen = new Algorithmen();
    this.#serviceStationen = [];

    this.#zugstrecken.leseDaten(eingabedatei);
  }	

  public datenreduktion(): void
  {
    this.#algorithmen.datenreduktion1(this.#zugstrecken);
    this.#algorithmen.datenreduktion2(this.#zugstrecken);
    this.#algorithmen.datenreduktion3(this.#zugstrecken);
  }
  public berechneServiceStationen(): void
  {
    this.#serviceStationen = this.#algorithmen.berechneServiceStationen(this.#zugstrecken);
  }
  public schreibeDaten(ausgabeDatei:string): void
  {
    let ausgabe: string = "Servicestationen in: ";
    for(let i = 0; i < this.#serviceStationen.length; i++)
    {
      ausgabe += this.#serviceStationen[i];
      if(i != this.#serviceStationen.length - 1)
      {
        ausgabe += ";";
      }
    }

    const { writeFileSync } = require('fs');
    writeFileSync(ausgabeDatei, ausgabe);
  }
}

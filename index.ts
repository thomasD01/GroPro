import { Main } from "./src/Main"

const eingabedatei: string = process.argv[2];

if(!eingabedatei)
{
  console.log("Bitte geben Sie eine Eingabedatei an.");
  process.exit(1);
}

const ausgabedatei: string = process.argv[3] == '-o' ? process.argv[4] : 'ausgabe.txt';

const main = new Main(eingabedatei);
main.datenreduktion();
main.berechneServiceStationen();
main.schreibeDaten(ausgabedatei);

process.exit(0);

import type { Zugstrecken } from "./Zugstrecken";

export class Algorithmen
{
  constructor(){}

  public datenreduktion1(strecken: Zugstrecken): void
  {
    for(let strecke of strecken.getStrecken())
    {
      strecke = Array.from(new Set(strecke));
    }
  }
  public datenreduktion2(strecken: Zugstrecken): void
  {
    let nachfolger = new Map<string, string[]>();

    for(let strecke of strecken.getStrecken())
    {
      for(let i=0; i<strecke.length-1; ++i)
      {
        if(!nachfolger.has(strecke[i]))
        {
          nachfolger.set(strecke[i], []);
        }
        nachfolger.get(strecke[i])!.push(strecke[i+1]);
      }
    }

    for(let [key, value] of nachfolger)
    {
      if(value.length > 1)
      {
        let tmp = Array.from(new Set(value));
        if(tmp.length == 1)
        {
          strecken.deleteStation(key);
        }
      }
    }
  }
  public datenreduktion3(strecken: Zugstrecken): void
  {
    loop1:
    for(let i=0; i<strecken.laenge; ++i)
    {
      let si = strecken.getStrecke(i);
      for(let j=0; j<strecken.laenge; ++j)
      {
        if(i == j) 
          continue;
        
        let sj = strecken.getStrecke(j);
        let l=0;

        for(let k=0; k<si.length; ++k)
        {
          if(l == sj.length)
          {
            strecken.deleteStreckeIndex(i);
            --i;
            continue loop1;
          }
          if(si[k] == sj[l])
          {
            ++l;
            k=-1;
          }
        }
      }
    }
  }
  public berechneServiceStationen(strecken: Zugstrecken): string[]
  {
    let serviceStationen: string[] = [];

    while(strecken.laenge > 0)
    {
      let scores = new Map<string, number>();

      for(let strecke of strecken.getStrecken())
      {
        for(let station of strecke)
        {
          if(!scores.has(station))
          {
            scores.set(station, 1);
          }
          else 
          {
            scores.set(station, scores.get(station)! + 1);
          }
        }
      }

      let maxStation: string = this.#maxScore(scores);
      serviceStationen.push(maxStation);

      for(let i=0; i<strecken.laenge; ++i)
      {
        if(strecken.getStrecke(i).includes(maxStation))
        {
          strecken.deleteStreckeIndex(i);
          --i;
        }
      }
    }
    return serviceStationen;
  }

  #maxScore(scores: Map<string, number>): string
  {
    let maxScore: number = 0;
    let maxStation: string = "";

    for(let station of scores.keys())
    {
      if(scores.get(station)! > maxScore)
      {
        maxScore = scores.get(station)!;
        maxStation = station;
      }
    }

    return maxStation;
  }
}

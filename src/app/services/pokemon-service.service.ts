import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { Pokemon } from '../entitys/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonServiceService {

  endpoints = {
    pokemonList: "pokemon?limit=151",
    pokemonImage: "{}.png"
  }

  pokemonList: Array<Pokemon> = [];

  constructor(private _http: HttpClient,
    private config: ConfigService) { }

  getPokemonsList(): any {

    let that = this;

    this._http.get<any>(`${this.config.configuration?.pokeapiUrl}${this.endpoints.pokemonList}`)
      .subscribe((data) => {

        data.results.forEach((element: any) => {

          let pokemon: Pokemon = new Pokemon();
          pokemon.name = element.name;

          that.getPokemonIdByUrl(element.url).then((a: any) => {
            pokemon.id = a.id;
            pokemon.photo = `${this.config.configuration?.frontPokemonImageUrl}${a.id}.png`;
            pokemon.thumb = `${this.config.configuration?.thumbPokemonImageUrl}${a.id}.png`
          });

          this.pokemonList.push(pokemon);

        });

        return this.pokemonList;
      })
  }

  getPokemonIdByUrl(pokemonUrl: string): any {
    return this._http.get<any>(`${pokemonUrl}`)
      .toPromise();
  }
}


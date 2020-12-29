import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../entitys/pokemon';
import { PokemonServiceService } from '../services/pokemon-service.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})

export class PokemonListComponent implements OnInit {

  public pokemons: Pokemon[] = [];

  constructor(private _pokeService: PokemonServiceService) {
    this._pokeService.getPokemonsList();
  }

  ngOnInit(): void {
    this.pokemons = this._pokeService.pokemonList;
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Pokemon } from '../entitys/pokemon';
import { map, startWith } from 'rxjs/operators';
import { PokemonServiceService } from '../services/pokemon-service.service';

@Component({
  selector: 'app-pokemon-filter',
  templateUrl: './pokemon-filter.component.html',
  styleUrls: ['./pokemon-filter.component.css']
})
export class PokemonFilterComponent implements OnInit {

  constructor(private _pokeService: PokemonServiceService) { }

  @Input()
  pokeList: Array<Pokemon> = [];

  @Output()
  filteredList = new EventEmitter<Array<Pokemon>>();

  formPokeFilter: FormGroup | undefined;

  ngOnInit() {

    this.formPokeFilter = new FormGroup({
      filtro: new FormControl()
    });

    this.formPokeFilter?.valueChanges.subscribe(x => {
      this.filteredList.emit(this._filter(x.filtro));
    });
  }

  private _filter(value: string): Pokemon[] {
    const filterValue = value.toLowerCase();

    return this._pokeService.pokemonList.filter(option => option.name?.toLowerCase().indexOf(filterValue) === 0);

    //return this.pokeList.filter(option => option.name?.toLowerCase().indexOf(filterValue) === 0);
  }
}

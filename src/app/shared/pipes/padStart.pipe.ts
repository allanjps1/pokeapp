import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'padStart' })
export class PadStartPipe implements PipeTransform {
    transform(numberToTransform: number) {
        return String(numberToTransform).padStart(3, '0');      
     }
}
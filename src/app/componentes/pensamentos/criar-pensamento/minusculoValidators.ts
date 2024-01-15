import { AbstractControl } from "@angular/forms";

export function minusculoValidator(control: AbstractControl) {
    const autoria = control.value as string;
    if(autoria !== autoria?.toLowerCase()) {
        return { minusculo: true };
    } else
    return null;
}

/// coloquei aqui apenas para fins de aprendizagem
// nao desejo usar essa a classe AbstracControl no meu projeto

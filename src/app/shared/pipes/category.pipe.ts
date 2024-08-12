import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category',
  standalone: true
})
export class CategoryPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    // Extraindo o domínio do email
    const domain = value.split('@')[1];

    if (!domain) {
      return 'code'; // Valor padrão se o domínio não for encontrado
    }

    switch (domain.toLowerCase()) {
      case 'gmail.com':
        return 'email'; // ícone para gmail
      case 'hotmail.com':
        return 'alternate_email'; // ícone para hotmail
      default:
        return 'help_outline'; // ícone padrão se o domínio não corresponder
    }

  }

}

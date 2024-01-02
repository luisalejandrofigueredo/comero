import {MatPaginatorIntl} from '@angular/material/paginator';
import {Injectable} from '@angular/core';

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  constructor() {
    super();  
    this.getAndInitTranslations();
  }

  getAndInitTranslations() {
      this.itemsPerPageLabel = $localize `:@@items_por_pagina:Items por página`;
      this.nextPageLabel = $localize `:@@proxima_pagina:Proxima página`;
      this.previousPageLabel = $localize `:@@pagina_anterior:Página anterior`;
      this.changes.next();

  }

 override getRangeLabel = (page: number, pageSize: number, length: number) =>  {
    if (length === 0 || pageSize === 0) {
      return $localize`:@@de_largo:0 de ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return $localize `:@@de:${startIndex + 1} - ${endIndex} de ${length}`;
  }
}
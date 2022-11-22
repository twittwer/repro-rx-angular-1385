import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  private readonly _templateRef$ = new BehaviorSubject<
    TemplateRef<unknown> | undefined
  >(undefined);

  public selectTemplate(): Observable<TemplateRef<unknown> | undefined> {
    return this._templateRef$.asObservable().pipe(distinctUntilChanged());
  }

  public setTemplate(templateRef: TemplateRef<unknown> | undefined): void {
    this._templateRef$.next(templateRef);
  }
}

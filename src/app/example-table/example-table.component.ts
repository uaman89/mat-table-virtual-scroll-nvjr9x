import { Component, Input } from '@angular/core';
import { CoreTable } from '../core-table/table';
import { Example } from './example';

@Component({
  selector: 'my-example-table',
  templateUrl: './example-table.component.html',
  styleUrls: ['./example-table.component.scss'],
})
export class ExampleTableComponent extends CoreTable<Example> {
  @Input()
  set examples(examples: Example[]) {
    // sets dataSource on CoreTable
    this.set(examples);
  }

  @Input() sticky: boolean;

  offset: number;

  constructor() {
    // column definitions for CoreTable
    super(['id', 'name', 'actions']);
  }

  onInit() {
    // this is how you could recalculate the sticky header position on scroll
    const el = this.viewport.elementRef.nativeElement;
    this.viewport.renderedRangeStream.subscribe(() => {
      this.offset = -this.viewport.getOffsetToRenderedContentStart();
      el.style.setProperty('--offset', `${this.offset}px`);
      console.log('index changed');
    });
  }
}

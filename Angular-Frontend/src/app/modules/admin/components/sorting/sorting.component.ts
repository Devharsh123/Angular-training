import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css']
})
export class SortingComponent implements OnInit {
  @Output() sortValue = new EventEmitter<{value: string}>()
  newest: string = 'NEWEST'
  oldest: string = 'OLDEST'
  constructor() { }

  ngOnInit(): void {
  }

  onSorting(val: string) {
    if(val===this.newest){
    this.sortValue.emit({value: this.newest})
    }else if(val===this.oldest){
      this.sortValue.emit({value: this.oldest})
    }
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() searchedInput = new EventEmitter<{ value: string }>()
  searchInput!: FormGroup
  constructor(private fb: FormBuilder) { this.submitValue() }

  ngOnInit(): void {
  }
  submitValue() {
    this.searchInput = this.fb.group({
      input: ['']
    })
  }
  onSubmit(form: FormGroup) {
    this.searchedInput.emit({ value: form.value.input })
  }
}

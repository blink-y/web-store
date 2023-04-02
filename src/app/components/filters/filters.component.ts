import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: `filters.component.html`,
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>();
  categoriesSubscription: Subscription | undefined;
  categories: Array<string> | undefined;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.categoriesSubscription = this.storeService.getAllCatergories()
      .subscribe((response) => {
        this.categories = response;
      });
    
  }

  onShowCategory(category: string): void{
    console.log(category);
    this.showCategory.emit(category);
  }
  ngOnDestroy(): void{
    if (this.categoriesSubscription){
      this.categoriesSubscription.unsubscribe();
    }
  }
}

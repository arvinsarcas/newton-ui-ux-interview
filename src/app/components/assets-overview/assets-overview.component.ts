import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AssetsService, Asset } from '../../services/assets.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-assets-overview',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assets-overview.component.html',
  styleUrl: './assets-overview.component.scss'
})
export class AssetsOverviewComponent implements OnInit, OnDestroy {
  assets: Asset[] = [];
  private assetsSubscription?: Subscription;

  constructor(private router: Router, private assetsService: AssetsService) {}

  ngOnInit() {
    // Subscribe to assets changes
    this.assetsSubscription = this.assetsService.getAssets().subscribe(assets => {
      this.assets = assets;
    });
  }

  ngOnDestroy() {
    if (this.assetsSubscription) {
      this.assetsSubscription.unsubscribe();
    }
  }

  async deleteAsset(index: number) {
    await this.assetsService.deleteAsset(index);
  }

  getTotalValue(): number {
    return this.assets.reduce((total, asset) => total + asset.value, 0);
  }

  getAssetTypeDisplay(type: string): string {
    const typeMap: { [key: string]: string } = {
      'stock': 'Gift',
      'bond': 'Savings',
      'real-estate': 'Real Estate',
      'crypto': 'Crypto'
    };
    return typeMap[type] || type;
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  }

  goToAddAssets() {
    this.router.navigate(['/add-assets']);
  }
}

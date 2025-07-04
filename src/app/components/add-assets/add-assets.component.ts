
// (Removed duplicate misplaced close() function at the top)
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AssetsService } from '../../services/assets.service';

@Component({
  selector: 'app-add-assets',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-assets.component.html',
  styleUrl: './add-assets.component.scss'
})
export class AddAssetsComponent {
  assets = [
    { type: '', value: null }
  ];

  constructor(private router: Router, private assetsService: AssetsService) {}

  addAsset() {
    this.assets.push({ type: '', value: null });
  }

  deleteAsset(index: number) {
    if (this.assets.length > 1) {
      this.assets.splice(index, 1);
    }
  }

  // Close button handler: navigate to dashboard page
  close() {
    this.router.navigate(['/']);
  }

  // Check if all asset rows are filled
  get isSaveDisabled(): boolean {
    return this.assets.some(asset => !asset.type || asset.value === null || asset.value === '' || isNaN(asset.value));
  }

  // Save button handler for bottom save button
  async save() {
    // Filter out any invalid assets and convert to proper format
    const validAssets = this.assets
      .filter(asset => asset.type && asset.value !== null && asset.value !== '' && !isNaN(asset.value))
      .map(asset => ({ type: asset.type, value: Number(asset.value) }));
    
    if (validAssets.length > 0) {
      await this.assetsService.addAssets(validAssets);
    }
    
    this.router.navigate(['/assets-overview']);
  }
}

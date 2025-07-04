// (Removed duplicate misplaced close() function at the top)
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-assets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-assets.component.html',
  styleUrl: './add-assets.component.scss'
})
export class AddAssetsComponent {
  assets = [
    { type: '', value: null }
  ];

  addAsset() {
    this.assets.push({ type: '', value: null });
  }

  deleteAsset(index: number) {
    if (this.assets.length > 1) {
      this.assets.splice(index, 1);
    }
  }

  // Close button handler: navigate away or emit close event
  close() {
    // If routing, navigate away. If modal, emit close event. For now, just reload or go to dashboard.
    window.location.href = '/';
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Asset {
  type: 'stock' | 'bond' | 'real-estate' | 'crypto';
  value: number;
}

@Injectable({
  providedIn: 'root'
})
export class AssetsService {
  private assetsSubject = new BehaviorSubject<Asset[]>([]);
  public assets$ = this.assetsSubject.asObservable();

  constructor() {
    this.loadAssets();
  }

  private async loadAssets(): Promise<void> {
    try {
      const response = await fetch('assets/assets-data.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this.assetsSubject.next(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading assets:', error);
      this.assetsSubject.next([]);
    }
  }

  getAssets(): Observable<Asset[]> {
    return this.assets$;
  }

  async addAssets(newAssets: Asset[]): Promise<void> {
    if (!Array.isArray(newAssets) || newAssets.length === 0) {
      return;
    }

    // Validate assets
    const validAssets = newAssets.filter(asset => 
      asset && 
      typeof asset.value === 'number' && 
      asset.value >= 0 && 
      ['stock', 'bond', 'real-estate', 'crypto'].includes(asset.type)
    );

    if (validAssets.length === 0) {
      console.warn('No valid assets to add');
      return;
    }

    const currentAssets = this.assetsSubject.value;
    const updatedAssets = [...currentAssets, ...validAssets];
    
    try {
      // Update the JSON file (simulate API call)
      await fetch('assets/assets-data.json', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAssets)
      });
      
      // Update the observable
      this.assetsSubject.next(updatedAssets);
    } catch (error) {
      console.error('Error saving assets:', error);
      throw error;
    }
  }

  async deleteAsset(index: number): Promise<void> {
    const currentAssets = this.assetsSubject.value;
    
    if (index < 0 || index >= currentAssets.length) {
      console.warn('Invalid asset index for deletion');
      return;
    }

    const updatedAssets = currentAssets.filter((_, i) => i !== index);
    
    try {
      // Update the JSON file (simulate API call)
      await fetch('assets/assets-data.json', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAssets)
      });
      
      // Update the observable
      this.assetsSubject.next(updatedAssets);
    } catch (error) {
      console.error('Error deleting asset:', error);
      throw error;
    }
  }

  refreshAssets(): void {
    this.loadAssets();
  }
}

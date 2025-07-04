import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Asset {
  type: string;
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
      const data = await response.json();
      this.assetsSubject.next(data || []);
    } catch (error) {
      console.error('Error loading assets:', error);
      this.assetsSubject.next([]);
    }
  }

  getAssets(): Observable<Asset[]> {
    return this.assets$;
  }

  async addAssets(newAssets: Asset[]): Promise<void> {
    const currentAssets = this.assetsSubject.value;
    const updatedAssets = [...currentAssets, ...newAssets];
    
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
    }
  }

  async deleteAsset(index: number): Promise<void> {
    const currentAssets = this.assetsSubject.value;
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
    }
  }

  refreshAssets(): void {
    this.loadAssets();
  }
}

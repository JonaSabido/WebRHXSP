import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SidebarService {

    private key: string = "sidebar"
    protected showSidebar: boolean = false;

    public setOnStorage(value: boolean): void {
        localStorage.setItem(this.key, JSON.stringify({ value: value }))
    }

    public removeOnStorage(): void {
        localStorage.removeItem(this.key)
    }

    public get sidebarVisible(): boolean {
        const object = JSON.parse(localStorage.getItem(this.key) ?? '')
        if (object != '') {
            return object.value
        }
        return false
    }

    public switchSidebarVisible(): void {
        this.showSidebar = !this.showSidebar
        this.setOnStorage(this.showSidebar)
    }
    
}

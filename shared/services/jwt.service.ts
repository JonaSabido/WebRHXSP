import { AuthService } from "../../src/app/core/services/auth.service";
import { Injectable } from "@angular/core";
import { jwtDecode } from "jwt-decode";
import { UserResponse } from "../../src/app/interfaces/user";

@Injectable({
    providedIn: 'root'
})

export class JwtService {
    constructor(
        private authService: AuthService
    ) {

    }

    public tokenIsValid(): boolean {
        try {
            const decodedToken = jwtDecode(this.authService.getTokenOnStorage())
            const isExpired = decodedToken && decodedToken.exp ? decodedToken.exp < Date.now() / 1000 : false
            return !isExpired
        }
        catch (e) {
            return false
        }
    }

    public getDataToken(): any {
        try {
            const decodedToken = jwtDecode(this.authService.getTokenOnStorage())
            return decodedToken
        }
        catch (e) {
            return false
        }
    }
}
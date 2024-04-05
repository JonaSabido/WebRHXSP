import { AuthService } from "../../src/app/core/services/auth.service";
import { Injectable } from "@angular/core";
import { jwtDecode } from "jwt-decode";

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
}
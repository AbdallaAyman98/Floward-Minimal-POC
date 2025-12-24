import { CountryCode, Address } from "../generators/user-gen.ts"

export interface IUserProfile {
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    phone: string;
    countryCode: CountryCode;
    address: Address;
}

export default class UserModel {
    private _profile?: IUserProfile;

    /** -------- Setter -------- */
    public set profile(profile: IUserProfile) {
        this._profile = profile;
    }

    /** -------- Getters -------- */
    public get profile(): IUserProfile {
        return this.assertInitialized();
    }

    public get email(): string {
        return this.assertInitialized().email;
    }

    public get phone(): string {
        return this.assertInitialized().phone;
    }

    public get fullName(): string {
        return this.assertInitialized().fullName;
    }

    public get address(): Address {
        return this.assertInitialized().address;
    }

    /** -------- Helper -------- */
    private assertInitialized(): IUserProfile {
        if (!this._profile) {
            throw new Error('UserModel not initialized. Set profile first.');
        }
        return this._profile;
    }

    /** -------- Static Factory (Optional) -------- */
    public static fromProfile(profile: IUserProfile): UserModel {
        const user = new UserModel();
        user.profile = profile;
        return user;
    }
}

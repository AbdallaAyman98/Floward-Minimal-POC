import { Faker, en, en_GB } from '@faker-js/faker';

/** -------- Country Codes -------- */
export type CountryCode =
    | 'EG'
    | 'SA'
    | 'AE'
    | 'KW'
    | 'BH'
    | 'OM'
    | 'QA'
    | 'UK';

/** -------- Address Model -------- */
export interface Address {
    street: string;
    city: string;
    postalCode: string;
    country: string;
}

/** -------- User Profile Model -------- */
export interface UserProfile {
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    phone: string;
    countryCode: CountryCode;
    address: Address;
}

/** -------- User Persona Generator -------- */
export default class UserPersona {

    /** -------- Internal State -------- */
    private profile!: UserProfile;
    private faker: Faker;

    constructor(seed?: number) {
        this.faker = new Faker({ locale: en });
        if (seed !== undefined) {
            this.faker.seed(seed);
        }
    }

    /** -------- Country Configuration -------- */
    private static readonly COUNTRY_MAP = {
        EG: { locale: 'en', phone: '+20', digits: 10, domain: 'example.eg', name: 'Egypt' },
        SA: { locale: 'en', phone: '+966', digits: 9, domain: 'example.sa', name: 'Saudi Arabia' },
        AE: { locale: 'en', phone: '+971', digits: 9, domain: 'example.ae', name: 'United Arab Emirates' },
        KW: { locale: 'en', phone: '+965', digits: 8, domain: 'example.kw', name: 'Kuwait' },
        BH: { locale: 'en', phone: '+973', digits: 8, domain: 'example.bh', name: 'Bahrain' },
        OM: { locale: 'en', phone: '+968', digits: 8, domain: 'example.om', name: 'Oman' },
        QA: { locale: 'en', phone: '+974', digits: 8, domain: 'example.qa', name: 'Qatar' },
        UK: { locale: 'en_GB', phone: '+44', digits: 10, domain: 'example.co.uk', name: 'United Kingdom' }
    } as const;

    /** -------- Persona Generator -------- */
    public generate(country: CountryCode): this {
        const cfg = UserPersona.COUNTRY_MAP[country];

        this.faker = new Faker({
            locale: cfg.locale === 'en_GB' ? en_GB : en
        });

        const firstName = this.faker.person.firstName();
        const lastName = this.faker.person.lastName();

        this.profile = {
            firstName,
            lastName,
            fullName: `${firstName} ${lastName}`,
            email: this.buildEmail(firstName, lastName, cfg.domain),
            phone: this.buildPhone(cfg.phone, cfg.digits),
            countryCode: country,
            address: {
                street: this.faker.location.streetAddress(),
                city: this.faker.location.city(),
                postalCode: this.faker.location.zipCode(),
                country: cfg.name
            }
        };

        return this;
    }

    /** -------- Public Getters -------- */
    public get user(): Readonly<UserProfile> {
        this.assertInitialized();
        return Object.freeze({ ...this.profile });
    }

    public get email(): string {
        this.assertInitialized();
        return this.profile.email;
    }

    public get phone(): string {
        this.assertInitialized();
        return this.profile.phone;
    }

    public get fullName(): string {
        this.assertInitialized();
        return this.profile.fullName;
    }

    public get address(): Address {
        this.assertInitialized();
        return this.profile.address;
    }

    /** -------- Form Payload (UI/API Ready) -------- */
    public toFormPayload() {
        this.assertInitialized();
        return {
            name: this.profile.fullName,
            email: this.profile.email,
            phone: this.profile.phone,
            country: this.profile.address.country,
            city: this.profile.address.city
        };
    }

    /** -------- Helpers -------- */
    private buildEmail(first: string, last: string, domain: string): string {
        const suffix = this.faker.number.int({ min: 10, max: 99 });
        return `${first}.${last}${suffix}@${domain}`.toLowerCase();
    }

    private buildPhone(prefix: string, digits: number): string {
        const min = Number('1'.padEnd(digits, '0'));
        const max = Number('9'.repeat(digits));
        return `${prefix}${this.faker.number.int({ min, max })}`;
    }

    private assertInitialized(): void {
        if (!this.profile) {
            throw new Error(
                'UserPersona not initialized. Call: new UserPersona().generate("EG")'
            );
        }
    }
}

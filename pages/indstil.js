import {useState} from "react";
import styles from '../styles/register.module.scss'
import 'moment/locale/da';
import {sendRegisterForm} from "../lib/indstilVirksomhed";
import Link from "next/link";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        justification: '',
        contact: '',
        comment: '',
    });

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [touched, setTouched] = useState({})
    const [isLoading, setIsLoading] = useState(false);

    const onBlur = ({ target }) => {
        setTouched((prev) => ({
            ...prev,
            [target.name]: true
        }))
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Basic validation
        const newErrors = {};
        if (!formData.name) {
            newErrors.name = 'Dette felt er påkrævet';
        }
        if (!formData.email) {
            newErrors.email = 'Dette felt er påkrævet';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Det angivne er ikke en email';
        }
        if (!formData.phone) {
            newErrors.phone = 'Dette felt er påkrævet';
        }
        if (!formData.company) {
            newErrors.company = 'Dette felt er påkrævet';
        }
        if (!formData.justification) {
            newErrors.justification = 'Dette felt er påkrævet';
        }
        if (!formData.contact) {
            newErrors.contact = 'Dette felt er påkrævet';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            try {
                setIsLoading(true)
                await sendRegisterForm(formData)
                setIsSubmitted(true);
            } catch (error) {
                console.error('Error during submission:', error)
                setErrors({ submissionError: 'Der skete en fejl. Prøv igen. Kontakt os, hvis du fortsat oplever fejl i formularen.'})
            } finally {
                setIsLoading(false)
            }
        }
    };

    return (
        <div className={styles.formContainer}>
            {/* <h2>Register</h2> */}
            {isSubmitted ? (
                <>
                    <p>Tak for din indstilling!.</p>
                    <Link href={'/'}><a style={{ textDecoration: 'underline' }}>Gå tilbage til forsiden</a></Link>
                </>
            ) :  (
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div>
                        <label htmlFor="name" className={styles.required}>Dit navn:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onBlur={onBlur}
                            required
                        />
                        {!errors.name && <p className="error">{errors.name}</p>}
                    </div>
                    <div>
                        <label htmlFor="email" className={styles.required}>Din mail:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div>
                        <label htmlFor="phone" className={styles.required}>Dit telefonnummer:</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            onBlur={onBlur}
                            required
                        />
                        {!errors.phone && <p className="error">{errors.phone}</p>}
                    </div>
                    <div>
                        <label htmlFor="company" className={styles.required}>Virksomheden eller organisationens navn: </label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            onBlur={onBlur}
                            required
                        />
                        {!errors.company && <p className="error">{errors.company}</p>}
                    </div>
                    <div>
                        <label htmlFor="justification" className={styles.required}>Kort begrundelse for indstillingen:</label>
                        <input
                            type="textarea"
                            id="justification"
                            name="justification"
                            value={formData.justification}
                            onChange={handleChange}
                            onBlur={onBlur}
                            required
                        />
                        {!errors.justification && <p className="error">{errors.justification}</p>}
                    </div>
                    <div>
                        <label htmlFor="contact" className={styles.required}>Hvem kan vi kontakte i virksomheden eller organisationen for at høre om deres arbejde:</label>
                        <input
                            type="textarea"
                            id="contact"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            required
                        />
                        {errors.contact && <p className="error">{errors.contact}</p>}
                    </div>
                    <div>
                        <label htmlFor="comment">Øvrige kommentarer:</label>
                        <input
                            type="text"
                            id="comment"
                            name="comment"
                            value={formData.comment}
                            onChange={handleChange}
                        />
                        {errors.comment && <p className="error">{errors.comment}</p>}
                    </div>
                    {errors.submissionError && (
                        <p className="error" style={{ color: 'var(--red)'}}>{errors.submissionError}</p>
                    )}
                    <button className={styles.submitBtn} type="submit" disabled={!formData.name || !formData.email || !formData.phone || !formData.company || !formData.justification || !formData.contact}>{isLoading ? 'Vent venligst...' : 'Indstil'}</button>
                </form>
            )}
        </div>
    );
};

export default function Register({ event }) {
    return (
        <>
            <section className={styles.section}>
                <div className={styles.inner}>
                    <h1>Indstilling</h1>
                    <RegisterForm eventTitle={'Årets Digitale Kompetenceløft 2023'}/>
                </div>
            </section>
        </>
    )
}
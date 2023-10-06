import {GraphQLClient} from "graphql-request";
import {useState} from "react";
const graphcms = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT)
import styles from '../../styles/register.module.scss'
import Moment from "react-moment";
import 'moment/locale/da';
import {sendRegisterForm} from "../../lib/registerToEvent";

export async function getServerSideProps(context){
    const id = context.query.id
    const {event} = await graphcms.request(`
    query event($id: ID){
      event(where: {id: $id}) {
        id
        titel
        dato
      }
    }
  `, {
        id: id
    });

    return {
        props: {
            event
        }
    }
}

const RegisterForm = ({eventTitle}) => {
    const [formData, setFormData] = useState({
        name: '',
        jobTitle: '',
        company: '',
        cvr: '',
        email: '',
        eventTitle: eventTitle,
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
            newErrors.name = 'Name is required';
        }
        if (!formData.jobTitle) {
            newErrors.jobTitle = 'Job Title is required';
        }
        if (!formData.company) {
            newErrors.company = 'Company is required';
        }
        if (!formData.cvr) {
            newErrors.cvr = 'CVR is required';
        }
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Invalid email format';
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
                setErrors({ submissionError: 'Der skete en fejl. Prøv igen. Kontakt os, hvis du fortsat oplever fejl i tilmeldingsformularen.'})
            } finally {
                setIsLoading(false)
            }
        }
    };

    console.log(touched)

    return (
        <div className={styles.formContainer}>
            {/* <h2>Register</h2> */}
            {isSubmitted ? (
                <p>Tak for din tilmelding! Du vil få en bekræftelsesmail fra os inden længe. Kontakt os, hvis du ikke modtager en mail indenfor 24 timer.</p>
            ) :  (
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div>
                        <label htmlFor="name">Navn</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onBlur={onBlur}
                        />
                        {!errors.name && <p className="error">{errors.name}</p>}
                    </div>
                    <div>
                        <label htmlFor="jobTitle">Titel</label>
                        <input
                            type="text"
                            id="jobTitle"
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleChange}
                        />
                        {errors.jobTitle && <p className="error">{errors.jobTitle}</p>}
                    </div>
                    <div>
                        <label htmlFor="company">Virksomhed</label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                        />
                        {errors.company && <p className="error">{errors.company}</p>}
                    </div>
                    <div>
                        <label htmlFor="cvr">CVR-nr</label>
                        <input
                            type="text"
                            id="cvr"
                            name="cvr"
                            value={formData.cvr}
                            onChange={handleChange}
                        />
                        {errors.cvr && <p className="error">{errors.cvr}</p>}
                    </div>
                    <div>
                        <label htmlFor="email">Email-adresse</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    {/* <div>
                        <input
                            type="checkbox"
                            id="consent"
                            name="consent"
                            value={formData.email}
                        />
                        <label htmlFor={consent}>Jeg accepterer at Digital Dogme må bruge mine oplysninger givet i formularen herover, som oplsyninger til at lave en tilmelding til det given arrangement.</label>
                    </div> */}
                    {errors.submissionError && (
                        <p className="error" style={{ color: 'var(--red)'}}>{errors.submissionError}</p>
                    )}
                    <button className={styles.submitBtn} type="submit" disabled={!formData.name || !formData.jobTitle || !formData.company || !formData.cvr || !formData.email}>{isLoading ? 'Vent venligst...' : 'Tilmeld'}</button>
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
                    <h1>Tilmelding</h1>
                    <div>Event: {event.titel}</div>
                    {event.dato && <div>Dato: <Moment locale='da' format='ll'>{event.dato.toString()}</Moment></div>}
                    <RegisterForm eventTitle={event.titel}/>
                </div>
            </section>
        </>
    )
}
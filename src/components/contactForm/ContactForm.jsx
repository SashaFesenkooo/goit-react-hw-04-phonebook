import {useState} from "react";
import PropTypes from "prop-types";
import css from "components/contactForm/ContactForm.module.css"

export const ContactForm = ({onSubmit}) => {
    const [name, setName] = useState("")
    const [number, setNumber] = useState("")


    const handleSubmit = evt => {
        evt.preventDefault();
        onSubmit(name, number)
        reset();
    }

    const reset = () => {
        setName("");
        setNumber("")
    }

    const handleChangeName = evt => {
        setName(evt.target.value);
    };

    const handleChangeNumber = evt => {
        setNumber(evt.target.value);
    };

    return (
        <form className={css.form} onSubmit={handleSubmit}>
            <label className={css.text}>
                Name
                <input
                className={css.input}
                value={name}
                onChange={handleChangeName}
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                />    
            </label>
        
            <label className={css.text}>
                Number
                <input
                className={css.input}
                value={number}
                onChange={handleChangeNumber}
                type="tel"
                name="number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                />
            </label>
    
            <button className={css.btn} type="submit">Add contact</button>
        </form> 
    )
}

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}
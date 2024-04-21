import { useState, useEffect } from 'react';
import axios from 'axios';
 
const Contact = () => {
    const [contacts, setContacts] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        email: '',
        phone: '',
    });
 
    useEffect(() => {
        fetchContacts();
    }, []);
 
    const fetchContacts = async () => {
        try {
            const response = await axios.get('http://localhost:3001/contacts');
            setContacts(response.data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };
 
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/contacts/${id}`);
            fetchContacts(); // Refresh contacts after deletion
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };
 
    // const handleUpdate = async (id, newData) => {
    //     try {
    //         await axios.put(`http://localhost:3001/contacts/${id}`, newData);
    //         fetchContacts(); // Refresh contacts after update
    //     } catch (error) {
    //         console.error('Error updating contact:', error);
    //     }
    // };
 
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Calculate the next available ID
            const newId =
                contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1;
            const newContactData = { ...formData, id: newId };
            await axios.post('http://localhost:3001/contacts', newContactData);
            fetchContacts();
            setFormData({ id: '', name: '', email: '', phone: '' });
        } catch (error) {
            console.error('Error adding contact:', error);
        }
    };
 
    return (
        <div className="container p-10 lg:p-0 max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">
            <div className="w-full flex flex-col justify-center gap-6 lg:w-1/3 p-8 bg-slate-200/70 rounded-2xl shadow-xl">
                <h2 className="text-2xl font-semibold text-center">
                    Form Add Contact
                </h2>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col"
                >
                    <div className="w-full mb-4">
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm text-slate-900"
                        >
                            Nama
                        </label>
                        <input
                            type="text"
                            className="w-full border shadow outline-none focus:outline focus:outline-blue-500 focus:outline-offset-1 border-slate-400 text-sm py-2.5 px-4 rounded"
                            name="name"
                            autoComplete="off"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Input Name"
                            required
                        />
                    </div>
                    <div className="w-full mb-4">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm text-slate-900"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full border shadow outline-none focus:outline focus:outline-blue-500 focus:outline-offset-1 border-slate-400 text-sm py-2.5 px-4 rounded"
                            name="email"
                            autoComplete="off"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Input Email"
                            required
                        />
                    </div>
                    <div className="w-full mb-8">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm text-slate-900"
                        >
                            Phone Number
                        </label>
                        <input
                            type="number"
                            inputMode="numeric"
                            className="w-full border shadow outline-none focus:outline focus:outline-blue-500 focus:outline-offset-1 border-slate-400 text-sm py-2.5 px-4 rounded"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Input Phone Number"
                            required
                        />
                    </div>
                    <button
                        className="text-sm font-medium shadow transition-all duration-200 ease-in-out focus:outline hover:ring-1 focus:outline-2 rounded-lg px-4 bg-blue-500 text-slate-100 hover:bg-blue-600 hover:ring-blue-700 focus:outline-blue-700 w-full text-center py-2.5"
                        type="submit"
                    >
                        Add Contact
                    </button>
                </form>
            </div>
            <div className="w-full max-w-full lg:max-w-[66%] max-h-fit lg:max-h-[60vh] flex-auto flex flex-col gap-6 px-5 py-6 pb-8 bg-slate-200/70 rounded-2xl shadow-xl">
                <h2 className="text-2xl font-semibold text-center">
                    Contact List Table
                </h2>
                <div
                    id="scrollbar"
                    className="w-full max-w-full overflow-auto rounded-lg border border-slate-500"
                >
                    <table className="text-sm w-full table-auto ">
                        <thead className="bg-[#f3f3f3] text-left">
                            <tr>
                                <th className="min-w-[150px] pl-4 py-3 font-medium ">
                                    Name
                                </th>
                                <th className="min-w-[150px] pl-4 font-medium">
                                    Email
                                </th>
                                <th className="min-w-[150px] pl-4 font-medium">
                                    Phone Number
                                </th>
                                <th className="min-w-[120px] pl-4 font-medium">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-slate-50">
                            {contacts.map((contact) => (
                                <tr
                                    className="border-t border-slate-500"
                                    key={contact.id}
                                >
                                    <td className="pl-4 font-normal text-slate-900">
                                        {contact.name}
                                    </td>
                                    <td className="pl-4 font-normal text-slate-900">
                                        {contact.email}
                                    </td>
                                    <td className="pl-4 font-normal text-slate-900">
                                        {contact.phone}
                                    </td>
                                    <td className="pl-4 py-3 font-normal text-slate-900">
                                        <button
                                            className="bg-red-500 text-slate-100 px-3 py-1.5 rounded-md hover:bg-red-700"
                                            onClick={() =>
                                                handleDelete(contact.id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
 
export default Contact;
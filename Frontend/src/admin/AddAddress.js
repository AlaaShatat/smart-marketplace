import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createAddress, getGovernorates } from './apiAdmin';

const AddAddress = () => {
    const [values, setValues] = useState({
        name: '',
        location:'',
        governorates: [],
        governorte: '',
        loading: false,
        error: '',
        added: ""
    });

    const { user, token } = isAuthenticated();
    const {
        name,
        location,
        governorates,
        governorate,
        loading,
        error,
        added
    } = values;

    // load governoratess and set form data
    const init = () => {
        getGovernorates().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    governorates: data
                });
            }
        });
    };

    useEffect(() => {
        init();
    }, []);

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        createAddress(user._id, token, values).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: '',
                    location:'',
                    added: data.name,
                    loading: false
                    
                });
            }
        });
    };

    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">
                Back to Dashboard
            </Link>
        </div>
    );

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Address</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>
            <div className="form-group">
                <label className="text-muted">Location</label>
                <input onChange={handleChange('location')} type="text" className="form-control" value={location} />
            </div>

            <div className="form-group">
                <label className="text-muted">governorate</label>
                <select onChange={handleChange('governorate')} className="form-control">
                    <option>Please select</option>
                    {governorates &&
                        governorates.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>

            <button className="btn btn-outline-primary">Add address</button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: added ? '' : 'none' }}>
            <h2>{`${added}`} is added!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    return (
        <Layout title="Add a new address" description={`G'day ${user.name}, ready to add a new address?`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    );
};

export default AddAddress;

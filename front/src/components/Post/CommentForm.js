import React from 'react';
import { useFormik } from 'formik';

const CommentForm = ({ addComment, comm, updateComment }) => {
    const validate = (values) => {
        const errors = {};
        if (!values.body) {
            errors.body = 'This field is required!';
        }
        return errors;
    };
    const formik = useFormik({
        initialValues: {
            body: comm.body ? comm.body : '',
        },
        enableReinitialize: true,
        validate,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            if (comm.body) {
                updateComment(comm._id, values, resetForm, setSubmitting);
            } else {
                addComment(values, resetForm, setSubmitting);
            }
        },
    });
    return (
        <div>
            <form className="mb-6" onSubmit={formik.handleSubmit}>
                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
                    <label className="sr-only">Your comment</label>
                    <textarea
                        id="body"
                        name="body"
                        rows="6"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.body}
                        className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0"
                        placeholder="Write a comment..."
                        required
                    ></textarea>
                </div>
                {formik.touched.body && formik.errors.body ? (
                    <div className="text-red-700 mb-3">
                        {formik.errors.body}
                    </div>
                ) : null}
                <input
                    type="submit"
                    className="inline-flex bg-blue-700 text-white items-center py-2.5 px-4 text-xs font-medium text-center bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
                    value={comm.body ? 'Edit comment' : 'Post comment'}
                />
            </form>
        </div>
    );
};

export default CommentForm;

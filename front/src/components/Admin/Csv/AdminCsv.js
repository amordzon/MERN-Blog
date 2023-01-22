import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import authHeader from '../../../services/auth-header';
import { CSVLink } from 'react-csv';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
const AdminCsv = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [fileName, setFileName] = useState('');
    const excelRef = useRef();
    const exportCsv = (type) => {
        axios
            .get(
                `${process.env.REACT_APP_API}/api/admin/exportcsv?type=${type}`,
                {
                    headers: authHeader(),
                }
            )
            .then((response) => {
                const responseData = response.data.Data;
                setFileName(`${type}.csv`);
                setData(responseData);
            });
    };

    useEffect(() => {
        if (data.length > 0) {
            excelRef.current.link.click();
        }
    }, [data]);

    const uploadCsv = async (e) => {
        const csv = e.target.files[0];
        await axios
            .post(
                `${process.env.REACT_APP_API}/api/admin/importcsv`,
                {
                    csv: csv,
                },
                {
                    headers: {
                        ...authHeader(),
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
            .then((response) => {
                Swal.fire('Success!', response.data.message, 'success');
                navigate('/admin/posts');
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.message,
                });
            });
    };
    return (
        <div className="xl:w-4/5 lg:w-3/4">
            <div className=" xl:w-11/12 mx-auto mt-12">
                <h3 className="flex items-center text-2xl font-semibold mb-8 ml-4">
                    Manage CSV
                </h3>
                <div className="rounded overflow-hidden shadow">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Posts</div>
                        <p className="text-gray-700 text-base">
                            Generate CSV with all posts on your page or import
                            CSV to database.
                        </p>
                    </div>
                    <div className="px-6 py-4">
                        <button
                            onClick={() => exportCsv('posts')}
                            className="inline-block bg-blue-200 hover:bg-blue-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                        >
                            Generate CSV
                        </button>
                        <form>
                            <label className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                Import CSV to database
                            </label>
                            <input
                                type="file"
                                name="file"
                                onChange={(e) => uploadCsv(e)}
                            />
                        </form>
                    </div>
                </div>
                <div className="rounded overflow-hidden shadow">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Categories</div>
                        <p className="text-gray-700 text-base">
                            Generate CSV with all categories on your page.
                        </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        <button
                            onClick={() => exportCsv('categories')}
                            className="inline-block bg-blue-200 hover:bg-blue-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                        >
                            Generate CSV
                        </button>
                    </div>
                </div>
                <div className="rounded overflow-hidden shadow">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Comments</div>
                        <p className="text-gray-700 text-base">
                            Generate CSV with all comments on your page.
                        </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        <button
                            onClick={() => exportCsv('comments')}
                            className="inline-block bg-blue-200 hover:bg-blue-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                        >
                            Generate CSV
                        </button>
                    </div>
                </div>
                <div className="rounded overflow-hidden shadow">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Users</div>
                        <p className="text-gray-700 text-base">
                            Generate CSV with all users on your page.
                        </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        <button
                            onClick={() => exportCsv('users')}
                            className="inline-block bg-blue-200 hover:bg-blue-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                        >
                            Generate CSV
                        </button>
                    </div>
                </div>
                <CSVLink
                    data={data}
                    filename={fileName}
                    ref={excelRef}
                    className="hiddenExcel"
                    target="_blank"
                ></CSVLink>{' '}
            </div>
        </div>
    );
};

export default AdminCsv;

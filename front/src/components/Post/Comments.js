import axios from 'axios';
import React, { useLayoutEffect, useMemo, useState } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import authHeader from '../../services/auth-header';

const Comments = ({ comments = [], id = '' }) => {
    const [comm, setComm] = useState(comments);
    const [editComment, setEditComment] = useState({});
    const { user: currentUser } = useSelector(
        (state) => state.persistedReducer.auth
    );
    const editComm = (comment) => {
        setEditComment(comment);
    };
    const removeComment = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete comment!',
            showLoaderOnConfirm: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios
                    .delete(`${process.env.REACT_APP_API}/api/comments/${id}`, {
                        headers: authHeader(),
                    })
                    .then(() => {
                        const newComm = comm.filter((c) => c._id != id);
                        setComm(newComm);
                        Swal.fire(
                            'Deleted!',
                            'Your comment has been deleted.',
                            'success'
                        );
                    })
                    .catch((error) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: error.response.data.message,
                        });
                    });
            }
        });
    };
    const commentsMemo = useMemo(() => {
        return comm.map((comment, index) => (
            <Comment
                comment={comment}
                key={index}
                userId={currentUser?.user._id}
                removeComment={removeComment}
                editComm={editComm}
            />
        ));
    }, [comm]);
    useLayoutEffect(() => {
        if (comm.length == 0) {
            setComm(comments);
        }
    }, [comments]);
    const addComment = async (values, reset, setSubmitting) => {
        axios
            .post(
                `${process.env.REACT_APP_API}/api/comments/new`,
                {
                    user: currentUser?.user._id,
                    body: values.body,
                    post: id,
                },
                {
                    headers: authHeader(),
                }
            )
            .then((response) => {
                setComm((prev) => [response.data.Comment, ...prev]);
                reset();
                setSubmitting(false);
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'You have to be logged in!',
                });
            });
    };

    const updateComment = async (commentid, values, reset, setSubmitting) => {
        axios
            .put(
                `${process.env.REACT_APP_API}/api/comments/${commentid}`,
                {
                    user: currentUser?.user._id,
                    body: values.body,
                    post: id,
                },
                {
                    headers: authHeader(),
                }
            )
            .then(() => {
                const newComments = comm.map((x) =>
                    x._id === commentid
                        ? {
                              ...x,
                              body: values.body,
                          }
                        : x
                );
                setComm(newComments);
                reset();
                setSubmitting(false);
                setEditComment({});
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            });
    };

    return (
        <div className="not-format">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
                    Discussion ({comm.length})
                </h2>
            </div>
            <CommentForm
                addComment={addComment}
                comm={editComment}
                updateComment={updateComment}
            />
            {commentsMemo}
        </div>
    );
};

export default Comments;
